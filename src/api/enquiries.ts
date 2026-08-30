export type EnquiryType =
  | 'enquire_about_residence'
  | 'request_floor_plans'
  | 'schedule_viewing'
  | 'talk_to_sales'
  | 'general';

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  residence_interest?: string;
  enquiry_type: EnquiryType;
  message?: string;
  consent: boolean;
  source: 'website';
  company_website: string;
}

export interface EnquiryResponse {
  success: boolean;
  reference_number: string;
  message: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8400/api').replace(/\/$/, '');

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Unable to reach the enquiry service. Make sure the backend is running on port 8400.');
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.error?.message || 'We could not submit your enquiry. Please check your details and try again.';
    throw new Error(message);
  }

  return body as EnquiryResponse;
}
