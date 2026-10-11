export type StaffRole = 'ADMIN' | 'TEACHER' | 'ACCOUNTANT';

export interface Staff {
  id: string;
  staffNo: string;
  fullName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department?: string;
  active: boolean;
  joinedDate: string;
  createdAt: any;
}
