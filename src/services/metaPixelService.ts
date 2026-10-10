export interface MetaPixelConfig {
  pixelId: string;
  customScript: string;
  isEnabled: boolean;
}

const STORAGE_KEY = 'osn_meta_pixel_config';

export const DEFAULT_PIXEL_CONFIG: MetaPixelConfig = {
  pixelId: '',
  customScript: '',
  isEnabled: false
};

export function getMetaPixelConfig(): MetaPixelConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_PIXEL_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Failed to get Meta Pixel config:', err);
  }
  return DEFAULT_PIXEL_CONFIG;
}

export function saveMetaPixelConfig(config: MetaPixelConfig): MetaPixelConfig {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    applyMetaPixel(config);

    // Sync to Neon PostgreSQL server hosting directly
    fetch('/api/meta-pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config })
    }).catch((err) => console.warn('Failed to sync meta pixel to server:', err));

    setTimeout(() => {
      try {
        window.dispatchEvent(new CustomEvent('osn_pixel_updated', { detail: config }));
      } catch {}
    }, 0);
  } catch (err) {
    console.error('Failed to save Meta Pixel config:', err);
  }
  return config;
}

export async function fetchMetaPixelConfigFromServer(): Promise<MetaPixelConfig> {
  try {
    const res = await fetch('/api/meta-pixel', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const config: MetaPixelConfig = { ...DEFAULT_PIXEL_CONFIG, ...json.data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        applyMetaPixel(config);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('osn_pixel_updated', { detail: config }));
        }
        return config;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch Meta Pixel config from server:', err);
  }
  return getMetaPixelConfig();
}

// Auto-sync on module load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    fetchMetaPixelConfigFromServer().catch(() => {});
  }, 100);
}

export function applyMetaPixel(config: MetaPixelConfig): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Remove previous script injection if any
  const oldScript = document.getElementById('meta-pixel-dynamic-script');
  if (oldScript) oldScript.remove();
  const oldNoscript = document.getElementById('meta-pixel-dynamic-noscript');
  if (oldNoscript) oldNoscript.remove();

  if (!config.isEnabled) return;

  // If custom full HTML snippet provided, inject cleanly
  if (config.customScript && config.customScript.trim()) {
    try {
      const container = document.createElement('div');
      container.id = 'meta-pixel-dynamic-script';
      container.innerHTML = config.customScript;
      // Execute any script tags inside
      const scripts = container.querySelectorAll('script');
      scripts.forEach((s) => {
        const newS = document.createElement('script');
        if (s.src) {
          newS.src = s.src;
        } else {
          newS.textContent = s.textContent;
        }
        document.head.appendChild(newS);
      });
      document.head.appendChild(container);
    } catch (e) {
      console.error('Failed to inject custom pixel script:', e);
    }
    return;
  }

  // Standard Meta Pixel snippet if pixelId provided
  if (config.pixelId && config.pixelId.trim()) {
    const id = config.pixelId.trim();
    const scriptEl = document.createElement('script');
    scriptEl.id = 'meta-pixel-dynamic-script';
    scriptEl.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${id}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(scriptEl);

    const noscriptEl = document.createElement('noscript');
    noscriptEl.id = 'meta-pixel-dynamic-noscript';
    noscriptEl.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscriptEl);
  }
}

// Track standard Meta Pixel events (Lead, CompleteRegistration, Purchase)
export function trackPixelEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, params || {});
    } catch (e) {
      console.warn('Failed to fire fbq event:', eventName, e);
    }
  }
}
