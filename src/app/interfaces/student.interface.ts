export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  document_number: number;
}

export interface StudentInscription {
  id?: number;
  student_id: number;
  course_id: number;
  course?: string;
}

export interface Inscriptions {
  id?: number;
  student_id: number;
  course_id: number;
  student_name?: string;
  course_name?: string;
}
