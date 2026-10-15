// Theme plumbing shared by the root layout (pre-paint script) and ThemeToggle.
// Colours themselves live in app/styles/abstract/_theme.scss.

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "yms-theme";

/** Browser-chrome colour per theme (<meta name="theme-color">) — each theme's --bg-canvas. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#020202", light: "#faf9f7" };

// Runs inline in <head>, before the first paint, so a returning visitor on the
// light theme never sees a dark flash. Order: ?theme= in the URL (handy for
// QA and for linking a specific theme), then the saved choice, then dark —
// the brand look — as the default.
export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get("theme"),s=localStorage.getItem("${THEME_STORAGE_KEY}"),t=q==="light"||q==="dark"?q:s==="light"||s==="dark"?s:"dark";d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="light"?"${THEME_COLOR.light}":"${THEME_COLOR.dark}";}catch(e){}})();`;
