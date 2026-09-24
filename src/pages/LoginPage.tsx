import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Lock, Mail, AlertCircle, Check } from 'lucide-react';
import { Modal } from '../components/ui/CommonUI';

export const LoginPage: React.FC = () => {
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await login('explorer@dux.community', 'google-auth-token');
    navigate('/dashboard');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    showToast({
      type: 'info',
      title: 'Reset Link Dispatched',
      message: `If an account exists for ${forgotEmail}, instructions were sent.`
    });
    setTimeout(() => {
      setForgotModalOpen(false);
      setResetSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <polygon points="12,3 15.5,12 12,10 8.5,12" fill="#FFD400" />
              <polygon points="12,21 15.5,12 12,10 8.5,12" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tight text-[#111111]">DUX</span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111]">
          WELCOME BACK
        </h2>
        <p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#777777]">
          RETURN TO YOUR DIRECTION
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#E5E0D5] rounded-3xl shadow-sm">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.vance@dux.community"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-[#777777] hover:text-[#111111] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{loading ? 'CALIBRATING...' : 'LOG IN'}</span>
              <ArrowRight className="w-4 h-4 text-[#FFD400]" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E0D5]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 font-mono text-[#777777] text-[10px]">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full mt-4 py-3 bg-white border border-[#E5E0D5] hover:bg-[#F5F1E8] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-[#E5E0D5]">
            <p className="text-xs text-[#777777]">
              Don't have a DUX account yet?{' '}
              <Link to="/signup" className="font-bold text-[#111111] hover:underline uppercase tracking-wide">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="RESET PASSWORD"
        subtitle="We will send you a recovery link to recalibrate access."
      >
        {resetSent ? (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="text-sm font-bold text-[#111111]">Instructions Sent</p>
            <p className="text-xs text-[#777777] mt-1">Check your inbox for reset instructions.</p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5E0D5] rounded-xl text-xs focus:outline-none focus:border-[#111111]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
