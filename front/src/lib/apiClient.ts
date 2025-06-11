// src/lib/apiClient.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // اجعلها true إذا كنت تستخدم Sanctum وترسل كوكيز
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// دالة التسجيل (Login)
export function loginUser(credentials: { email: string; password: string }) {
  return apiClient.post('/login', credentials);
}

// دالة تسجيل مستخدم جديد (Register)
export function registerUser(data: { name: string; email: string; password: string }) {
  return apiClient.post('/register', data);
}

// دالة جلب جميع الكورسات (Courses)
export function fetchCourses() {
  const token = localStorage.getItem('token');
  return apiClient.get('/courses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// دالة جلب كورس محدّد بالـ ID
export function fetchCourseById(id: number | string) {
  const token = localStorage.getItem('token');
  return apiClient.get(`/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// يمكنك إضافة دوال لباقي الموارد (Lessons, Quizzes, إلخ) بنفس النمط.
