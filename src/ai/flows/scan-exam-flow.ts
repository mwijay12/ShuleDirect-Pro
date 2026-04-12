'use server';
/**
 * @fileOverview Production-Grade Genkit flow for scanning exam papers.
 * Features: Multi-student extraction, confidence scoring, and orientation detection.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScanExamInputSchema = z.object({
  photoDataUri: z.string().describe("Data URI of the exam paper image (Base64)."),
});
export type ScanExamInput = z.infer<typeof ScanExamInputSchema>;

const ScanExamOutputSchema = z.object({
  students: z.array(z.object({
    name: z.string().describe("Extracted student name"),
    examNumber: z.string().describe("Extracted NECTA-style ID (e.g., S0101/0023)"),
    scores: z.array(z.object({
      subject: z.string().describe("Subject name (e.g. Mathematics)"),
      rawScore: z.number().describe("The total marks/score extracted"),
      grade: z.string().optional().describe("Letter grade if present on paper"),
      confidence: z.number().describe("AI confidence for this specific score extraction (0-1)")
    }))
  })),
  metadata: z.object({
    isUpsideDown: z.boolean().describe("Whether the paper appears to be upside-down"),
    totalConfidence: z.number().describe("Overall document confidence (0-1)"),
    warnings: z.array(z.string()).describe("Warnings like 'poor lighting' or 'blurry text'")
  })
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
Your task is to extract exam scores from handwritten papers with 100% precision.

HANDWRITING RULES:
1. Pay close attention to "8" and "3" - they often look similar.
2. If a score is CROSSED OUT and a new one is written next to it, ONLY extract the new one.
3. If text is blurry or illegible, set a low confidence (e.g. 0.3).

TASKS:
1. Identify if the document is upside-down.
2. Extract the Student's Full Name and Examination Number.
3. Extract each Subject and its associated Score.
4. Provide a confidence score (0-1) for every data point extracted.

Return strictly valid JSON.

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
