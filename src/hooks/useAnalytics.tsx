declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function sendChangeView(view: string) {
  window.gtag('event', 'nav_click', {
    item: view
  });
}
