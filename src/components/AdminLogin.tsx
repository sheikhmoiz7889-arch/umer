import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Mail, Lock, Loader2, LogIn, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Wrong email or password' : error.message);
      setLoading(false);
    } else {
      onLoggedIn();
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-4">
      {/* decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-bubble-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-400/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl bg-white/95 p-8 shadow-float backdrop-blur-xl ring-1 ring-white/20">
          {/* logo */}
          <div className="flex flex-col items-center text-center">
            <motion.span
              initial={{ rotate: -12, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-sun-300 via-bubble-400 to-bubble-500 shadow-glow-bubble"
            >
              <Crown className="h-8 w-8 text-white" strokeWidth={2.5} />
            </motion.span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy-900">Umer Garments</h1>
            <p className="mt-1 text-sm font-semibold text-navy-700/60">Admin Panel Login</p>
          </div>

          {/* error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-5 flex items-center gap-2 rounded-xl bg-bubble-50 px-4 py-3 text-sm font-semibold text-bubble-600 ring-1 ring-bubble-100"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-700/60">Email</span>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="input pl-11"
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-700/60">Password</span>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-11"
                  autoComplete="current-password"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy-900 to-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs font-semibold text-white/40">
          Authorized access only. Umer Garments Admin.
        </p>
      </motion.div>
    </div>
  );
}
