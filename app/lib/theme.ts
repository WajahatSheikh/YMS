// Theme plumbing shared by the root layout (pre-paint script) and ThemeToggle.
// Colours themselves live in app/styles/abstract/_theme.scss.

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "yms-theme";

/** Browser-chrome colour per theme (<meta name="theme-color">) — each theme's --bg-canvas. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#020202", light: "#faf9f7" };

/** What every visit opens in; the toggle switches for the rest of that visit. */
export const DEFAULT_THEME: Theme = "light";

// Runs inline in <head>, before the first paint, so a visitor who switched to
// dark never sees a light flash on the next page. Order: ?theme= in the URL
// (handy for QA and for linking a specific theme), then the choice saved for
// this visit (sessionStorage), then DEFAULT_THEME. Every new visit opens in
// light; the old persistent localStorage choice is cleared so it can't force
// dark on returning visitors.
export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get("theme");try{localStorage.removeItem("${THEME_STORAGE_KEY}")}catch(e){}var s=sessionStorage.getItem("${THEME_STORAGE_KEY}"),t=q==="light"||q==="dark"?q:s==="light"||s==="dark"?s:"${DEFAULT_THEME}";d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="light"?"${THEME_COLOR.light}":"${THEME_COLOR.dark}";}catch(e){}})();`;
