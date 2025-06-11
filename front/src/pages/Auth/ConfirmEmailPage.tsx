// src/pages/ConfirmEmailPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token') ?? '';

  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    setStatus('loading');
    axios.post(
      `${apiBase}/verify-email`,
      { token },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(({ data }) => {
      setStatus('success');
      setMessage(data.message || 'Your email has been verified!');
    })
    .catch(err => {
      const resp = err.response?.data;
      setStatus('error');
      setMessage(resp?.message || 'Verification failed. The token may be invalid or expired.');
    });
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <p className="text-blue-200">Verifying your email…</p>;
      case 'success':
        return <p className="text-green-400">{message}</p>;
      case 'error':
        return <p className="text-red-400">{message}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {status === 'success' ? 'Email Confirmed!' : 'Confirm Your Email'}
          </h1>
          {renderContent()}

          {status === 'success' || status === 'error' ? (
            <div className="mt-6">
              <Button
                onClick={() => navigate('/login')}
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
