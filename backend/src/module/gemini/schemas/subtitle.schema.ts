import { SchemaType } from "@google/generative-ai";

const SubtitleSchema = {
    description: 'Subtitle',
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        start: {
          type: SchemaType.NUMBER,
          description: 'The start time of the subtitle in seconds.',
        },
        end: {
          type: SchemaType.NUMBER,
          description: 'The end time of the subtitle in seconds.',
        },
        text: {
          type: SchemaType.STRING,
          description: 'The text displayed for the subtitle.',
        }
      },
      required: ['start', 'end', 'text'], // These fields are required
    }
}

export default SubtitleSchema;
  