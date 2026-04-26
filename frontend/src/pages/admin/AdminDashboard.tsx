import { Users, TrendingUp, Eye, Clock, UserCheck, ArrowUpRight, ArrowDownRight, Activity, DollarSign, Globe } from 'lucide-react';
import { useDomain } from '../../contexts/DomainContext';

const StatCard = ({ title, value, change, trend, icon: Icon, color }: {
  title: string; value: string; change: string; trend: 'up' | 'down'; icon: any; color: string;
}) => (
  <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <span className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </span>
    </div>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
);

const retentionData = [
  { cohort: 'Jan 2025', users: 142, w1: 100, w2: 82, w4: 71, w8: 58, w12: 49 },
  { cohort: 'Feb 2025', users: 168, w1: 100, w2: 79, w4: 68, w8: 55, w12: 44 },
  { cohort: 'Mar 2025', users: 195, w1: 100, w2: 85, w4: 74, w8: 61, w12: 52 },
  { cohort: 'Apr 2025', users: 221, w1: 100, w2: 88, w4: 77, w8: 64, w12: null },
  { cohort: 'May 2025', users: 256, w1: 100, w2: 84, w4: 72, w8: null, w12: null },
  { cohort: 'Jun 2025', users: 289, w1: 100, w2: 87, w4: null, w8: null, w12: null },
];

const pageViews = [
  { page: '/', views: 12480, bounce: '38%' },
  { page: '/features', views: 6240, bounce: '42%' },
  { page: '/pricing', views: 8910, bounce: '31%' },
  { page: '/about', views: 3120, bounce: '55%' },
  { page: '/contact', views: 2340, bounce: '29%' },
];

const retentionColor = (val: number | null) => {
  if (val === null) return 'bg-navy-700 text-gray-500';
  if (val >= 80) return 'bg-green-900/60 text-green-300';
  if (val >= 60) return 'bg-yellow-900/60 text-yellow-300';
  if (val >= 40) return 'bg-orange-900/60 text-orange-300';
  return 'bg-red-900/60 text-red-300';
};

const AdminDashboard = () => {
  const { appBaseUrl } = useDomain();

  const stats = [
    { title: 'Total Signups', value: '1,847', change: '+12.4%', trend: 'up' as const, icon: Users, color: 'bg-electric-600' },
    { title: 'Active Users (30d)', value: '934', change: '+8.1%', trend: 'up' as const, icon: UserCheck, color: 'bg-green-600' },
    { title: 'Page Views (7d)', value: '43,291', change: '+5.7%', trend: 'up' as const, icon: Eye, color: 'bg-blue-600' },
    { title: 'Avg. Session (min)', value: '4:32', change: '-0:18', trend: 'down' as const, icon: Clock, color: 'bg-purple-600' },
    { title: 'Churn Rate', value: '3.2%', change: '-0.4%', trend: 'up' as const, icon: TrendingUp, color: 'bg-red-600' },
    { title: 'MRR', value: '$18,430', change: '+9.3%', trend: 'up' as const, icon: DollarSign, color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back. Here's what's happening with Jobrythm.</p>
        </div>
        <div className="flex items-center space-x-2 bg-navy-800 border border-navy-700 rounded-lg px-4 py-2">
          <Globe size={16} className="text-electric-400" />
          <span className="text-sm text-gray-300">App: <span className="text-electric-400 font-medium">{appBaseUrl}</span></span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Page Views Table */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center space-x-2">
          <Activity size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">Top Pages (Last 7 days)</h3>
        </div>
        <div className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-navy-700">
                <th className="pb-3 font-medium">Page</th>
                <th className="pb-3 font-medium text-right">Views</th>
                <th className="pb-3 font-medium text-right">Bounce Rate</th>
                <th className="pb-3 font-medium">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {pageViews.map((row) => {
                const totalViews = pageViews.reduce((s, r) => s + r.views, 0);
                const pct = Math.round((row.views / totalViews) * 100);
                return (
                  <tr key={row.page} className="text-gray-300">
                    <td className="py-3 font-mono text-electric-400">{row.page}</td>
                    <td className="py-3 text-right text-white font-medium">{row.views.toLocaleString()}</td>
                    <td className="py-3 text-right">{row.bounce}</td>
                    <td className="py-3 pl-4 w-48">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-navy-700 rounded-full h-1.5">
                          <div className="bg-electric-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-400 w-8">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retention cohort table */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center space-x-2">
          <TrendingUp size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">User Retention by Cohort</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-navy-700">
                <th className="pb-3 font-medium">Cohort</th>
                <th className="pb-3 font-medium text-center">Users</th>
                <th className="pb-3 font-medium text-center">Week 1</th>
                <th className="pb-3 font-medium text-center">Week 2</th>
                <th className="pb-3 font-medium text-center">Week 4</th>
                <th className="pb-3 font-medium text-center">Week 8</th>
                <th className="pb-3 font-medium text-center">Week 12</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {retentionData.map((row) => (
                <tr key={row.cohort} className="text-gray-300">
                  <td className="py-3 font-medium text-white">{row.cohort}</td>
                  <td className="py-3 text-center">{row.users}</td>
                  {[row.w1, row.w2, row.w4, row.w8, row.w12].map((val, i) => (
                    <td key={i} className="py-3 px-2 text-center">
                      {val !== null ? (
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${retentionColor(val)}`}>
                          {val}%
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
