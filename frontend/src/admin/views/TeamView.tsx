import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  KeyRound,
  Mail,
  Pencil,
  Phone,
  Shield,
  Trash2,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import {
  createTeamMember,
  deactivateTeamMember,
  getTeam,
  resetTeamPassword,
  updateTeamMember,
  type AdminUser,
  type TeamMember,
} from '../../api/admin';
import { ErrorBanner, FieldLabel, Modal, PageLoader, inputClass } from '../components';
import { formatAdminDate } from '../format';

const DEFAULT_FORM = {
  name: '', email: '', phone: '', role: 'Sales manager', password: '', is_super_admin: false, active: true,
};

const STAFF_ROLES = ['Sales manager', 'Administration', 'Market staff'];

export function TeamView({ currentUser }: { currentUser: AdminUser }) {
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [resetting, setResetting] = useState<TeamMember | null>(null);

  const load = async () => {
    setError('');
    try { setTeam(await getTeam(true)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to load staff accounts.'); }
  };
  useEffect(() => { void load(); }, []);

  const activeCount = useMemo(() => team?.filter((member) => member.active).length || 0, [team]);
  const resetCount = useMemo(() => team?.filter((member) => member.password_reset_requested_at).length || 0, [team]);

  if (!team && !error) return <PageLoader label="Loading team" />;

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      {error ? <ErrorBanner message={error} /> : null}

      <section className="overflow-hidden rounded-[24px] border border-[#DED6CF] bg-[#FBF9F7] shadow-sm">
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A887A]">Team access</p>
              <h2 className="mt-2 font-serif text-2xl text-[#2D2824] sm:text-[28px]">Staff access overview</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A7068]">Create and manage the people who can sign in, receive enquiries and help run the administration workspace.</p>
            </div>
            {resetCount ? (
              <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800">
                {resetCount} password reset {resetCount === 1 ? 'request' : 'requests'}
              </span>
            ) : null}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Team members" value={team?.length || 0} note="Staff profiles" />
            <SummaryTile label="Active access" value={activeCount} note="Can sign in now" />
            <SummaryTile label="Responsibilities" value="Assigned" note="Managed by administrators" />
          </div>
        </div>
      </section>

      <div className={`grid items-start gap-6 ${currentUser.is_super_admin ? 'xl:grid-cols-[minmax(340px,0.88fr)_minmax(0,1.35fr)]' : ''}`}>
        {currentUser.is_super_admin ? (
          <div className="xl:sticky xl:top-[118px]">
            <CreateStaffPanel onCreated={load} />
          </div>
        ) : null}

        <section className="overflow-hidden rounded-[24px] border border-[#DED6CF] bg-[#FBF9F7] shadow-sm">
          <div className="border-b border-[#E7E0DA] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A887A]">Directory</p>
                <h2 className="mt-1.5 font-serif text-2xl text-[#2D2824]">Staff accounts</h2>
                <p className="mt-1.5 text-sm text-[#7A7068]">Review access, responsibilities and sign-in activity.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#EEE7E1] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#75665A]">{team?.length || 0} total</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">{activeCount} active</span>
              </div>
            </div>
          </div>

          {!team?.length ? (
            <div className="p-5 sm:p-6">
              <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-[#D9D0C8] bg-[#F7F3EF] px-6 text-center">
                <div className="max-w-md">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EDE4DD] text-[#8D735E]"><UsersRound className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-serif text-2xl text-[#292420]">No staff members yet</h3>
                  <p className="mt-2 text-sm leading-6 text-[#7B726B]">Add the first team member using the form to create sign-in access and enable enquiry assignment.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 p-5 sm:p-6 2xl:grid-cols-2">
              {team.map((member) => (
                <StaffCard
                  key={member.id}
                  member={member}
                  canManage={currentUser.is_super_admin}
                  isSelf={member.id === currentUser.id}
                  onEdit={() => setEditing(member)}
                  onReset={() => setResetting(member)}
                  onRemove={async () => {
                    if (!window.confirm(`Remove administration access for ${member.name}? Historical enquiry assignments will be kept.`)) return;
                    try { await deactivateTeamMember(member.id); await load(); }
                    catch (err) { setError(err instanceof Error ? err.message : 'Unable to remove staff access.'); }
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {!currentUser.is_super_admin ? (
        <div className="rounded-2xl border border-[#DED6CF] bg-[#F7F3EF] p-4 text-sm text-[#766C64]">Staff account creation, access removal and password resets are available only to administrators.</div>
      ) : null}

      {editing ? <StaffFormModal title="Edit staff member" initial={{ ...editing, password: '' }} onClose={() => setEditing(null)} onSubmit={async (values) => { await updateTeamMember(editing.id, values); setEditing(null); await load(); }} /> : null}
      {resetting ? <ResetPasswordModal member={resetting} onClose={() => setResetting(null)} onSaved={async (password) => { await resetTeamPassword(resetting.id, password); setResetting(null); await load(); }} /> : null}
    </div>
  );
}

function CreateStaffPanel({ onCreated }: { onCreated: () => Promise<void> }) {
  const [values, setValues] = useState<FormValues>({ ...DEFAULT_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await createTeamMember({
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
        password: values.password || '',
        is_super_admin: values.is_super_admin,
        active: values.active,
      });
      setValues({ ...DEFAULT_FORM });
      await onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create staff account.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[24px] border border-[#D8CEC5] bg-white shadow-sm">
      <div className="border-b border-[#EEE7E1] bg-[#F8F4F0] px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#2A241F] text-white shadow-sm">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-[24px] leading-tight text-[#2D2824]">Add a team member.</h2>
            <p className="mt-2 text-sm leading-6 text-[#776D65]">Create staff access, choose responsibilities and provide a temporary password in one step.</p>
          </div>
        </div>
      </div>

      <form className="space-y-5 p-5 sm:p-6" onSubmit={submit}>
        {error ? <ErrorBanner message={error} /> : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <label className="sm:col-span-2 xl:col-span-1 2xl:col-span-2">
            <FieldLabel>Full name</FieldLabel>
            <input required minLength={2} className={inputClass} value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Staff member name" />
          </label>
          <label>
            <FieldLabel>Email address</FieldLabel>
            <input required type="email" className={inputClass} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="staff@company.com" />
          </label>
          <label>
            <FieldLabel>Phone number</FieldLabel>
            <input className={inputClass} value={values.phone || ''} onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="+255 ..." />
          </label>
          <label className="sm:col-span-2 xl:col-span-1 2xl:col-span-2">
            <FieldLabel>Responsibility</FieldLabel>
            <select required className={inputClass} value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })}>
              {STAFF_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2 xl:col-span-1 2xl:col-span-2">
            <FieldLabel>Temporary password</FieldLabel>
            <input required type="password" minLength={8} className={inputClass} value={values.password || ''} onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder="At least 8 characters" />
          </label>
        </div>

        <div className="grid gap-3 rounded-2xl border border-[#E3DBD4] bg-[#F8F4F0] p-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-white px-3.5 py-3 text-sm text-[#4A423C] shadow-sm ring-1 ring-[#E8E1DB]">
            <input type="checkbox" checked={values.active !== false} onChange={(e) => setValues({ ...values, active: e.target.checked })} className="mt-1 accent-[#8A705A]" />
            <span><strong className="block text-xs">Active account</strong><span className="mt-1 block text-xs leading-5 text-[#7D736B]">Can sign in and receive enquiry assignments.</span></span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-white px-3.5 py-3 text-sm text-[#4A423C] shadow-sm ring-1 ring-[#E8E1DB]">
            <input type="checkbox" checked={Boolean(values.is_super_admin)} onChange={(e) => setValues({ ...values, is_super_admin: e.target.checked, role: e.target.checked ? 'Administration' : values.role })} className="mt-1 accent-[#8A705A]" />
            <span><strong className="block text-xs">Admin access</strong><span className="mt-1 block text-xs leading-5 text-[#7D736B]">Can add, edit and remove staff accounts.</span></span>
          </label>
        </div>

        <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2A241F] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-white shadow-sm transition hover:bg-[#3A312B] disabled:cursor-not-allowed disabled:opacity-60">
          <UserPlus className="h-4 w-4" /> {saving ? 'Creating account...' : 'Add staff member'}
        </button>
      </form>
    </section>
  );
}

function StaffCard({ member, canManage, isSelf, onEdit, onReset, onRemove }: {
  key?: React.Key; member: TeamMember; canManage: boolean; isSelf: boolean; onEdit: () => void; onReset: () => void; onRemove: () => void;
}) {
  const initials = member.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'ST';
  return (
    <article className={`group overflow-hidden rounded-[20px] border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${member.active ? 'border-[#E3DBD4]' : 'border-[#E4DFDA] opacity-70'}`}>
      <div className="h-1 bg-gradient-to-r from-[#8C7059] via-[#B49A83] to-[#D7C7B8]" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#DFD5CC] bg-[#EEE5DD] font-serif text-lg font-semibold text-[#806650] shadow-inner">{initials}</div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-serif text-[21px] leading-tight text-[#312B27]">{member.name}</h3>
                {member.is_super_admin ? <Shield className="h-3.5 w-3.5 shrink-0 text-[#9A785D]" aria-label="Administrator" /> : null}
              </div>
              <p className="mt-1.5 truncate text-xs font-medium text-[#7F756E]">{member.role}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${member.active ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'bg-stone-100 text-stone-500 ring-1 ring-stone-200'}`}>{member.active ? 'Active' : 'Access removed'}</span>
        </div>

        {member.password_reset_requested_at ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800"><KeyRound className="h-4 w-4 shrink-0" /> Password reset requested {formatAdminDate(member.password_reset_requested_at)}</div>
        ) : null}

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#ECE5DF] bg-[#FAF7F4]">
          <StaffDetail icon={Mail} value={member.email} />
          <StaffDetail icon={Phone} value={member.phone || 'No phone number'} bordered />
          <StaffDetail icon={BadgeCheck} value={member.last_login_at ? `Last signed in ${formatAdminDate(member.last_login_at)}` : 'Has not signed in yet'} bordered />
        </div>

        {canManage ? (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#EEE8E3] pt-4">
            <button type="button" onClick={onEdit} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#DED6CF] bg-white px-3 py-2.5 text-xs font-semibold text-[#5D534C] transition hover:border-[#BFA792] hover:bg-[#FAF7F4] hover:text-[#2A241F]"><Pencil className="h-3.5 w-3.5" /> Edit</button>
            <button type="button" onClick={onReset} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#DED6CF] bg-white px-3 py-2.5 text-xs font-semibold text-[#5D534C] transition hover:border-[#BFA792] hover:bg-[#FAF7F4] hover:text-[#2A241F]"><KeyRound className="h-3.5 w-3.5" /> Reset password</button>
            {!isSelf && member.active ? <button type="button" onClick={onRemove} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50/70 px-3 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Remove staff access</button> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function StaffDetail({ icon: Icon, value, bordered = false }: { icon: React.ElementType; value: string; bordered?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 px-3.5 py-3 text-xs text-[#665D56] ${bordered ? 'border-t border-[#ECE5DF]' : ''}`}>
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-[#A18C7A] shadow-sm ring-1 ring-[#E8E0D9]"><Icon className="h-3.5 w-3.5" /></div>
      <span className="min-w-0 truncate">{value}</span>
    </div>
  );
}

function SummaryTile({ label, value, note }: { label: string; value: React.ReactNode; note: string }) {
  return (
    <div className="rounded-2xl border border-[#E6DED7] bg-white px-4 py-3.5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D8076]">{label}</p>
      <p className="mt-2 font-serif text-2xl text-[#2B2622]">{value}</p>
      <p className="mt-1 text-xs text-[#8A8078]">{note}</p>
    </div>
  );
}

type FormValues = {
  name: string; email: string; phone?: string | null; role: string; department?: string | null; password?: string; is_super_admin?: boolean; active?: boolean;
};

function StaffFormModal({ title, initial, onClose, onSubmit }: {
  title: string; initial: FormValues; onClose: () => void; onSubmit: (values: any) => Promise<void>;
}) {
  const [values, setValues] = useState<FormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...values } as any;
      delete payload.password;
      delete payload.department;
      await onSubmit(payload);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save staff account.'); }
    finally { setSaving(false); }
  };
  return (
    <Modal title={title} eyebrow="Staff access" onClose={onClose} width="max-w-2xl">
      <form className="space-y-6 p-6" onSubmit={submit}>
        {error ? <ErrorBanner message={error} /> : null}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><FieldLabel>Full name</FieldLabel><input required minLength={2} className={inputClass} value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Staff member name" /></label>
          <label><FieldLabel>Email address</FieldLabel><input required type="email" className={inputClass} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="staff@company.com" /></label>
          <label><FieldLabel>Phone number</FieldLabel><input className={inputClass} value={values.phone || ''} onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="+255 ..." /></label>
          <label className="sm:col-span-2"><FieldLabel>Responsibility</FieldLabel><select required className={inputClass} value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })}>{STAFF_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
        </div>
        <div className="grid gap-3 rounded-xl border border-[#E1D9D2] bg-[#F7F3EF] p-4 sm:grid-cols-2">
          <label className="flex items-start gap-3 text-sm text-[#4A423C]"><input type="checkbox" checked={values.active !== false} onChange={(e) => setValues({ ...values, active: e.target.checked })} className="mt-1 accent-[#8A705A]" /><span><strong className="block text-xs">Active account</strong><span className="mt-1 block text-xs leading-5 text-[#7D736B]">Can sign in and receive enquiry assignments.</span></span></label>
          <label className="flex items-start gap-3 text-sm text-[#4A423C]"><input type="checkbox" checked={Boolean(values.is_super_admin)} onChange={(e) => setValues({ ...values, is_super_admin: e.target.checked, role: e.target.checked ? 'Administration' : values.role })} className="mt-1 accent-[#8A705A]" /><span><strong className="block text-xs">Admin access</strong><span className="mt-1 block text-xs leading-5 text-[#7D736B]">Can add, edit and remove staff accounts.</span></span></label>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#E5DDD6] pt-5"><button type="button" onClick={onClose} className="rounded-xl border border-[#D8D0C9] px-4 py-3 text-xs font-semibold text-[#625850]">Cancel</button><button type="submit" disabled={saving} className="rounded-xl bg-[#2A241F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save changes'}</button></div>
      </form>
    </Modal>
  );
}

function ResetPasswordModal({ member, onClose, onSaved }: { member: TeamMember; onClose: () => void; onSaved: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError('');
    if (password !== confirm) { setError('Password and confirmation do not match.'); return; }
    setSaving(true);
    try { await onSaved(password); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to reset password.'); }
    finally { setSaving(false); }
  };
  return (
    <Modal title={`Reset ${member.name}'s password`} eyebrow="Security" onClose={onClose} width="max-w-lg">
      <form onSubmit={submit} className="space-y-5 p-6">
        {error ? <ErrorBanner message={error} /> : null}
        <div className="rounded-xl bg-[#F3EEE9] p-4 text-xs leading-5 text-[#71675F]">Set a temporary password and share it securely with the staff member. They can change it from Settings after signing in.</div>
        <label><FieldLabel>New temporary password</FieldLabel><input required type="password" minLength={8} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <label><FieldLabel>Confirm password</FieldLabel><input required type="password" minLength={8} className={inputClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} /></label>
        <button type="submit" disabled={saving} className="w-full rounded-xl bg-[#2A241F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60">{saving ? 'Saving...' : 'Set temporary password'}</button>
      </form>
    </Modal>
  );
}
