import { type AdminEnquiry } from '../api/admin';
import { humanize } from './format';

const columns: Array<[string, (item: AdminEnquiry) => string]> = [
  ['Reference', (item) => item.reference_number],
  ['Customer', (item) => item.name],
  ['Phone', (item) => item.phone],
  ['Email', (item) => item.email || ''],
  ['Interest', (item) => item.residence_interest ? humanize(item.residence_interest) : 'General'],
  ['Enquiry type', (item) => humanize(item.enquiry_type)],
  ['Status', (item) => humanize(item.status)],
  ['Source', (item) => item.source],
  ['Received', (item) => item.created_at],
  ['Message', (item) => item.message || ''],
];

function saveFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function downloadEnquiriesCsv(items: AdminEnquiry[], filename = 'ona-enquiries.csv') {
  const rows = [
    columns.map(([label]) => csvCell(label)).join(','),
    ...items.map((item) => columns.map(([, getter]) => csvCell(getter(item))).join(',')),
  ];
  saveFile(rows.join('\r\n'), filename, 'text/csv;charset=utf-8');
}

function htmlCell(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function downloadEnquiriesExcel(items: AdminEnquiry[], filename = 'ona-enquiries.xls') {
  const header = columns.map(([label]) => `<th>${htmlCell(label)}</th>`).join('');
  const body = items
    .map((item) => `<tr>${columns.map(([, getter]) => `<td>${htmlCell(getter(item))}</td>`).join('')}</tr>`)
    .join('');
  const html = `<html><body><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></body></html>`;
  saveFile(html, filename, 'application/vnd.ms-excel;charset=utf-8');
}
