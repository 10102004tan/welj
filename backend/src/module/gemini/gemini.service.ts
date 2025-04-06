import { Injectable } from "@nestjs/common";
import { createModelGemini } from "../../config/gemini.config";
import SubtitleSchema from "./schemas/subtitle.schema"

@Injectable()
export class GeminiService {
    constructor(
    ) {
    }
    /**
     * generate script using gemini
     * @param input : string - video url
     */
    generateScript = async ({input}: { input: string }) => {
        const apiKeyGemini = process.env.GEMINI_API_KEY || 'AIzaSyDCIBynIZgNkeOSPlUomX-gElrRR3xcoA0';
        const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro-exp-03-25'; // Default model

        let requestData = {
            model: MODEL,
            contents: [],
        } as any;


        const prompt = "Transcribe this video. Format the output as a transcript with BOTH start AND end timestamps for each line in the format [START_TIME - END_TIME] where times are in the format MMmSSsNNNms (minutes, seconds, milliseconds). For example: [0m30s000ms - 0m35s500ms] or [1m45s200ms - 1m50s000ms]. Each subtitle entry should be 1-2 sentences maximum.";
        requestData.contents = [
            {
                role: "user",
                parts: [
                    { text: prompt },
                    {
                        fileData: {
                            fileUri: `https://www.youtube.com/watch?v=${input}`,
                        }
                    }
                ]
            }
        ];
       
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKeyGemini}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                }
            );
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
            }
    
            const data = await response.json();
            return data
            const subtitles = data.generatedContent.contents[0].parts[0].text;
            const parsedSubtitles = JSON.parse(subtitles);
            return parsedSubtitles;
        } catch (error) {
            console.error('Error generating script:', error);
            throw new Error(`Error generating script: ${error.message}`);
        }
    }
}