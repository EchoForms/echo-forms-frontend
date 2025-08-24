import axios from "./axios";

export interface FormResponseFieldCreate {
  formResponseId: number;
  formId: number;
  formfeildId: number;
  responseText?: string;
  voiceFileLink?: string;
  isLastQuestion?: boolean;
  file?: File | null;
  question_number?: number; // Used for file naming, not stored in DB
  responseTime?: number;
}

export async function createFormResponseField(data: FormResponseFieldCreate) {
  const response = await axios.post("/form-response-fields/", data);
  return response.data;
}

export async function createFormResponseFieldMultipart(data: FormResponseFieldCreate) {
  const formData = new FormData();
  formData.append("formResponseId", String(data.formResponseId));
  formData.append("formId", String(data.formId));
  formData.append("formfeildId", String(data.formfeildId));
  if (data.question_number) formData.append("question_number", String(data.question_number));
  if (data.responseText) formData.append("responseText", data.responseText);
  if (data.isLastQuestion) formData.append("isLastQuestion", "true");
  if (data.file) formData.append("file", data.file);
  if (data.responseTime) formData.append("responseTime", String(data.responseTime));
  const response = await axios.post("/form-response-fields/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
} 