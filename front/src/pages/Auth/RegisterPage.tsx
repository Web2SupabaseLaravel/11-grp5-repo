'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {
  BookOpen,
  Users,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

type FieldName = 'name' | 'email' | 'password' | 'confirmPassword';

export default function RegisterPage() {
  const navigate = useNavigate();

  // form state
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField]     = useState<FieldName | null>(null);
  const [error, setError]                   = useState<string>('');
  const [success, setSuccess]               = useState<string>('');
  const [isLoading, setIsLoading]           = useState(false);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

  const inputBase =
    'h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 backdrop-blur-sm transition-all duration-300';

  const getInputClasses = (field: FieldName) =>
    `${inputBase} ${
      focusedField === field
        ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-500/25'
        : 'hover:bg-white/15'
    }`;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // client-side sanity checks
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email) {
      setError('Email is required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${apiBase}/register`,
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccess(data.message);
      // wait a bit then redirect
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      const resp = err.response?.data;
      if (resp?.errors) {
        // Laravel validation errors come in resp.errors.*
        const list = Object.values(resp.errors).flat().join('\n');
        setError(list);
      } else {
        setError(resp?.message || 'Registration failed. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">
      {/* float keyframes */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* icons */}
      <div className="absolute top-24 left-16 animate-float"><BookOpen className="w-6 h-6 text-white/10" /></div>
      <div className="absolute top-40 right-20 animate-float"><Users className="w-6 h-6 text-white/10" /></div>
      <div className="absolute top-1/2 left-1/3 animate-float"><Sparkles className="w-6 h-6 text-white/10" /></div>

      {/* glows */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* header */}
          <div className="flex justify-center mb-10">
            <div className="relative flex items-center space-x-3 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Learning Courses</span>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6 space-y-2">
                <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
                <p className="text-blue-200/80 max-w-sm mx-auto">
                  Sign up to access all courses
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Name */}
                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your full name"
                    className={getInputClasses('name')}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className={getInputClasses('email')}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter password"
                    className={getInputClasses('password')}
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Re-enter password"
                    className={getInputClasses('confirmPassword')}
                  />
                </div>

                {error && <p className="text-sm text-red-600 whitespace-pre-wrap">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Registering…' : 'Create Account'}
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
