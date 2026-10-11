/**
 * @fileOverview TypeScript interfaces for the Shule Altra reporting engine.
 */

export interface SubjectResult {
  subject: string;
  score: number;
  grade: string;
  points: number;
  remark: string;
}

export interface ReportCardData {
  school: {
    name: string;
    logoUrl: string | null;
    academicYear: string;
    type: 'primary' | 'secondary';
  };
  student: {
    id: string;
    name: string;
    class: string;
    type: 'Boarder' | 'Day';
  };
  results: SubjectResult[];
  summary: {
    totalPoints: number;
    division: string;
    classification: string;
    position: number;
    totalInClass: number;
    averageScore: number;
  };
  term: string;
  examType: string;
  generatedAt: Date;
}
