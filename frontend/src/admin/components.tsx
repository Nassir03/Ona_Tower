import React from 'react';
import { Loader2, X } from 'lucide-react';
import { type AdminEnquiryStatus } from '../api/admin';
import { humanize } from './format';

export const ADMIN_STATUSES: AdminEnquiryStatus[] = [
  'new',
  'contacted',
  'qualified',
  'viewing_scheduled',
  'closed',
  'archived',
];

export function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    new: 'bg-[#8D6E52]/15 text-[#8D6E52] border-[#8D6E52]/30',
    contacted: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    qualified: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    viewing_scheduled: 'bg-violet-500/10 text-violet-700 border-violet-500/20',
    closed: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
    archived: 'bg-stone-500/10 text-stone-600 border-stone-500/20',
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ${classes[status] || classes.archived}`}>
      {humanize(status)}
    </span>
  );
}

export function PageLoader({ label = 'Loading workspace' }: { label?: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-[#746B63]">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#D9D0C8] bg-white/60 px-6 py-16 text-center">
      <h3 className="font-serif text-2xl text-[#292420]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7B726B]">{copy}</p>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {message}
    </div>
  );
}

export function Modal({
  title,
  eyebrow,
  children,
  onClose,
  width = 'max-w-2xl',
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171310]/55 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
        className={`max-h-[92vh] w-full ${width} overflow-y-auto rounded-2xl border border-white/10 bg-[#FAF8F5] shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E7E0DA] bg-[#FAF8F5]/95 px-6 py-5 backdrop-blur">
          <div>
            {eyebrow ? <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9B7F66]">{eyebrow}</p> : null}
            <h2 className="mt-1 font-serif text-2xl text-[#28231F]">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#756C65] transition hover:bg-[#EEE8E2] hover:text-[#2A2521]" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#746B63]">{children}</span>;
}

export const inputClass =
  'w-full rounded-xl border border-[#D8D0C9] bg-white px-3.5 py-3 text-sm text-[#2A2521] outline-none transition placeholder:text-[#AAA19A] focus:border-[#9B7F66] focus:ring-2 focus:ring-[#9B7F66]/10 disabled:bg-[#F0ECE8] disabled:text-[#8A827B]';
