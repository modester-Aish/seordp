export function generateCanonicalUrl(path: string): string {
  // Always use non-www domain for canonical URLs
  let baseUrl = 'https://seordp.net';
  
  // Remove www if present
  baseUrl = baseUrl.replace(/^https?:\/\/(www\.)?/, 'https://');
  
  // Remove trailing slash from base URL if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
}

export function generateAbsoluteUrl(path: string): string {
  return generateCanonicalUrl(path);
}

