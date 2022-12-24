declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: {
      push: (a: unknown) => void;
    };
  }
}

export function sendChangeView(view: string) {
  window.dataLayer.push({ event: 'nav_click', navItem: view });
}

export function sendChangeVisual(visual: string) {
  window.dataLayer.push({ event: 'visual_click', visualItem: visual });
}

export function sendChangeUsername() {
  window.dataLayer.push({ event: 'username_submit' });
}

export function sendChangeRankStrategy(strategy: string) {
  window.dataLayer.push({ event: 'rank_strategy_click', rankStrategy: strategy });
}

export function sendChangeTimeFrame(timeFrame: string) {
  window.dataLayer.push({ event: 'time_frame_click', timeFrame: timeFrame });
}
