'use server';

/**
 * @fileOverview An AI agent that analyzes a photo and provides an honest review and a fun, personalized comment.
 *
 * - analyzePhoto - A function that handles the photo analysis process.
 * - AnalyzePhotoInput - The input type for the analyzePhoto function.
 * - AnalyzePhotoOutput - The return type for the analyzePhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be analyzed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePhotoInput = z.infer<typeof AnalyzePhotoInputSchema>;

const AnalyzePhotoOutputSchema = z.object({
  review: z.string().describe('An honest review of the photo.'),
  comment: z.string().describe('A fun, personalized comment about the photo.'),
});
export type AnalyzePhotoOutput = z.infer<typeof AnalyzePhotoOutputSchema>;

export async function analyzePhoto(input: AnalyzePhotoInput): Promise<AnalyzePhotoOutput> {
  return analyzePhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePhotoPrompt',
  input: {schema: AnalyzePhotoInputSchema},
  output: {schema: AnalyzePhotoOutputSchema},
  prompt: `You are an AI assistant that analyzes photos and provides an honest review and a fun, personalized comment, acting as the Friend Agent.

Analyze the following photo and provide an honest review and a fun, personalized comment.

Photo: {{media url=photoDataUri}}

Review:
Comment:`,
});

const analyzePhotoFlow = ai.defineFlow(
  {
    name: 'analyzePhotoFlow',
    inputSchema: AnalyzePhotoInputSchema,
    outputSchema: AnalyzePhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
