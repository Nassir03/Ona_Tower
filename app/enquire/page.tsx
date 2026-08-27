import {Suspense} from 'react'
import {MessageCircle} from 'lucide-react'
import {PageHero} from '@/components/ui/PageHero'
import {EnquiryForm} from '@/components/EnquiryForm'
export const metadata={title:'Enquire'}
export default function Page(){return <><PageHero eyebrow="ENQUIRE" title="Find your place at ONA." copy="Request details, floor plans or a conversation. No pressure—just a considered next step."/><section className="section-space"><div className="page-shell grid gap-16 lg:grid-cols-[1fr_.5fr]"><Suspense fallback={<p>Loading enquiry form…</p>}><EnquiryForm/></Suspense><aside className="bg-sand p-8 lg:p-10"><MessageCircle strokeWidth={1.25}/><h2 className="mt-12 font-display text-4xl">Prefer WhatsApp?</h2><p className="mt-5 text-sm text-charcoal/60">The direct ONA sales WhatsApp link will appear here once the contact number is confirmed.</p></aside></div></section></>}
