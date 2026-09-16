import { API_BASE_URL } from './client';

const SESSION_KEY = 'ona_visitor_session';

function visitorSessionId(): string {
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `ona-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `ona-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export async function recordPageVisit(pagePath: string) {
  if (!pagePath || pagePath.startsWith('/admin')) return;
  try {
    await fetch(`${API_BASE_URL}/analytics/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: visitorSessionId(), page_path: pagePath }),
      keepalive: true,
    });
  } catch {
    // Analytics must never interrupt the customer experience.
  }
}
