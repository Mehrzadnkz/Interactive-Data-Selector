import axios from 'axios';

// تنظیمات پایه axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// تایپ برای User
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  company?: {
    name: string;
    title: string;
  };
  address?: {
    city: string;
    state: string;
  };
}

// تایپ برای پاسخ API
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// سرویس‌های API
export const userAPI = {
  // دریافت همه کاربران
  getAllUsers: async (): Promise<UsersResponse> => {
    try {
      const response = await api.get<UsersResponse>('/users');
      return response.data;
    } catch (error) {
      console.error('خطا در دریافت کاربران:', error);
      throw error;
    }
  },

  // دریافت کاربران با محدودیت تعداد
  getUsers: async (limit: number = 10): Promise<UsersResponse> => {
    try {
      const response = await api.get<UsersResponse>(`/users?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('خطا در دریافت کاربران:', error);
      throw error;
    }
  },

  // دریافت یک کاربر با ID
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`خطا در دریافت کاربر ${id}:`, error);
      throw error;
    }
  },

  // جستجوی کاربران
  searchUsers: async (query: string): Promise<UsersResponse> => {
    try {
      const response = await api.get<UsersResponse>(`/users/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('خطا در جستجوی کاربران:', error);
      throw error;
    }
  },
};

export default api;