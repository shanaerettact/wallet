import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Initialize from localStorage or system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const isDark = ref(getInitialTheme());

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  // Apply immediately on store creation
  applyTheme(isDark.value);

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  watch(isDark, (val) => {
    applyTheme(val);
  });

  return { isDark, toggle };
});
