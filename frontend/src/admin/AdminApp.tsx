import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UsersRound,
  X,
} from 'lucide-react';
import {
  adminLogin,
  clearAdminSession,
  getAdminToken,
  getStoredAdminUser,
  requestPasswordReset,
  verifyAdminSession,
  type AdminUser,
} from '../api/admin';
import { navigate } from '../routing';
import { ErrorBanner, PageLoader, inputClass } from './components';
import { OverviewView } from './views/OverviewView';
import { EnquiriesView } from './views/EnquiriesView';
import { TeamView } from './views/TeamView';
import { SettingsView } from './views/SettingsView';

type AdminSection = 'overview' | 'enquiries' | 'team' | 'settings';

function sectionFromPath(pathname: string): AdminSection {
  if (pathname.startsWith('/admin/enquiries')) return 'enquiries';
  if (pathname.startsWith('/admin/team')) return 'team';
  if (pathname.startsWith('/admin/settings')) return 'settings';
  return 'overview';
}

const labels: Record<AdminSection, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Customer activity, enquiries and team performance in one place.' },
  enquiries: { title: 'Enquiries', subtitle: 'Review, assign and progress requests submitted from the customer website.' },
  team: { title: 'Team', subtitle: 'Manage staff accounts, responsibilities and enquiry assignment access.' },
  settings: { title: 'Settings', subtitle: 'Manage your profile, security and administration preferences.' },
};

const navItems: Array<{ key: AdminSection; label: string; path: string; icon: React.ElementType }> = [
  { key: 'overview', label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { key: 'enquiries', label: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
  { key: 'team', label: 'Team', path: '/admin/team', icon: UsersRound },
  { key: 'settings', label: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminApp({ pathname }: { pathname: string }) {
  const [authState, setAuthState] = useState<'checking' | 'signedOut' | 'signedIn'>(
    getAdminToken() ? 'checking' : 'signedOut',
  );
  const [user, setUser] = useState<AdminUser | null>(getStoredAdminUser());
  const [mobileOpen, setMobileOpen] = useState(false);
  const section = useMemo(() => sectionFromPath(pathname), [pathname]);

  useEffect(() => {
    if (!getAdminToken()) {
      setAuthState('signedOut');
      return;
    }
    let active = true;
    verifyAdminSession()
      .then((result) => {
        if (!active) return;
        setUser(result.user);
        setAuthState('signedIn');
      })
      .catch(() => {
        if (!active) return;
        clearAdminSession();
        setUser(null);
        setAuthState('signedOut');
      });
    return () => { active = false; };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-[#F4F0EB] text-[#29241F]">
        <div className="mx-auto max-w-7xl px-6 pt-24"><PageLoader label="Preparing your administration workspace" /></div>
      </div>
    );
  }

  if (authState === 'signedOut' || !user) {
    return (
      <AdminLogin
        onSignedIn={(nextUser) => {
          setUser(nextUser);
          setAuthState('signedIn');
        }}
      />
    );
  }

  const current = labels[section];
  const handleLogout = () => {
    clearAdminSession();
    setUser(null);
    setAuthState('signedOut');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F2EEE9] text-[#2B2622]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[276px] border-r border-white/10 bg-[#241F1B] text-[#F7F2EC] lg:flex lg:flex-col">
        <AdminBrand />
        <div className="px-6 pb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#A58A71]/45 to-transparent" />
        </div>
        <nav className="flex-1 space-y-1 px-4 py-3" aria-label="Administration navigation">
          {navItems.map((item) => {
            const active = item.key === section;
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm transition ${
                  active ? 'bg-[#A58A71] text-white shadow-lg shadow-black/10' : 'text-[#CFC4BB] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-[11px] text-[#AFA198]">{user.role}</p>
              </div>
            </div>
            <div className="mt-3">
              <button type="button" onClick={handleLogout} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D3C8BF] transition hover:bg-white/[0.06]">
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[80] bg-[#171310]/65 backdrop-blur-sm lg:hidden" onMouseDown={() => setMobileOpen(false)}>
          <aside className="h-full w-[300px] bg-[#241F1B] text-[#F7F2EC] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between pr-4">
              <AdminBrand />
              <button type="button" className="rounded-full p-2 text-[#D7CDC5]" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <nav className="space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.key === section;
                return (
                  <button type="button" key={item.key} onClick={() => navigate(item.path)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm ${active ? 'bg-[#A58A71] text-white' : 'text-[#C8BDB4]'}`}>
                    <Icon className="h-4 w-4" />{item.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[276px]">
        <header className="sticky top-0 z-40 border-b border-[#DED7D0] bg-[#F2EEE9]/94 backdrop-blur-xl">
          <div className="flex min-h-[84px] items-center gap-4 px-5 sm:px-8 lg:px-10">
            <button type="button" className="rounded-xl border border-[#D8D0C9] bg-white p-2.5 text-[#504841] lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate font-serif text-2xl text-[#29241F] sm:text-[30px]">{current.title}</h1>
                {user.is_super_admin ? <span className="hidden rounded-full bg-[#E7DDD3] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#816B57] sm:inline">Administrator</span> : null}
              </div>
              <p className="mt-1 hidden truncate text-xs text-[#7A716A] sm:block">{current.subtitle}</p>
            </div>
            <div className="ml-auto flex items-center gap-3 rounded-2xl border border-[#D8D0C9] bg-white px-4 py-2.5 text-[#5F554E] shadow-sm">
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:inline">Alerts</span>
              <strong className="font-serif text-2xl leading-none text-[#2B2622]">0</strong>
              <span className="h-2 w-2 rounded-full bg-[#9B7F66]" />
            </div>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          {section === 'overview' ? <OverviewView /> : null}
          {section === 'enquiries' ? <EnquiriesView /> : null}
          {section === 'team' ? <TeamView currentUser={user} /> : null}
          {section === 'settings' ? <SettingsView currentUser={user} onUserChanged={setUser} /> : null}
        </main>
      </div>
    </div>
  );
}

function AdminBrand() {
  return (
    <div className="flex min-h-[104px] items-center px-7">
      <div className="text-left">
        <span className="block font-display text-[27px] font-medium leading-none tracking-tight text-white transition-colors group-hover:text-[#A58A71]">
          ôNA TOWERS
        </span>
        <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#A58A71]">
          Mazizini - Zanzibar
        </span>
      </div>
    </div>
  );
}

function Avatar({ name, large = false }: { name: string; large?: boolean }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'OA';
  return (
    <div className={`grid shrink-0 place-items-center rounded-full border border-[#A58A71]/35 bg-[#A58A71]/15 font-semibold text-[#D9C2AD] ${large ? 'h-14 w-14 text-base' : 'h-10 w-10 text-xs'}`}>
      {initials}
    </div>
  );
}

function AdminLogin({ onSignedIn }: { onSignedIn: (user: AdminUser) => void }) {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
    try {
      if (mode === 'forgot') {
        const result = await requestPasswordReset(email.trim());
        setMessage(result.message);
      } else {
        const result = await adminLogin(email.trim(), password);
        onSignedIn(result.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to continue.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#302A26] px-4 py-5 text-[#302A26] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full border border-[#A58A71]/20" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#A58A71]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full border border-[#A58A71]/15" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#A58A71]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-40px)] max-w-[1240px] overflow-hidden rounded-[30px] border border-white/10 bg-[#F3EEE7] shadow-[0_30px_90px_rgba(20,16,13,0.35)] sm:min-h-[calc(100vh-56px)] lg:grid-cols-[0.84fr_1.16fr]">
        <aside className="relative hidden overflow-hidden bg-[#25201D] p-10 text-[#F5F0EA] lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(165,138,113,0.22),transparent_34%),radial-gradient(circle_at_80%_86%,rgba(165,138,113,0.13),transparent_32%)]" />
          <div className="pointer-events-none absolute right-[-76px] top-[18%] h-52 w-52 rounded-full border border-[#A58A71]/25" />
          <div className="pointer-events-none absolute right-[-22px] top-[24%] h-28 w-28 rounded-full border border-[#A58A71]/15" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#A58A71]/45 bg-[#A58A71]/10">
                <ShieldCheck className="h-4 w-4 text-[#D1B298]" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1B298]">Private staff workspace</span>
            </div>

            <div className="mt-12">
              <span className="block font-display text-4xl font-medium tracking-tight text-white">ôNA TOWERS</span>
              <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A58A71]">Mazizini · Zanzibar</span>
            </div>
          </div>

          <div className="relative z-10 max-w-sm pb-3">
            <p className="font-script text-3xl text-[#D1B298]">Live above. See beyond.</p>
            <h1 className="mt-5 font-serif text-[2.65rem] leading-[1.08] text-white">A calm place to manage every customer enquiry.</h1>
            <p className="mt-5 text-sm leading-7 text-[#CFC2B7]">Secure access for the ONA team to review enquiries, coordinate follow-up and manage administration.</p>
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AFA198]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A58A71]" />
              Staff accounts only
            </div>
          </div>
        </aside>

        <main className="flex min-h-[680px] items-center justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-[460px]">
            <div className="mb-10 flex items-start justify-between gap-4 lg:hidden">
              <div>
                <span className="block font-display text-3xl font-medium tracking-tight text-[#302A26]">ôNA TOWERS</span>
                <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A58A71]">Mazizini · Zanzibar</span>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#A58A71]/25 bg-[#A58A71]/10">
                <ShieldCheck className="h-4 w-4 text-[#917860]" />
              </div>
            </div>

            <div className="mb-8">
              {mode === 'login' ? (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#A58A71]/25 bg-[#A58A71]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#917860]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A58A71]" />
                    Staff access
                  </div>
                  <h2 className="mt-5 font-serif text-4xl leading-tight text-[#302A26] sm:text-[2.7rem]">Welcome back</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#6F645C]">Sign in with your staff email and password to continue to the ONA administration workspace.</p>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); setMessage(''); }}
                    className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#917860] transition hover:text-[#6F5846]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to sign in
                  </button>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#A58A71]/25 bg-[#A58A71]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#917860]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A58A71]" />
                    Secure recovery
                  </div>
                  <h2 className="mt-5 font-serif text-4xl leading-tight text-[#302A26] sm:text-[2.7rem]">Reset staff access</h2>
                  <p className="mt-3 text-sm leading-6 text-[#6F645C]">Enter your staff email and we will record a reset request for an administrator to review. The response stays private and consistent for security.</p>
                </>
              )}
            </div>

            <form className="space-y-5" onSubmit={submit}>
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#574E47]">Staff email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${inputClass} border-[#DED4CA] bg-[#FFFDF8] py-3.5 focus:border-[#A58A71] focus:ring-[#A58A71]/15`}
                  placeholder="name@company.com"
                />
              </label>

              {mode === 'login' ? (
                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#574E47]">Password</span>
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); setMessage(''); }}
                      className="text-xs font-semibold text-[#917860] transition hover:text-[#6F5846]"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`${inputClass} border-[#DED4CA] bg-[#FFFDF8] py-3.5 pr-12 focus:border-[#A58A71] focus:ring-[#A58A71]/15`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8C8075] transition hover:bg-[#F3EEE7] hover:text-[#574E47]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
              ) : null}

              {error ? <ErrorBanner message={error} /> : null}
              {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">{message}</div> : null}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#A58A71] px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(165,138,113,0.24)] transition hover:bg-[#917860] hover:shadow-[0_14px_32px_rgba(145,120,96,0.28)] focus:outline-none focus:ring-2 focus:ring-[#A58A71]/30 focus:ring-offset-2 focus:ring-offset-[#F3EEE7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Send reset request'}
              </button>
            </form>

            <div className="mt-8 flex items-start gap-3 border-t border-[#DED4CA] pt-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A58A71]" />
              <p className="text-xs leading-5 text-[#8C8075]">Access is limited to active staff accounts created by an administrator. Customer pages remain separate from this private workspace.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
