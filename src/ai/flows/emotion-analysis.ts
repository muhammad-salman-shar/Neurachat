// Emotion analysis flow to determine sentiment of user input.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmotionAnalysisInputSchema = z.object({
  text: z.string().describe('The text to analyze for emotional sentiment.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo from the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EmotionAnalysisInput = z.infer<typeof EmotionAnalysisInputSchema>;

const EmotionAnalysisOutputSchema = z.object({
  sentiment: z.string().describe('The overall sentiment of the text.'),
  suggestedAction: z
    .string()
    .describe(
      'A suggested action based on the sentiment, e.g., send a meme if the sentiment is negative.'
    ),
});
export type EmotionAnalysisOutput = z.infer<typeof EmotionAnalysisOutputSchema>;

export async function analyzeEmotion(input: EmotionAnalysisInput): Promise<EmotionAnalysisOutput> {
  return emotionAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionAnalysisPrompt',
  input: {schema: EmotionAnalysisInputSchema},
  output: {schema: EmotionAnalysisOutputSchema},
  prompt: `You are an AI assistant designed to analyze the sentiment of user input and suggest actions based on that sentiment.

  Analyze the following text:
  {{text}}

  {{#if photoDataUri}}
  Also, analyze the attached photo:
  {{media url=photoDataUri}}
  {{/if}}

  Determine the overall sentiment of the text and image (if provided).  Then, suggest an action that an AI friend might take, such as sending a meme if the sentiment is negative, or offering congratulations if the sentiment is positive.

  Return your analysis and suggested action in JSON format.`,
});

const emotionAnalysisFlow = ai.defineFlow(
  {
    name: 'emotionAnalysisFlow',
    inputSchema: EmotionAnalysisInputSchema,
    outputSchema: EmotionAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
