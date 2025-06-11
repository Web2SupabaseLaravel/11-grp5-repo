// src/pages/ForgotPasswordPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Mail as MailIcon, ArrowLeft } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-indigo-950">
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-xl">
        <h2 className="text-white text-2xl mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="email" className="text-blue-100">Email</Label>
          <div className="relative">
            <MailIcon className="absolute top-2 left-2 text-blue-300/50" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="you@example.com"
              className={
                `pl-8 bg-white/10 placeholder-blue-200 text-white ` +
                (focused === 'email'
                  ? 'border-blue-400 bg-white/20 shadow'
                  : 'hover:bg-white/15')
              }
            />
          </div>
          {error   && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </Button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm text-blue-300 hover:underline flex items-center"
          >
            <ArrowLeft className="mr-1" /> Back to Login
          </button>
        </form>
      </Card>
    </div>
  );
}
