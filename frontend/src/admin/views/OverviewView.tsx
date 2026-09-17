import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Download,
  Inbox,
  MousePointerClick,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import { getAdminEnquiries, getAdminOverview, type AdminOverview, type AnalyticsPoint } from '../../api/admin';
import { navigate } from '../../routing';
import { ErrorBanner, PageLoader, StatusBadge } from '../components';
import { formatAdminDate, humanize } from '../format';
import { downloadEnquiriesCsv, downloadEnquiriesExcel } from '../enquiryExport';

export function OverviewView() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState<'daily' | 'monthly'>('daily');

  useEffect(() => {
    let active = true;
    getAdminOverview()
      .then((result) => { if (active) setData(result); })
      .catch((err) => { if (active) setError(err instanceof Error ? err.message : 'Unable to load overview.'); });
    return () => { active = false; };
  }, []);

  if (error) return <ErrorBanner message={error} />;
  if (!data) return <PageLoader label="Loading dashboard" />;

  const metrics = [
    { label: 'Website visits', value: data.analytics.total_visits_30_days, note: 'Last 30 days', icon: MousePointerClick },
    { label: 'Visitors', value: data.analytics.unique_sessions_30_days, note: 'Last 30 days', icon: TrendingUp },
    { label: 'Enquiries', value: data.total_enquiries, note: 'Customer interest', icon: Inbox },
    { label: 'Active staff', value: data.active_team_members, note: 'Current staff access', icon: UsersRound },
    { label: 'New enquiries', value: data.new_enquiries, note: 'Awaiting first follow-up', icon: Activity },
  ];

  const downloadAll = async (format: 'csv' | 'excel') => {
    const enquiries = await getAdminEnquiries({ page: 1, pageSize: 100 });
    if (format === 'csv') downloadEnquiriesCsv(enquiries.items);
    else downloadEnquiriesExcel(enquiries.items);
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, note, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-[#DFD7D0] bg-[#FBF9F7] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8A7D74]">{label}</p>
                <p className="mt-3 font-serif text-[34px] leading-none text-[#2C2723]">{value.toLocaleString()}</p>
                <p className="mt-3 text-xs text-[#8A8078]">{note}</p>
              </div>
              <div className="rounded-xl bg-[#EEE6DF] p-2.5 text-[#8B705B]"><Icon className="h-4.5 w-4.5" /></div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.65fr_.85fr]">
        <article className="rounded-[24px] border border-[#DFD7D0] bg-[#FBF9F7] shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#E7E0DA] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#9B7F66]">Audience activity</p>
              <h3 className="mt-1 font-serif text-2xl text-[#2B2622]">{period === 'daily' ? 'Daily visits' : 'Monthly visits'}</h3>
              <p className="mt-1 text-xs text-[#8A8078]">{period === 'daily' ? 'Recent 14 days' : 'Up to 12 months'}</p>
            </div>
            <div className="flex rounded-xl bg-[#EEE8E2] p-1">
              <button type="button" onClick={() => setPeriod('daily')} className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${period === 'daily' ? 'bg-white text-[#342D28] shadow-sm' : 'text-[#82776F]'}`}>Days</button>
              <button type="button" onClick={() => setPeriod('monthly')} className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${period === 'monthly' ? 'bg-white text-[#342D28] shadow-sm' : 'text-[#82776F]'}`}>Months</button>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <TrafficChart points={period === 'daily' ? data.analytics.daily : data.analytics.monthly} />
          </div>
        </article>

        <article className="rounded-[24px] border border-[#DFD7D0] bg-[#FBF9F7] shadow-sm">
          <div className="border-b border-[#E7E0DA] px-6 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#9B7F66]">Most viewed</p>
            <h3 className="mt-1 font-serif text-2xl text-[#2B2622]">Popular pages</h3>
            <p className="mt-1 text-xs text-[#8A8078]">Last 30 days</p>
          </div>
          <div className="p-6">
            {data.analytics.top_pages.length ? (
              <div className="space-y-5">
                {data.analytics.top_pages.map((page, index) => {
                  const max = data.analytics.top_pages[0]?.visits || 1;
                  const width = Math.max(7, (page.visits / max) * 100);
                  return (
                    <div key={page.path}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0"><span className="mr-2 text-[#B09A88]">0{index + 1}</span><span className="truncate font-medium text-[#473F39]">{page.path}</span></div>
                        <span className="shrink-0 text-[#8A8078]">{page.visits} visits</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#ECE5DF]"><div className="h-full rounded-full bg-[#A58A71]" style={{ width: `${width}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl bg-[#F5F1ED] p-5 text-sm leading-6 text-[#857A72]">Visit data will appear after customers begin browsing the public pages.</div>
            )}
          </div>
        </article>
      </section>

      <section>
        <article className="rounded-[24px] border border-[#DFD7D0] bg-[#FBF9F7] p-6 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#9B7F66]">Reports</p>
          <h3 className="mt-1 font-serif text-2xl text-[#2B2622]">Download enquiries</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#7A716A]">Take customer enquiry records with you for meetings, follow-up and internal reporting.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => void downloadAll('excel')} className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C9] bg-white px-4 py-3 text-xs font-semibold text-[#5F554E]">Excel report <Download className="h-3.5 w-3.5" /></button>
            <button type="button" onClick={() => void downloadAll('csv')} className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C9] bg-white px-4 py-3 text-xs font-semibold text-[#5F554E]">CSV report <Download className="h-3.5 w-3.5" /></button>
          </div>
        </article>
      </section>

      <section className="rounded-[24px] border border-[#DFD7D0] bg-[#FBF9F7] shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-[#E7E0DA] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#9B7F66]">Customer pipeline</p>
            <h3 className="mt-1 font-serif text-2xl text-[#2B2622]">Recent enquiries</h3>
          </div>
          <button type="button" onClick={() => navigate('/admin/enquiries')} className="text-xs font-semibold text-[#836A56]">View all</button>
        </div>
        {data.recent_enquiries.length ? (
          <div className="divide-y divide-[#ECE5DF]">
            {data.recent_enquiries.map((item) => (
              <button key={item.id} type="button" onClick={() => navigate('/admin/enquiries')} className="grid w-full gap-3 px-6 py-4 text-left transition hover:bg-white sm:grid-cols-[1.2fr_.8fr_.55fr_.65fr] sm:items-center">
                <div><p className="text-sm font-medium text-[#302A26]">{item.name}</p><p className="mt-1 text-xs text-[#91877F]">{item.reference_number}</p></div>
                <div><p className="text-xs text-[#635B54]">{humanize(item.enquiry_type)}</p><p className="mt-1 text-xs text-[#9B9189]">{item.residence_interest ? humanize(item.residence_interest) : 'General'}</p></div>
                <div><StatusBadge status={item.status} /></div>
                <p className="text-xs text-[#81766E] sm:text-right">{formatAdminDate(item.created_at)}</p>
              </button>
            ))}
          </div>
        ) : <div className="p-8 text-sm text-[#8A8078]">No customer enquiries have been received yet.</div>}
      </section>
    </div>
  );
}

function TrafficChart({ points }: { points: AnalyticsPoint[] }) {
  const max = useMemo(() => Math.max(1, ...points.map((point) => point.value)), [points]);
  const width = 900;
  const height = 300;
  const left = 36;
  const top = 22;
  const bottom = 46;
  const usableWidth = width - left - 18;
  const usableHeight = height - top - bottom;
  const coords = points.map((point, index) => {
    const x = left + (points.length <= 1 ? 0 : (index / (points.length - 1)) * usableWidth);
    const y = top + usableHeight - (point.value / max) * usableHeight;
    return { ...point, x, y };
  });
  const line = coords.map((point) => `${point.x},${point.y}`).join(' ');
  const area = coords.length ? `${left},${top + usableHeight} ${line} ${left + usableWidth},${top + usableHeight}` : '';
  const tickStep = points.length > 8 ? 2 : 1;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[720px] w-full" role="img" aria-label="Website visits chart">
        {[0, .25, .5, .75, 1].map((step) => {
          const y = top + usableHeight - step * usableHeight;
          return <line key={step} x1={left} x2={left + usableWidth} y1={y} y2={y} stroke="#E8E0D9" strokeWidth="1" />;
        })}
        {area ? <polygon points={area} fill="rgba(165,138,113,0.10)" /> : null}
        {line ? <polyline points={line} fill="none" stroke="#94775E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /> : null}
        {coords.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            <circle cx={point.x} cy={point.y} r="4" fill="#FBF9F7" stroke="#94775E" strokeWidth="2.5" />
            {(index % tickStep === 0 || index === coords.length - 1) ? <text x={point.x} y={height - 14} textAnchor="middle" fontSize="10" fill="#8A8078">{point.label}</text> : null}
          </g>
        ))}
        <text x={left} y={13} fontSize="10" fill="#9A8E84">{max} visits</text>
      </svg>
    </div>
  );
}
