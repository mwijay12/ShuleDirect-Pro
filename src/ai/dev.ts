
import { config } from 'dotenv';
config();

import '@/ai/flows/create-learning-resource-flow.ts';
import '@/ai/flows/generate-student-progress-summary-flow.ts';
import '@/ai/flows/scan-exam-flow.ts';
import '@/ai/flows/scan-student-registration-flow.ts';
