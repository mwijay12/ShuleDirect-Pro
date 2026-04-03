'use server';
/**
 * @fileOverview A Genkit flow for scanning exam papers and extracting scores.
 *
 * - scanExamPaper - Handles image processing to extract student ID and marks.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScanExamInputSchema = z.object({
  photoDataUri: z.string().describe("Data URI of the exam paper image (Base64)."),
});
export type ScanExamInput = z.infer<typeof ScanExamInputSchema>;

const ScanExamOutputSchema = z.object({
  examNumber: z.string().describe("Extracted NECTA-style examination number (e.g., S0101/0023)."),
  score: z.number().describe("The total marks/score extracted from the paper."),
  confidence: z.number().describe("Confidence score of the extraction (0-1)."),
});
export type ScanExamOutput = z.infer<typeof ScanExamOutputSchema>;

export async function scanExamPaper(input: ScanExamInput): Promise<ScanExamOutput> {
  return scanExamPaperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanExamPaperPrompt',
  input: { schema: ScanExamInputSchema },
  output: { schema: ScanExamOutputSchema },
  prompt: `You are an expert automated grading assistant for Tanzanian secondary schools. 
Scan the provided exam paper image.

TASK:
1. Extract the Student's Examination Number. It usually follows NECTA formats like SXXXX/XXXX or PXXXX/XXXX.
2. Extract the Final Total Score written on the paper (usually at the top or circled).

Return the data strictly as JSON.

Exam Image: {{media url=photoDataUri}}`,
});

const scanExamPaperFlow = ai.defineFlow(
  {
    name: 'scanExamPaperFlow',
    inputSchema: ScanExamInputSchema,
    outputSchema: ScanExamOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
