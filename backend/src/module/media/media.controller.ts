import { Controller, Get, NotFoundException, Param, Req, Res } from "@nestjs/common";
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('media')
export class MediaController {
    private readonly basePath: string = path.join(__dirname, '..', '..', '..', 'src', 'uploads')

    @Get(':filename')
    async getMediaFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = path.join(this.basePath, filename);

        // Kiểm tra file có tồn tại không
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        res.setHeader('Content-Type', 'audio/mpeg'); // hoặc 'audio/mp3'
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }

    @Get('audio/:filename')
    async getAudio(@Param('filename') filename: string, @Req() req: Request, @Res() res: Response) {
        const filePath = path.join(this.basePath, "audio", filename);
    
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }
    
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = (req.headers as any).range;
    
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;
    
            const file = fs.createReadStream(filePath, { start, end });
    
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'audio/mpeg',
            });
    
            file.pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mpeg',
                'Accept-Ranges': 'bytes',
            });
    
            fs.createReadStream(filePath).pipe(res);
        }
    }
    
}