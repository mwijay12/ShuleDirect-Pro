
'use server';
/**
 * @fileOverview A Genkit flow for scanning student registration forms or ID cards.
 *
 * - scanStudentRegistration - Handles image processing to extract student profile data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScanStudentInputSchema = z.object({
  photoDataUri: z.string().describe("Data URI of the registration form or student ID image (Base64)."),
});
export type ScanStudentInput = z.infer<typeof ScanStudentInputSchema>;

const ScanStudentOutputSchema = z.object({
  name: z.string().describe("Full legal name of the student."),
  id: z.string().describe("Examination or Institutional ID number."),
  academicLevel: z.string().describe("Extracted level (e.g., Standard 7, Form 2, Form 4)."),
  gender: z.enum(['M', 'F']).optional(),
  parentContact: z.string().optional().describe("Phone number of the parent/guardian."),
});
export type ScanStudentOutput = z.infer<typeof ScanStudentOutputSchema>;

export async function scanStudentRegistration(input: ScanStudentInput): Promise<ScanStudentOutput> {
  return scanStudentRegistrationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanStudentRegistrationPrompt',
  input: { schema: ScanStudentInputSchema },
  output: { schema: ScanStudentOutputSchema },
  prompt: `You are an institutional administrative assistant for Tanzanian schools. 
Extract student data from the provided registration form or ID card image.

TASK:
1. Extract the Full Name (Capitalize correctly).
2. Extract the ID Number (e.g., S4939/0001 or PS0206098-001).
3. Identify the Academic Level (Standard 1-7 or Form 1-6).
4. Identify Gender if clearly visible.
5. Extract Parent/Guardian Phone Number if available (usually starts with +255 or 0).

Return the data strictly as JSON.

Registration Image: {{media url=photoDataUri}}`,
});

const scanStudentRegistrationFlow = ai.defineFlow(
  {
    name: 'scanStudentRegistrationFlow',
    inputSchema: ScanStudentInputSchema,
    outputSchema: ScanStudentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
