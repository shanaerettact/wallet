<script setup>
import { textConfig } from '@/constants/textConfig';

const services = [
  { name: textConfig.Home_Service_C2C,      icon: 'group',       colorArg: 'blue'    },
  { name: textConfig.Home_Service_Task,     icon: 'trophy',      colorArg: 'amber'   },
  { name: textConfig.Home_Service_Transfer, icon: 'send',        colorArg: 'indigo'  },
  { name: textConfig.Home_Service_Bill,     icon: 'description', colorArg: 'emerald' },
];

// Uses CSS-variable-safe inline styles so light/dark both work without
// relying on Tailwind dark: variants that depend on the .dark class strategy.
const colorMap = {
  blue:    { bg: 'rgba(59,130,246,0.12)',  text: '#2563eb'  },
  amber:   { bg: 'rgba(245,158,11,0.12)',  text: '#d97706'  },
  indigo:  { bg: 'rgba(99,102,241,0.12)',  text: '#4f46e5'  },
  emerald: { bg: 'rgba(16,185,129,0.12)',  text: '#059669'  },
};

const getBg   = (c) => colorMap[c]?.bg   ?? colorMap.blue.bg;
const getText = (c) => colorMap[c]?.text ?? colorMap.blue.text;
</script>

<template>
  <div class="mb-6">
    <h3
      class="text-base font-bold mb-3 px-1"
      style="color: var(--color-text);"
    >
      {{ textConfig.Home_Service_Title }}
    </h3>

    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="service in services"
        :key="service.name"
        class="flex items-center gap-3 rounded-lg p-4 cursor-pointer transition-all"
        style="
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
        "
      >
        <div
          class="p-2 rounded-lg shrink-0"
          :style="{ backgroundColor: getBg(service.colorArg), color: getText(service.colorArg) }"
        >
          <span class="material-symbols-outlined">{{ service.icon }}</span>
        </div>
        <h2
          class="text-sm font-bold"
          style="color: var(--color-text);"
        >
          {{ service.name }}
        </h2>
      </div>
    </div>
  </div>
</template>
