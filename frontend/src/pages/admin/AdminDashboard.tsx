import { useState, useEffect, useCallback } from 'react';
import {
  Users, TrendingUp, Eye, Clock, Activity, Globe,
  ArrowRight, RefreshCw, AlertCircle,
} from 'lucide-react';
import { useDomain } from '../../contexts/DomainContext';
import {
  fetchAnalyticsStats,
  type AnalyticsStats,
} from '../../services/analytics';

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmtMs(ms: number | null): string {
  if (ms == null || ms <= 0) return '—';
  const secs = Math.round(ms / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── sub-components ──────────────────────────────────────────────────────────

const StatCard = ({
  title, value, sub, icon: Icon, color,
}: {
  title: string; value: string; sub?: string; icon: any; color: string;
}) => (
  <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-gray-400">{title}</p>
    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
  </div>
);

const DailyChart = ({ data }: { data: AnalyticsStats['dailyViews'] }) => {
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  // Show at most 30 bars; label every ~5th
  const step = Math.max(1, Math.ceil(data.length / 10));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-36 text-gray-500 text-sm">
        No data for this period
      </div>
    );
  }

  return (
    <div className="pt-2">
      <div className="flex items-end gap-[3px] h-32">
        {data.map((d) => (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center justify-end group relative"
            style={{ minWidth: 0 }}
          >
            {/* tooltip */}
            <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
              <div className="bg-navy-700 border border-navy-600 text-xs text-white rounded px-2 py-1 whitespace-nowrap">
                {fmtDate(d.date)}: <span className="font-semibold">{d.views}</span> views
              </div>
            </div>
            <div
              className="w-full bg-electric-500 hover:bg-electric-400 rounded-t transition-colors cursor-default"
              style={{ height: `${Math.max(2, (d.views / maxViews) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="flex gap-[3px] mt-1">
        {data.map((d, i) => (
          <div key={d.date} className="flex-1 text-center" style={{ minWidth: 0 }}>
            {i % step === 0 && (
              <span className="text-[10px] text-gray-500 truncate block">
                {fmtDate(d.date)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── main component ──────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { appBaseUrl } = useDomain();
  const [days, setDays] = useState(7);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsStats(days);
      setStats(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => { load(); }, [load]);

  const totalViews = stats?.totalViews ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-gray-400 mt-1">Real visitor data for Jobrythm.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time range */}
          <div className="flex rounded-lg overflow-hidden border border-navy-700">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  days === d
                    ? 'bg-electric-600 text-white'
                    : 'bg-navy-800 text-gray-400 hover:text-white'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-800 border border-navy-700 rounded-lg text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <div className="flex items-center space-x-2 bg-navy-800 border border-navy-700 rounded-lg px-4 py-2">
            <Globe size={16} className="text-electric-400" />
            <span className="text-sm text-gray-300">
              <span className="text-electric-400 font-medium">{appBaseUrl}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/50 rounded-xl px-5 py-4 text-red-300">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Page Views"
          value={loading ? '…' : totalViews.toLocaleString()}
          sub={`Last ${days} days`}
          icon={Eye}
          color="bg-blue-600"
        />
        <StatCard
          title="Unique Visitors"
          value={loading ? '…' : (stats?.uniqueSessions ?? 0).toLocaleString()}
          sub="By session"
          icon={Users}
          color="bg-electric-600"
        />
        <StatCard
          title="Avg Session Duration"
          value={loading ? '…' : fmtMs(stats?.avgSessionMs ?? null)}
          sub="Across all pages"
          icon={Clock}
          color="bg-purple-600"
        />
        <StatCard
          title="Bounce Rate"
          value={loading ? '…' : `${stats?.bounceRate ?? 0}%`}
          sub="Single-page sessions"
          icon={TrendingUp}
          color="bg-orange-600"
        />
      </div>

      {/* Daily views chart */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center gap-2">
          <Activity size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">
            Page Views — Last {days} Days
          </h3>
        </div>
        <div className="px-6 pb-6 pt-4">
          {loading ? (
            <div className="h-36 flex items-center justify-center text-gray-500 text-sm">
              Loading…
            </div>
          ) : (
            <DailyChart data={stats?.dailyViews ?? []} />
          )}
        </div>
      </div>

      {/* Top pages table */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center gap-2">
          <Globe size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">Top Pages</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading…</p>
          ) : !stats || stats.pages.length === 0 ? (
            <p className="text-gray-500 text-sm">No page view data yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-navy-700">
                  <th className="pb-3 font-medium">Page</th>
                  <th className="pb-3 font-medium text-right">Views</th>
                  <th className="pb-3 font-medium text-right">Visitors</th>
                  <th className="pb-3 font-medium text-right">Avg Time</th>
                  <th className="pb-3 font-medium pl-4">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {stats.pages.map((row) => {
                  const pct = totalViews > 0
                    ? Math.round((row.views / totalViews) * 100)
                    : 0;
                  return (
                    <tr key={row.page} className="text-gray-300">
                      <td className="py-3 font-mono text-electric-400">{row.page}</td>
                      <td className="py-3 text-right text-white font-medium">
                        {row.views.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        {row.uniqueSessions.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">{fmtMs(row.avgDurationMs)}</td>
                      <td className="py-3 pl-4 w-48">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-navy-700 rounded-full h-1.5">
                            <div
                              className="bg-electric-500 h-1.5 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Navigation flow */}
      <div className="bg-navy-800 border border-navy-700 rounded-xl">
        <div className="px-6 py-4 border-b border-navy-700 flex items-center gap-2">
          <ArrowRight size={18} className="text-electric-400" />
          <h3 className="text-lg font-semibold text-white">Navigation Flow</h3>
          <span className="text-xs text-gray-500 ml-1">— which page visitors went to next</span>
        </div>
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading…</p>
          ) : !stats || stats.navFlow.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No navigation data yet. Visitors need to browse more than one page.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-navy-700">
                  <th className="pb-3 font-medium">From</th>
                  <th className="pb-3 font-medium px-4 text-center">→</th>
                  <th className="pb-3 font-medium">To</th>
                  <th className="pb-3 font-medium text-right">Count</th>
                  <th className="pb-3 font-medium pl-4">Share of exits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {stats.navFlow.map((row, i) => {
                  // total exits from each "from" page
                  const fromTotal = stats.navFlow
                    .filter((r) => r.from === row.from)
                    .reduce((s, r) => s + r.count, 0);
                  const pct = fromTotal > 0
                    ? Math.round((row.count / fromTotal) * 100)
                    : 0;
                  return (
                    <tr key={i} className="text-gray-300">
                      <td className="py-3 font-mono text-electric-400">{row.from}</td>
                      <td className="py-3 px-4 text-center text-gray-500">→</td>
                      <td className="py-3 font-mono text-green-400">{row.to}</td>
                      <td className="py-3 text-right text-white font-medium">
                        {row.count.toLocaleString()}
                      </td>
                      <td className="py-3 pl-4 w-44">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-navy-700 rounded-full h-1.5">
                            <div
                              className="bg-green-500 h-1.5 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

