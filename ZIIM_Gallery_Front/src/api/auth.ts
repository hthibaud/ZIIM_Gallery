const API_URL = "http://localhost:8000";

export type LoginData = {
  user_id: string;
  password: string;
};

export async function login(data: LoginData): Promise<string> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Authentication failed");
  }

  const token: string = await response.json();

  localStorage.setItem("access_token", token);

  return token;
}

export async function checkAuthentication() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return false;
  }

  const response = await fetch(`${API_URL}/test/auth/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
}

export function logout() {
  localStorage.removeItem("access_token");
}