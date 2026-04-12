/**
 * @fileOverview Institutional OCR Validation & Fuzzy Matching Engine.
 */

/**
 * Fuzzy matches a subject string against the official curriculum nodes.
 */
export function matchSubjectNode(input: string): string {
  const mapping: Record<string, string> = {
    'math': 'Mathematics',
    'maths': 'Mathematics',
    'kiswa': 'Kiswahili',
    'ksw': 'Kiswahili',
    'eng': 'English',
    'engl': 'English',
    'phy': 'Physics',
    'chem': 'Chemistry',
    'bio': 'Biology',
    'civ': 'Civics',
    'hist': 'History',
    'geo': 'Geography'
  };

  const normalized = input.toLowerCase().trim();
  return mapping[normalized] || input;
}

/**
 * Validates a score is within 0-100 range.
 */
export function validateScore(score: number): { isValid: boolean; warning?: string } {
  if (score < 0 || score > 100) {
    return { isValid: false, warning: "Score out of 0-100 range" };
  }
  if (score === 0) {
    return { isValid: true, warning: "Verify if score is truly zero or blank" };
  }
  return { isValid: true };
}

/**
 * Simple Levenshtein-based name matcher for student identification.
 */
export function suggestStudentNode(extractedName: string, studentRegistry: any[]): any {
  if (!extractedName || studentRegistry.length === 0) return null;

  const normalizedExtracted = extractedName.toUpperCase();
  
  // 1. Try exact ID match
  const exactId = studentRegistry.find(s => s.id === normalizedExtracted);
  if (exactId) return exactId;

  // 2. Simple word-match score
  const matches = studentRegistry.map(s => {
    const name = s.name.toUpperCase();
    let score = 0;
    const extractedWords = normalizedExtracted.split(' ');
    extractedWords.forEach(w => {
      if (name.includes(w)) score++;
    });
    return { student: s, score };
  });

  const bestMatch = matches.sort((a, b) => b.score - a.score)[0];
  return bestMatch && bestMatch.score > 0 ? bestMatch.student : null;
}
