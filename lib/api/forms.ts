import api from './axios';

export interface FormFieldPayload {
  question: string;
  required: boolean;
  options?: any;
  question_number?: number;
}

export async function fetchForms() {
  const res = await api.get('/forms/');
  return res.data;
}

export async function fetchFormByUniqueId(form_unique_id: string) {
  const res = await api.get(`/forms/public/${form_unique_id}`);
  return res.data;
}

export async function fetchFormById(formId: number) {
  const res = await api.get(`/forms/${formId}`);
  return res.data;
}

export async function createForm(data: { title: string; description?: string; language?: string; status?: string; fields?: FormFieldPayload[] }) {
  const res = await api.post('/forms/', data);
  return res.data;
}

export async function updateForm(formId: number, data: Partial<{ title: string; description: string; language: string; status: string }>) {
  const res = await api.put(`/forms/${formId}`, data);
  return res.data;
}

export async function deleteForm(formId: number) {
  const res = await api.delete(`/forms/${formId}`);
  return res.data;
} 