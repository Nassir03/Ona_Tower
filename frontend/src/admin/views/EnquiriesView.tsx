import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  UserRound,
} from 'lucide-react';
import {
  getAdminEnquiries,
  getTeam,
  updateAdminEnquiry,
  type AdminEnquiry,
  type AdminEnquiryStatus,
  type EnquiryListResponse,
  type TeamMember,
} from '../../api/admin';
import {
  ADMIN_STATUSES,
  EmptyState,
  ErrorBanner,
  FieldLabel,
  Modal,
  PageLoader,
  StatusBadge,
  inputClass,
} from '../components';
import { formatAdminDate, humanize } from '../format';
import { downloadEnquiriesCsv, downloadEnquiriesExcel } from '../enquiryExport';

export function EnquiriesView() {
  const [data, setData] = useState<EnquiryListResponse | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<AdminEnquiry | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async (nextPage = page) => {
    setLoading(true);
    setError('');
    try {
      const result = await getAdminEnquiries({ search, status, page: nextPage, pageSize: 20 });
      setData(result);
      setPage(result.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [search, status]);

  useEffect(() => {
    getTeam(false).then(setTeam).catch(() => setTeam([]));
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data?.total || 0) / (data?.page_size || 20))),
    [data],
  );
  const newCount = data?.items.filter((item) => item.status === 'new').length || 0;
  const inProgressCount = data?.items.filter((item) => !['new', 'closed', 'archived'].includes(String(item.status))).length || 0;

  const handleSaved = (updated: AdminEnquiry) => {
    setSelected(updated);
    setData((current) => {
      if (!current) return current;
      return {
        ...current,
        items: current.items.map((item) => (item.id === updated.id ? updated : item)),
      };
    });
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-5">
      <section className="overflow-hidden rounded-[24px] border border-[#E0D8D1] bg-[#FBF9F7] shadow-sm">
        <div className="grid gap-px border-t border-[#E8E1DB] bg-[#E8E1DB] sm:grid-cols-3">
          <Stat label="All enquiries" value={data?.total ?? 0} note="Total received" />
          <Stat label="New" value={newCount} note="Awaiting first follow-up" />
          <Stat label="In progress" value={inProgressCount || '-'} note="Active conversations" />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#E0D8D1] bg-[#FBF9F7] shadow-sm">
        <div className="flex flex-col gap-5 border-b border-[#E5DED8] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9B7F66]">Enquiry list</p>
            <h2 className="mt-1 font-serif text-2xl text-[#2B2622]">Customer conversations</h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-3xl lg:justify-end">
            <div className="relative w-full lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#978D85]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="Search name, phone, email or reference…"
              aria-label="Search enquiries"
            />
          </div>
            <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className={`${inputClass} min-w-[190px]`}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              {ADMIN_STATUSES.map((item) => (
                <option value={item} key={item}>{humanize(item)}</option>
              ))}
            </select>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" disabled={!data?.items.length} onClick={() => data && downloadEnquiriesExcel(data.items)} className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C9] bg-white px-3.5 py-3 text-xs font-semibold text-[#5F554E] disabled:opacity-50">Excel <Download className="h-3.5 w-3.5" /></button>
              <button type="button" disabled={!data?.items.length} onClick={() => data && downloadEnquiriesCsv(data.items)} className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C9] bg-white px-3.5 py-3 text-xs font-semibold text-[#5F554E] disabled:opacity-50">CSV <Download className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>

        {error ? <div className="p-5"><ErrorBanner message={error} /></div> : null}

        {loading && !data ? (
          <PageLoader label="Loading enquiries" />
        ) : data?.items.length ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E9E2DC] bg-[#F7F3EF] text-[10px] uppercase tracking-[0.15em] text-[#827970]">
                    <th className="px-5 py-3.5 font-semibold">Customer</th>
                    <th className="px-5 py-3.5 font-semibold">Interest</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold">Received</th>
                    <th className="px-5 py-3.5 font-semibold">Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE6E1]">
                  {data.items.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className="cursor-pointer transition hover:bg-white"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-[#2F2924]">{item.name}</p>
                        <p className="mt-1 text-xs text-[#8B817A]">{item.email || item.phone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-[#554D47]">{humanize(item.enquiry_type)}</p>
                        <p className="mt-1 text-xs text-[#9A9088]">{item.residence_interest ? humanize(item.residence_interest) : 'General'}</p>
                      </td>
                      <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                      <td className="px-5 py-4 text-xs text-[#726961]">{formatAdminDate(item.created_at)}</td>
                      <td className="px-5 py-4 text-xs font-medium text-[#65574C]">{item.reference_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#ECE6E1] md:hidden">
              {data.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="w-full p-5 text-left transition hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#2E2823]">{item.name}</p>
                      <p className="mt-1 text-xs text-[#8B817A]">{item.reference_number}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-4 text-xs text-[#655C55]">{humanize(item.enquiry_type)}</p>
                  <p className="mt-1 text-xs text-[#968C84]">{formatAdminDate(item.created_at)}</p>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E8E1DB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#82786F]">
                Showing {(data.page - 1) * data.page_size + 1}–{Math.min(data.page * data.page_size, data.total)} of {data.total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => void load(page - 1)}
                  className="rounded-lg border border-[#D8D0C9] bg-white p-2 text-[#5C534C] disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-20 text-center text-xs text-[#6E655E]">Page {page} / {totalPages}</span>
                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => void load(page + 1)}
                  className="rounded-lg border border-[#D8D0C9] bg-white p-2 text-[#5C534C] disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : !loading ? (
          <div className="p-5">
            <EmptyState
              title={search || status !== 'all' ? 'No matching enquiries' : 'No enquiries yet'}
              copy={search || status !== 'all' ? 'Try changing the search or status filter.' : 'New customer enquiries will appear here automatically.'}
            />
          </div>
        ) : (
          <PageLoader label="Refreshing enquiries" />
        )}
      </section>

      {selected ? (
        <EnquiryDetail
          enquiry={selected}
          team={team}
          onClose={() => setSelected(null)}
          onSaved={handleSaved}
        />
      ) : null}
    </div>
  );
}

function EnquiryDetail({
  enquiry,
  team,
  onClose,
  onSaved,
}: {
  enquiry: AdminEnquiry;
  team: TeamMember[];
  onClose: () => void;
  onSaved: (enquiry: AdminEnquiry) => void;
}) {
  const [status, setStatus] = useState<AdminEnquiryStatus>(
    ADMIN_STATUSES.includes(enquiry.status as AdminEnquiryStatus)
      ? (enquiry.status as AdminEnquiryStatus)
      : 'new',
  );
  const [assignedTo, setAssignedTo] = useState(enquiry.assigned_to || '');
  const [notes, setNotes] = useState(enquiry.internal_notes || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const updated = await updateAdminEnquiry(enquiry.id, {
        status,
        assigned_to: assignedTo || null,
        internal_notes: notes.trim() || null,
      });
      onSaved(updated);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update enquiry.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={enquiry.name} eyebrow={enquiry.reference_number} onClose={onClose} width="max-w-3xl">
      <div className="space-y-7 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <ContactCard icon={Phone} label="Phone" value={enquiry.phone} href={`tel:${enquiry.phone}`} />
          <ContactCard icon={Mail} label="Email" value={enquiry.email || 'Not provided'} href={enquiry.email ? `mailto:${enquiry.email}` : undefined} />
          <ContactCard icon={UserRound} label="Received" value={formatAdminDate(enquiry.created_at)} />
        </div>

        <div className="grid gap-6 rounded-2xl border border-[#E4DDD7] bg-white p-5 sm:grid-cols-2">
          <div>
            <FieldLabel>Enquiry type</FieldLabel>
            <p className="text-sm text-[#342E29]">{humanize(enquiry.enquiry_type)}</p>
          </div>
          <div>
            <FieldLabel>Residence interest</FieldLabel>
            <p className="text-sm text-[#342E29]">{enquiry.residence_interest ? humanize(enquiry.residence_interest) : 'General / not specified'}</p>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Customer message</FieldLabel>
            <div className="flex gap-3 rounded-xl bg-[#F7F3EF] p-4">
              <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-[#9B7F66]" />
              <p className="whitespace-pre-wrap text-sm leading-6 text-[#514842]">{enquiry.message || 'No message was provided.'}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label>
            <FieldLabel>Status</FieldLabel>
            <select value={status} onChange={(event) => setStatus(event.target.value as AdminEnquiryStatus)} className={inputClass}>
              {ADMIN_STATUSES.map((item) => <option key={item} value={item}>{humanize(item)}</option>)}
            </select>
          </label>
          <label>
            <FieldLabel>Assigned to</FieldLabel>
            <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} className={inputClass}>
              <option value="">Unassigned</option>
              {team.filter((member) => member.active).map((member) => (
                <option value={member.id} key={member.id}>{member.name} — {member.role}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <FieldLabel>Internal notes</FieldLabel>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={6}
            maxLength={5000}
            className={`${inputClass} resize-y`}
            placeholder="Add follow-up notes for the team. These are never shown on the customer website."
          />
        </label>

        {error ? <ErrorBanner message={error} /> : null}
        {saved ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Enquiry updated successfully.</div> : null}

        <div className="flex flex-col-reverse gap-3 border-t border-[#E7E0DA] pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#D8D0C9] bg-white px-5 py-3 text-xs font-semibold text-[#655B53]">Close</button>
          <button type="button" onClick={() => void save()} disabled={saving} className="rounded-xl bg-[#2A241F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Stat({ label, value, note }: { label: string; value: React.ReactNode; note: string }) {
  return (
    <div className="bg-white px-5 py-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D8076]">{label}</p>
      <p className="mt-2 font-serif text-4xl leading-none text-[#2B2622]">{value}</p>
      <p className="mt-1 text-xs text-[#8A8078]">{note}</p>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="h-4 w-4 text-[#9B7F66]" />
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8C827A]">{label}</p>
        <p className="mt-1 break-words text-xs text-[#3D3631]">{value}</p>
      </div>
    </>
  );

  const className = "flex min-h-20 items-start gap-3 rounded-xl border border-[#E5DED8] bg-white p-4";
  return href ? <a href={href} className={`${className} transition hover:border-[#BDA58F]`}>{content}</a> : <div className={className}>{content}</div>;
}
