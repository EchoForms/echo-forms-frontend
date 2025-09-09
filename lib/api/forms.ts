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

export async function fetchFormByUniqueId(uniqueId: string) {
  const response = await api.get(`/forms/public/${uniqueId}`);
  return response.data;
}

export async function fetchFormResults(formId: number) {
  const response = await api.get(`/forms/${formId}/results`);
  return response.data;
}

export async function fetchFormResponses(
  formId: number, 
  page: number = 1, 
  limit: number = 10,
  questionFilter?: string,
  search?: string
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  
  if (questionFilter && questionFilter !== 'all') {
    params.append('question_filter', questionFilter);
  }
  
  if (search) {
    params.append('search', search);
  }
  
  const response = await api.get(`/forms/${formId}/responses?${params.toString()}`);
  return response.data;
}

export async function fetchFormById(formId: number) {
  const res = await api.get(`/forms/${formId}`);
  return res.data;
}

export async function fetchFormAnalytics(formId: number) {
  const response = await api.get(`/form-analytics/form/${formId}`);
  return response.data;
}

export async function fetchFormAnalyticsSummary(formId: number) {
  const response = await api.get(`/form-analytics/form/${formId}/summary`);
  return response.data;
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