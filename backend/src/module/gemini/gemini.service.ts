import { Injectable } from "@nestjs/common";
import { createModelGemini } from "../../config/gemini.config";
import SubtitleSchema from "./schemas/subtitle.schema"
import { FileData, FileDataPart, GenerateContentRequest } from "@google/generative-ai";

@Injectable()
export class GeminiService {
    constructor(
    ) {
    }
    /**
     * generate script using gemini
     * @param input : string - video url
     */
    generateScript = async ({ input }: { input: string }) => {
        const apiKeyGemini = process.env.GEMINI_API_KEY || 'AIzaSyDCIBynIZgNkeOSPlUomX-gElrRR3xcoA0';
        const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro-exp-03-25'; // Default model

        const prompt = "Transcribe this video. Each subtitle entry should be 1-2 sentences maximum.";
        const model = createModelGemini({
            modelName: MODEL,
            schemaModel: SubtitleSchema,
        });
        const fileDataPart = {
            fileData: {
                fileUri: `https://www.youtube.com/watch?v=${input}`,
                mimeType: "video/mp4",
            }
        } as FileDataPart
        try {
            const result = await model.generateContent([prompt, fileDataPart])
            console.log("res", result.response.text());
            const regex = /```json|```/g;
            const cleanedText = result.response.text().replace(regex, '');
            return JSON.parse(cleanedText)
        } catch (error) {
            // console.log('error', error)
            throw new Error(`Error generating script: ${error.message}`);
        }
    }
}