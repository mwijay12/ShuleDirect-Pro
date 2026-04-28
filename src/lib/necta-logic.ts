/**
 * @fileOverview NECTA-Compliant Grading & Division Logic Node 2026.
 * Implementation of official PSLE and CSEE aggregation rules.
 */

export type NectaLevel = 'PSLE' | 'FTNA' | 'CSEE' | 'ACSEE';

export interface GradeResult {
  grade: string;
  points: number;
  remarks: string;
}

/**
 * PSLE (Standard 7) Grading Matrix
 */
export function calculatePsleGrade(marks: number): GradeResult {
  if (marks >= 41) return { grade: 'A', points: 1, remarks: 'EXCELLENT' };
  if (marks >= 30) return { grade: 'B', points: 2, remarks: 'VERY GOOD' };
  if (marks >= 21) return { grade: 'C', points: 3, remarks: 'GOOD' };
  if (marks >= 10) return { grade: 'D', points: 4, remarks: 'SATISFACTORY' };
  return { grade: 'E', points: 5, remarks: 'FAIL' };
}

/**
 * CSEE (Form 4) / FTNA (Form 2) Grading Matrix
 */
export function calculateCseeGrade(marks: number): GradeResult {
  if (marks >= 75) return { grade: 'A', points: 1, remarks: 'EXCELLENT' };
  if (marks >= 60) return { grade: 'B', points: 2, remarks: 'VERY GOOD' };
  if (marks >= 45) return { grade: 'C', points: 3, remarks: 'GOOD' };
  if (marks >= 30) return { grade: 'D', points: 4, remarks: 'SATISFACTORY' };
  return { grade: 'F', points: 5, remarks: 'FAIL' };
}

/**
 * Division Classification for CSEE (Best 7 Subjects)
 */
export function classifyCseeDivision(totalPoints: number): string {
  if (totalPoints >= 7 && totalPoints <= 17) return 'I';
  if (totalPoints >= 18 && totalPoints <= 21) return 'II';
  if (totalPoints >= 22 && totalPoints <= 25) return 'III';
  if (totalPoints >= 26 && totalPoints <= 33) return 'IV';
  return '0';
}
