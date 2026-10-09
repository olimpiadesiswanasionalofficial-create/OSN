// Helper to generate clean, high-resolution, lightweight SVG Data URIs for Simulation Questions
// Free open source visual illustrations tailored directly to each specific question topic

export function createSimulasiSvg(
  badge: string,
  title: string,
  accentColor: string,
  graphicSvgContent: string
): { svg: string; dataUri: string } {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" width="440" height="220">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="100%" stop-color="#F4EFE6"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.08"/>
    </filter>
  </defs>
  <!-- Card Background -->
  <rect width="440" height="220" rx="18" fill="url(#bgGrad)"/>
  <rect x="8" y="8" width="424" height="204" rx="14" fill="#FFFFFF" stroke="#E8E2D9" stroke-width="1.5" filter="url(#cardShadow)"/>
  
  <!-- Header Bar -->
  <rect x="20" y="16" width="6" height="18" rx="3" fill="${accentColor}"/>
  <text x="34" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#1A1615" letter-spacing="0.3">${title}</text>
  
  <!-- Badge -->
  <g transform="translate(320, 16)">
    <rect width="96" height="20" rx="10" fill="${accentColor}" fill-opacity="0.12"/>
    <text x="48" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="${accentColor}" text-anchor="middle">${badge}</text>
  </g>
  
  <line x1="20" y1="44" x2="420" y2="44" stroke="#F0EBE1" stroke-width="1"/>
  
  <!-- Graphic Content Area -->
  <g transform="translate(20, 52)">
    ${graphicSvgContent}
  </g>
</svg>`;

  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return { svg, dataUri };
}
