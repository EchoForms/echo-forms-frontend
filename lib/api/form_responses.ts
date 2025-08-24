import axios from "./axios";

export interface FormResponseCreate {
  formId: number;
  status?: string;
  submitTimestamp?: string | null;
}

export interface FormResponse {
  responseId: number;
  formId: number;
  status: string;
  startTimestamp: string;
  updateTimestamp: string;
  submitTimestamp: string | null;
}

export async function createFormResponse(data: FormResponseCreate): Promise<FormResponse> {
  const response = await axios.post("/form-responses/", data);
  return response.data;
}

export async function getFormResponsesByFormId(formId: number): Promise<FormResponse[]> {
  const response = await axios.get(`/form-responses/by-form/${formId}`);
  return response.data;
}

export async function getFormResponseById(responseId: number): Promise<FormResponse> {
  const response = await axios.get(`/form-responses/${responseId}`);
  return response.data;
} 