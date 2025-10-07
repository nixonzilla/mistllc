// Global constants for branding and navigation

export const SITE = {
  name: "MISTLLC",
  tagline: "Authentic music, community vibes, and creative expression.",
  copyright: `© ${new Date().getFullYear()} MISTLLC. All rights reserved.`,
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Releases", path: "/releases" },
  { name: "Community", path: "/community" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/mistllc",
  instagram: "https://instagram.com/mistllc",
  youtube: "https://youtube.com/mistllc",
};
export const FOOTER_LINKS = [
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Community", path: "/community" },
];
export const THEME_KEY = "theme";
export type Theme = "light" | "dark";
export const DEFAULT_THEME: Theme = "light";
export const AVAILABLE_THEMES: Theme[] = ["light", "dark"];
export const FALLBACK_THEME: Theme = "light";
export const TRANSITION_DURATION = 300; // in ms
export const TRANSITION_EASING = "ease-in-out";
export const MOBILE_BREAKPOINT = 768; // in px
export const SIDEBAR_WIDTH = 250; // in px
export const HEADER_HEIGHT = 60; // in px
export const FOOTER_HEIGHT = 40; // in px
export const MAX_CONTENT_WIDTH = 1200; // in px
export const MIN_CONTENT_WIDTH = 320; // in px
export const CONTENT_PADDING = 20; // in px
export const Z_INDEX = {
  header: 1000,
  footer: 900,
  sidebar: 800,
  modal: 1100,
  tooltip: 1200,
};
export const SHADOWS = {
  light: "shadow-md",
  dark: "shadow-lg",
};
