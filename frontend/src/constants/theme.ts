// src/constants/theme.ts
export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Releases", href: "/releases" },
  { label: "Community", href: "/community" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
export const THEME_COLORS = {
  light: {
    background: "bg-gradient-light",},
  dark: {
    background: "bg-gradient-dark",},
};
export const DEFAULT_THEME: Theme = "dark";
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