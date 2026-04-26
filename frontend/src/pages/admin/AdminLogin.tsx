import { useState } from 'react';
import logo from '../../assets/Jobrythm.png';

interface AdminLoginProps {
  onLogin: () => void;
}

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'adminpassword';

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Jobrythm" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 mt-1">Sign in to your admin account</p>
        </div>
        <div className="bg-navy-800 border border-navy-700 rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-navy-900 border border-navy-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent placeholder-gray-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-navy-900 border border-navy-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-electric-600 hover:bg-electric-500 text-white font-semibold rounded-lg px-4 py-2.5 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
