const { GoogleGenerativeAI } = require("@google/generative-ai");



export const createModelGemini = ({
    modelName, // Model name for Gemini model
    schemaModel,
}:{
    modelName: string,
    schemaModel: any,
}) => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || 'AIzaSyDCIBynIZgNkeOSPlUomX-gElrRR3xcoA0');
    const model = genAI.getGenerativeModel({
        model: modelName || "gemini-2.5-pro-exp-03-25",
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: schemaModel,
        },
    });

    return model;
}



