import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update with deployed URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function requestUploadUrl(userId: string, metadata: any) {
  const response = await api.post('/runs/upload', { userId, metadata });
  return response.data;
}

export async function uploadRunData(uploadUrl: string, data: any) {
  await axios.put(uploadUrl, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function triggerProcessing(runId: string) {
  const response = await api.post(`/runs/${runId}/process`);
  return response.data;
}

export async function fetchRun(runId: string) {
  const response = await api.get(`/runs/${runId}`);
  return response.data;
}

export async function fetchRuns(userId: string) {
  const response = await api.get(`/runs?userId=${userId}`);
  return response.data;
}
