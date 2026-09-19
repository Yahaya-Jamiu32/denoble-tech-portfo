// Inline SVG icon set for the Services section — no icon library/CDN needed.
const SERVICE_ICON_PATHS = {
  globe: '<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />',
  layout: '<rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" />',
  react: '<circle cx="12" cy="12" r="1.8" /><ellipse cx="12" cy="12" rx="9" ry="3.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />',
  stack: '<path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M2 13l10 5 10-5" />',
  app: '<rect x="4" y="2" width="16" height="20" rx="2" /><path d="M10 18h4" />',
  server: '<rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" />',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />',
  refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.4L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.4L3 16" /><path d="M3 21v-5h5" />',
  bug: '<rect x="7" y="8" width="10" height="11" rx="5" /><path d="M12 8V5M9 5 7 3M15 5l2-2M4 12h3M17 12h3M5 18l2-1.5M19 18l-2-1.5" />',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />',
};

function serviceIconSVG(name) {
  const inner = SERVICE_ICON_PATHS[name] || '';
  return `<svg class="service-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
