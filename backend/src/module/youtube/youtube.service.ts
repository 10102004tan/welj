import { Injectable } from "@nestjs/common";
import * as path from 'path';
import { spawn } from "child_process";
import * as fs from 'fs';
@Injectable()
export class YoutubeService {
    constructor(
    ) {
    }

    /**
     * Download YouTube video using yt-dlp
     * @param id - youtube video id
     * @returns {Promise<string>} - video url
     */

    downloadYouTubeVideo = (videoId: string) => {


        const VIDEOS_DIR = path.join(__dirname, '..', '..','..','src','uploads');
        //check if video exists in the directory
        const videoPath = path.join(VIDEOS_DIR,`${videoId}.mp4`);
        if (fs.existsSync(videoPath)) {
            return {
                path: videoPath,
            };
        }
        return new Promise((resolve, reject) => {
            const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
            const outputPath = path.join(VIDEOS_DIR,`${videoId}.mp4`);
            console.log(`Downloading video from ${videoURL} to ${outputPath}`);

            // Construct the command to run yt-dlp
            const pythonPath = path.join(__dirname, '..', '..','..', '.venv', 'Scripts', 'python.exe');
            console.log(`Python path: ${pythonPath}`);
            // Prepare yt-dlp command with arguments for format selection and output filename
            const ytDlpArgs = [
                '-m', 'yt_dlp',
                videoURL,
                '--format', 'best[height<=480][ext=mp4]/best[ext=mp4]/best', // Select best mp4 format <= 480p for reliability
                '--output', outputPath,
                '--no-playlist',
                '--no-warnings',
                '--quiet'
            ];
            console.log(`Running command: ${pythonPath} ${ytDlpArgs.join(' ')}`);

            // Spawn the yt-dlp process
            const ytDlp = spawn(pythonPath, ytDlpArgs);

            let stdoutData = '';
            let stderrData = '';

            // Listen for data from stdout
            ytDlp.stdout.on('data', (data) => {
                stdoutData += data.toString();
                console.log(`yt-dlp stdout: ${data}`);
            });

            // Listen for data from stderr
            ytDlp.stderr.on('data', (data) => {
                stderrData += data.toString();
                console.error(`yt-dlp stderr: ${data}`);
            });

            // Listen for the process to exit
            ytDlp.on('close', (code) => {
                if (code === 0) {
                    console.log(`yt-dlp download successful: ${outputPath}`);
                    resolve({
                        path: outputPath,
                    });
                } else {
                    console.error(`yt-dlp process exited with code ${code}`);
                    reject(new Error(`yt-dlp failed with code ${code}: ${stderrData}`));
                }
            });

            // Listen for errors when starting the process
            ytDlp.on('error', (err) => {
                console.error('Failed to start yt-dlp process:', err);
                // Clean up the output file if it exists
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                    console.log(`Deleted incomplete file: ${outputPath}`);
                }
                reject(err);
            });
        })
    }
}