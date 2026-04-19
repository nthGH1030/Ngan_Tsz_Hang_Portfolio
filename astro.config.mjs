// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://nthgh1030.github.io',
    base: '/Ngan_Tsz_Hang_Portfolio',
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [react()]
});
