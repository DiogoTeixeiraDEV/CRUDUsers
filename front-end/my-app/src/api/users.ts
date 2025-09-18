
const API_URL = 'http://localhost:3000/users';

export interface LoginResponse {
  token: string;
  user : {
    id: number;
    username: string;
    email: string;
  }
}

export interface RegisterData {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Email ou senha inválidos');
  }
  return response.json();
}

export async function registerUser(data: RegisterData){
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
    if (!response.ok) { 
        throw new Error('Failed to register user');
    }
    return response.json();
}