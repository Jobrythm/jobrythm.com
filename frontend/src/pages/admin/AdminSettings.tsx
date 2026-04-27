import { useState } from 'react';
import { Globe, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { useDomain } from '../../contexts/DomainContext';

const AdminSettings = () => {
  const { rootDomain, setRootDomain, appBaseUrl, loginUrl, signupUrl } = useDomain();
  const [inputDomain, setInputDomain] = useState(rootDomain);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputDomain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    setRootDomain(clean);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setInputDomain('jobrythm.app');
    setRootDomain('jobrythm.app');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presets = [
    { label: 'Production', value: 'jobrythm.app' },
    { label: 'Testing', value: 'jobrythm.aricummings.com' },
    { label: 'Local', value: 'localhost' },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-400 mt-1">Configure your Jobrythm deployment settings.</p>
      </div>

      {/* Domain Setting */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center space-x-2">
          <Globe size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">App Domain</h3>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-400">
            Set the app domain for this deployment. This affects all "Log in" and "Start free" links throughout the site.
          </p>

          {/* Preset buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Quick select</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setInputDomain(preset.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    inputDomain === preset.value
                      ? 'bg-electric-600/20 border-electric-600 text-electric-400'
                      : 'bg-navy-700 border-navy-600 text-gray-300 hover:border-electric-600 hover:text-electric-400'
                  }`}
                >
                  {preset.label}
                  <span className="ml-2 font-mono text-xs opacity-70">{preset.value}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">App domain</label>
              <input
                type="text"
                value={inputDomain}
                onChange={e => setInputDomain(e.target.value)}
                className="w-full bg-navy-900 border border-navy-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent font-mono text-sm"
                placeholder="jobrythm.app"
              />
              <p className="mt-2 text-xs text-gray-500">
                App URL: <span className="text-electric-400 font-mono">https://{inputDomain || 'jobrythm.app'}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-electric-600 hover:bg-electric-500 text-white font-semibold rounded-lg px-5 py-2.5 transition-colors"
              >
                <Save size={16} />
                <span>Save changes</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-2 bg-navy-700 hover:bg-navy-600 text-gray-300 font-medium rounded-lg px-5 py-2.5 border border-navy-600 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Reset to default</span>
              </button>
            </div>
            {saved && (
              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                <span>Settings saved successfully.</span>
              </div>
            )}
          </form>

          {/* Current resolved URLs */}
          <div className="bg-navy-900 rounded-lg border border-navy-700 p-4 space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Currently resolved URLs</p>
            {[
              { label: 'App base', url: appBaseUrl },
              { label: 'Login', url: loginUrl },
              { label: 'Sign up', url: signupUrl },
            ].map(({ label, url }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-mono text-electric-400">{url}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
