const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

const config = {
  baseUrl,
  GOOGLE_SHEET_URL:
    'https://script.google.com/macros/s/AKfycbzStmPI9VpQNML53MO9ssqJpdqVIYD9kjFwrdAtZbz0cmmoSYv_KzIh1dvpq6pw7LxfuQ/exec',
  pagination: { PageNumber: '1', PageSize: '10' },
  tokenKey: 'str-weer-tkey',
  tourKey: 'str-tour-poiu',
};

export default config;
