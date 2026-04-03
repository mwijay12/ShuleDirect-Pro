'use server';
/**
 * @fileOverview A Genkit flow for generating tailored learning resources based on academic criteria.
 *
 * - createLearningResource - A function that handles the learning resource generation process.
 * - CreateLearningResourceInput - The input type for the createLearningResource function.
 * - CreateLearningResourceOutput - The return type for the createLearningResource function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreateLearningResourceInputSchema = z.object({
  subject: z.string().describe('The subject for which to create the learning resource (e.g., Mathematics, Physics).'),
  nectaCurriculumTopic: z.string().describe('The specific NECTA curriculum topic the resource should cover (e.g., Algebra, Kinematics).'),
  studentAcademicLevel: z.string().describe('The academic level of the students (e.g., O-Level Form 3, A-Level Form 6).'),
  resourceType: z.enum(['practice questions', 'topic summary', 'short explanation']).describe('The type of learning resource to generate.'),
});
export type CreateLearningResourceInput = z.infer<typeof CreateLearningResourceInputSchema>;

const CreateLearningResourceOutputSchema = z.object({
  resourceContent: z.string().describe('The generated learning resource content.'),
});
export type CreateLearningResourceOutput = z.infer<typeof CreateLearningResourceOutputSchema>;

export async function createLearningResource(input: CreateLearningResourceInput): Promise<CreateLearningResourceOutput> {
  return createLearningResourceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createLearningResourcePrompt',
  input: { schema: CreateLearningResourceInputSchema },
  output: { schema: CreateLearningResourceOutputSchema },
  prompt: `You are an expert educator and content creator for the Tanzanian NECTA curriculum. Your task is to generate tailored learning resources based on the provided specifications.

Generate a "{{{resourceType}}}" on the topic of "{{{nectaCurriculumTopic}}}" for "{{{studentAcademicLevel}}}" students in the subject of "{{{subject}}}".

Ensure the resource is:
- Academically appropriate for the specified student level and NECTA standards.
- Clear, concise, and easy to understand.
- Directly relevant to the curriculum topic.

For 'practice questions', provide at least 3-5 questions with clear instructions.
For 'topic summary', provide a comprehensive yet brief overview of the key concepts.
For 'short explanation', provide a simplified breakdown of a complex idea.

Generated Resource:`,
});

const createLearningResourceFlow = ai.defineFlow(
  {
    name: 'createLearningResourceFlow',
    inputSchema: CreateLearningResourceInputSchema,
    outputSchema: CreateLearningResourceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
