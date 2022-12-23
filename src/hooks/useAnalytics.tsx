declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function sendChangeView(view: string) {
  window.gtag('event', 'nav_click', {
    navItem: view
  });
}

export function sendChangeVisual(visual: string) {
  window.gtag('event', 'visual_click', {
    visualItem: visual
  });
}

export function sendChangeUsername() {
  window.gtag('event', 'username_submit');
}

export function sendChangeRankStrategy(strategy: string) {
  window.gtag('event', 'rank_strategy_click', {
    rankStrategy: strategy
  });
}

export function sendChangeTimeFrame(timeFrame: string) {
  window.gtag('event', 'time_frame_click', {
    timeFrame: timeFrame
  });
}
