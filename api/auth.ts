const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: number;
  email: string;
  name: string;
};

export type AuthResponse = {
  token: string;
};

export const authApi = {
  register: async (data: RegisterDTO): Promise<UserResponse> => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return response.json();
  },

  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    return response.json();
  },
};
