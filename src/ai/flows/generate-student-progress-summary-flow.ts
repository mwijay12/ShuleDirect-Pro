'use server';
/**
 * @fileOverview A Genkit flow for generating concise, natural language summaries of student progress.
 *
 * - generateStudentProgressSummary - A function that handles the generation of student progress summaries.
 * - GenerateStudentProgressSummaryInput - The input type for the generateStudentProgressSummary function.
 * - GenerateStudentProgressSummaryOutput - The return type for the generateStudentProgressSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicPerformanceEntrySchema = z.object({
  subject: z.string().describe('The name of the academic subject.'),
  grade: z.string().describe('The grade or score received in the subject (e.g., "A", "B", "75%").'),
  comment: z.string().optional().describe('Optional comments about the student\'s performance in this subject.'),
});

const GenerateStudentProgressSummaryInputSchema = z.object({
  studentName: z.string().describe('The full name of the student.'),
  academicPerformance: z.array(AcademicPerformanceEntrySchema).describe('A list of academic subjects with their respective grades and comments.'),
  attendanceSummary: z.string().describe('A summary of the student\'s attendance record (e.g., "Excellent attendance, 0 unexcused absences." or "Has had 5 unexcused absences this semester.").'),
  behavioralNotes: z.string().describe('A summary of the student\'s behavioral notes or conduct (e.g., "Generally well-behaved, with one incident of disruptive behavior in class." or "Consistently demonstrates positive classroom participation and leadership.").'),
});
export type GenerateStudentProgressSummaryInput = z.infer<typeof GenerateStudentProgressSummaryInputSchema>;

const GenerateStudentProgressSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, natural language summary of the student\'s academic performance, attendance, and behavioral notes.'),
});
export type GenerateStudentProgressSummaryOutput = z.infer<typeof GenerateStudentProgressSummaryOutputSchema>;

export async function generateStudentProgressSummary(input: GenerateStudentProgressSummaryInput): Promise<GenerateStudentProgressSummaryOutput> {
  return generateStudentProgressSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentProgressSummaryPrompt',
  input: {schema: GenerateStudentProgressSummaryInputSchema},
  output: {schema: GenerateStudentProgressSummaryOutputSchema},
  prompt: `You are an AI assistant designed to generate concise and natural language summaries of student progress for teachers and administrators. Your goal is to combine academic performance, attendance records, and behavioral notes into a single, easy-to-understand summary.

Please generate a summary for the following student:

Student Name: {{{studentName}}}

Academic Performance:
{{#each academicPerformance}}
  - Subject: {{{subject}}}, Grade: {{{grade}}}{{#if comment}}, Notes: {{{comment}}}{{/if}}
{{/each}}

Attendance Summary: {{{attendanceSummary}}}

Behavioral Notes: {{{behavioralNotes}}}

Generate a summary that is suitable for a parent-teacher conference or an internal staff update. Keep it professional, objective, and easy to read. Focus on key achievements, areas for improvement, and overall progress.

Summary:`,
});

const generateStudentProgressSummaryFlow = ai.defineFlow(
  {
    name: 'generateStudentProgressSummaryFlow',
    inputSchema: GenerateStudentProgressSummaryInputSchema,
    outputSchema: GenerateStudentProgressSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
