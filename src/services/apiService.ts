import axios from "axios";
import { API_URL } from "../config";

//get
export async function getAsync<T>(path: string): Promise<T> {
  const response = await axios.get<T>(`${API_URL}${path}`);
  console.log(response);
  return response.data;
}

export async function getWithTokenAsync<T>(
  path: string,
  token: string
): Promise<T> {
  const response = await axios.get<T>(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  return response.data;
}

//post
export async function postAsync(path: string, data: any) {
  const response = await axios.post(`${API_URL}${path}`, data);
  console.log(response);
}

export async function postWithTokenAsync(
  path: string,
  data: any,
  token: string
) {
  const response = await axios.post(`${API_URL}${path}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}

//put
export async function putAsync(path: string, data: any) {
  const response = await axios.put(`${API_URL}${path}`, data);
}

export async function putWithTokenAsync(
  path: string,
  data: any,
  token: string
) {
  const response = await axios.put(`${API_URL}${path}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}

//delete
export async function deleteAsync(path: string) {
  const response = await axios.delete(`${API_URL}${path}`);
}

export async function deleteWithTokenAsync(path: string, token: string) {
  const response = await axios.delete(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}
