import { SchemaType } from "@google/generative-ai";

const SubtitleSchema = {
    description: 'Subtitle',
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        timestamp: {
          type: SchemaType.STRING,
          description: 'The timestamp of the subtitle. for example 00:00,minute:second',
          pattern: '^\\d{2}:\\d{2}$', // Regex pattern to match the format "mm:ss",
        },
        text: {
          type: SchemaType.STRING,
          description: 'The text displayed for the subtitle.',
        }
      },
      required: ['timestamp', 'text'], // These fields are required
    }
}

export default SubtitleSchema;
  