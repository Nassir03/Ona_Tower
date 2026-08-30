import React, { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitEnquiry, type EnquiryPayload, type EnquiryType } from '../api/enquiries';
import { ONA_IMAGES } from '../data/images';

const initialForm: EnquiryPayload = {
  name: '',
  phone: '',
  email: '',
  residence_interest: '',
  enquiry_type: 'general',
  message: '',
  consent: false,
  source: 'website',
  company_website: '',
};

export const EnquirySection: React.FC = () => {
  const [form, setForm] = useState<EnquiryPayload>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  const updateField = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setReference('');
    setSubmitting(true);

    try {
      const response = await submitEnquiry({
        ...form,
        email: form.email?.trim() || undefined,
        residence_interest: form.residence_interest?.trim() || undefined,
        message: form.message?.trim() || undefined,
      });
      setReference(response.reference_number);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="relative w-full bg-[#080808] text-[#F7F5F0] py-24 sm:py-36 lg:py-48 border-t border-[#171716] overflow-hidden" aria-label="Register interest for ONA Towers">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img src={ONA_IMAGES.enquiryBackground.url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#080808]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#AE9A7C]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#AE9A7C]">Enquire</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="font-display text-section-headline font-semibold leading-none uppercase mb-4">EXPERIENCE ONA.</h2>
            <p className="font-display italic text-2xl sm:text-3xl text-[#AE9A7C] mb-6">Register your interest.</p>
            <p className="font-sans text-sm sm:text-base text-[#D7D0C5] leading-relaxed max-w-md">
              Tell us what you are interested in and the sales team can follow up with the relevant residence information.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#D7D0C5]/15 pt-8 max-w-md">
              <div>
                <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#78716C]">Residence</span>
                <span className="mt-2 block font-display text-xl text-[#F7F5F0]">2, 3 & Penthouse</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#78716C]">Location</span>
                <span className="mt-2 block font-display text-xl text-[#F7F5F0]">Zanzibar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#171716]/90 border border-[#D7D0C5]/20 p-7 sm:p-10 lg:p-12 backdrop-blur-md shadow-2xl">
            {reference ? (
              <div className="min-h-[480px] flex flex-col items-start justify-center" role="status" aria-live="polite">
                <CheckCircle2 className="w-10 h-10 text-[#AE9A7C] mb-6" aria-hidden="true" />
                <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#AE9A7C] mb-3">Enquiry received</p>
                <h3 className="font-display text-4xl sm:text-5xl text-[#F7F5F0] font-semibold mb-5">Thank you.</h3>
                <p className="font-sans text-sm text-[#D7D0C5] leading-relaxed max-w-lg mb-7">
                  Your enquiry has been recorded successfully. Keep this reference for your records.
                </p>
                <div className="border border-[#AE9A7C]/40 bg-[#080808]/60 px-5 py-4 mb-8">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#78716C] mb-1">Reference</span>
                  <strong className="font-sans text-sm tracking-[0.12em] text-[#F7F5F0]">{reference}</strong>
                </div>
                <button type="button" onClick={() => setReference('')} className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#F7F5F0] border-b border-[#AE9A7C] pb-1 hover:text-[#AE9A7C] transition-colors">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required>
                    <input required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="form-input" placeholder="Your full name" />
                  </Field>
                  <Field label="Phone Number" required>
                    <input required minLength={7} maxLength={30} inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className="form-input" placeholder="+255 ..." />
                  </Field>
                </div>

                <Field label="Email Address">
                  <input type="email" maxLength={254} autoComplete="email" value={form.email || ''} onChange={(e) => updateField('email', e.target.value)} className="form-input" placeholder="name@example.com" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Residence Interest">
                    <select value={form.residence_interest || ''} onChange={(e) => updateField('residence_interest', e.target.value)} className="form-input appearance-none">
                      <option value="">Select residence</option>
                      <option value="2-bedroom">2 Bedroom Residence</option>
                      <option value="3-bedroom">3 Bedroom Residence</option>
                      <option value="penthouse-3bed">3 Bedroom Penthouse</option>
                      <option value="penthouse-4bed">4 Bedroom Penthouse</option>
                    </select>
                  </Field>
                  <Field label="I Would Like To">
                    <select value={form.enquiry_type} onChange={(e) => updateField('enquiry_type', e.target.value as EnquiryType)} className="form-input appearance-none">
                      <option value="general">Make a general enquiry</option>
                      <option value="enquire_about_residence">Enquire about a residence</option>
                      <option value="request_floor_plans">Request floor plans</option>
                      <option value="schedule_viewing">Schedule a viewing</option>
                      <option value="talk_to_sales">Talk to sales</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message">
                  <textarea rows={5} maxLength={2000} value={form.message || ''} onChange={(e) => updateField('message', e.target.value)} className="form-input resize-y min-h-32" placeholder="Tell us what you would like to know..." />
                </Field>

                <div className="hidden" aria-hidden="true">
                  <label>Company website<input tabIndex={-1} autoComplete="off" value={form.company_website} onChange={(e) => updateField('company_website', e.target.value)} /></label>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input required type="checkbox" checked={form.consent} onChange={(e) => updateField('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-[#AE9A7C]" />
                  <span className="font-sans text-xs leading-relaxed text-[#D7D0C5] group-hover:text-[#F7F5F0] transition-colors">
                    I agree that my details may be used to respond to this enquiry.
                  </span>
                </label>

                {error && (
                  <div role="alert" className="border border-red-300/30 bg-red-950/30 px-4 py-3 font-sans text-sm text-red-100">
                    {error}
                  </div>
                )}

                <button disabled={submitting} type="submit" className="w-full min-h-14 flex items-center justify-center gap-3 py-4 bg-[#F7F5F0] text-[#080808] hover:bg-[#AE9A7C] disabled:opacity-60 disabled:cursor-wait transition-colors font-sans text-xs font-semibold tracking-[0.2em] uppercase">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                  <span>{submitting ? 'Sending enquiry' : 'Submit enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <label className="block">
    <span className="block font-sans text-[11px] font-semibold tracking-widest text-[#D7D0C5] uppercase mb-2">
      {label}{required ? <span className="text-[#AE9A7C]"> *</span> : null}
    </span>
    {children}
  </label>
);
