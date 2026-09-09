import React, { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitEnquiry, type EnquiryPayload, type EnquiryType } from '../api/enquiries';
import { ONA_IMAGES } from '../data/images';
import { listResidences, type ResidenceSummaryApi } from '../api/residences';

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

const fallbackResidenceOptions: ResidenceSummaryApi[] = [
  { id: '2-bedroom', slug: '2-bedroom', name: '02 Bedroom Residence', type: '2 Bedroom', bedrooms: 2, size_m2: 203, status: 'active', display_order: 1 },
  { id: '3-bedroom', slug: '3-bedroom', name: '03 Bedroom Residence', type: '3 Bedroom', bedrooms: 3, size_m2: 236, status: 'active', display_order: 2 },
  { id: 'penthouse-3bed', slug: 'penthouse-3bed', name: '03 Bedroom Signature Penthouse', type: 'Penthouse', bedrooms: 3, size_m2: 416, status: 'active', display_order: 3 },
  { id: 'penthouse-4bed', slug: 'penthouse-4bed', name: '04 Bedroom Signature Penthouse', type: 'Penthouse', bedrooms: 4, size_m2: 482, status: 'active', display_order: 4 },
];

export const EnquirySection: React.FC = () => {
  const [form, setForm] = useState<EnquiryPayload>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [residenceOptions, setResidenceOptions] = useState<ResidenceSummaryApi[]>(fallbackResidenceOptions);

  useEffect(() => {
    let active = true;
    listResidences()
      .then((items) => {
        if (active && items.length) setResidenceOptions(items);
      })
      .catch(() => {
        // Keep the verified residence options available if the content service is offline.
      });
    return () => {
      active = false;
    };
  }, []);

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
    <section id="enquiry" className="relative w-full bg-[#0A131F] text-[#F8F6F2] pt-36 sm:pt-44 pb-24 sm:pb-36 lg:pb-48 border-t border-[#193659]/40 overflow-hidden" aria-label="Register interest for ONA Towers">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img src={ONA_IMAGES.enquiryBackground.url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A131F]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-px bg-[#A58A71]" />
          <span className="font-sans text-xs font-semibold tracking-[0.24em] uppercase text-[#A58A71]">Enquire</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-script text-3xl sm:text-4xl text-[#A58A71] block mb-2">Connect with ONIRIA</span>
            <h2 className="font-display text-section-headline font-light leading-none uppercase mb-4 tracking-tight text-[#FFFFFF]">EXPERIENCE ONA.</h2>
            <p className="font-sans text-sm sm:text-base text-[#D5CFC7] leading-relaxed max-w-md font-light">
              Register your interest with our dedicated sales and client advisory team. Receive official floor plans, availability schedules, and private consultation details.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#193659] pt-8 max-w-md">
              <div>
                <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#718F9B]">Residence</span>
                <span className="mt-2 block font-display text-xl text-[#FFFFFF] font-light">2, 3 & Penthouse</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#718F9B]">Location</span>
                <span className="mt-2 block font-display text-xl text-[#FFFFFF] font-light">Mazizini, Zanzibar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#102035]/95 border border-[#193659] p-7 sm:p-10 lg:p-12 backdrop-blur-md shadow-2xl rounded-sm">
            {reference ? (
              <div className="min-h-[480px] flex flex-col items-start justify-center" role="status" aria-live="polite">
                <CheckCircle2 className="w-10 h-10 text-[#A58A71] mb-6" aria-hidden="true" />
                <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A58A71] mb-3">Enquiry received</p>
                <h3 className="font-display text-4xl sm:text-5xl text-[#FFFFFF] font-light mb-5">Thank you.</h3>
                <p className="font-sans text-sm text-[#D5CFC7] leading-relaxed max-w-lg mb-7 font-light">
                  Your enquiry has been recorded successfully. An ONA client advisor will reach out to you shortly.
                </p>
                <div className="border border-[#A58A71]/50 bg-[#0A131F]/70 px-5 py-4 mb-8 rounded-sm">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-[#718F9B] mb-1">Reference Number</span>
                  <strong className="font-sans text-sm tracking-[0.12em] text-[#FFFFFF]">{reference}</strong>
                </div>
                <button type="button" onClick={() => setReference('')} className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#A58A71] border-b border-[#A58A71] pb-1 hover:text-white transition-colors cursor-pointer">
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
                    <select value={form.residence_interest || ''} onChange={(e) => updateField('residence_interest', e.target.value)} className="form-input appearance-none cursor-pointer">
                      <option value="">Select residence</option>
                      {residenceOptions.map((residence) => (
                        <option key={residence.slug} value={residence.slug}>{residence.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="I Would Like To">
                    <select value={form.enquiry_type} onChange={(e) => updateField('enquiry_type', e.target.value as EnquiryType)} className="form-input appearance-none cursor-pointer">
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
                  <input required type="checkbox" checked={form.consent} onChange={(e) => updateField('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-[#A58A71]" />
                  <span className="font-sans text-xs leading-relaxed text-[#D5CFC7] group-hover:text-white transition-colors">
                    I agree that my details may be used to respond to this enquiry.
                  </span>
                </label>

                {error && (
                  <div role="alert" className="border border-red-400/40 bg-red-950/40 px-4 py-3 font-sans text-sm text-red-100 rounded-sm">
                    {error}
                  </div>
                )}

                <button disabled={submitting} type="submit" className="w-full min-h-14 flex items-center justify-center gap-3 py-4 bg-[#A58A71] text-white hover:bg-[#C5B19D] disabled:opacity-60 disabled:cursor-wait transition-colors font-sans text-xs font-semibold tracking-[0.2em] uppercase shadow-lg cursor-pointer rounded-sm">
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
