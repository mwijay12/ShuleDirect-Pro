/**
 * @fileOverview Official Academic Grade Types for Shule Altra.
 */

export interface GradeRecord {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  examType: string;
  term: string;
  academicYear: string;
}
