// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://rvlink.app',
    integrations: [
        starlight({
            title: 'RV-Link',
            logo: {
                src: './src/assets/logo.svg',
            },
            customCss: [
                './src/styles/custom.css',
            ],
            lastUpdated: true,
            editLink: {
                baseUrl: 'https://github.com/Backroads4Me/rv-link-site/edit/main/',
            },
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/Backroads4Me'
                },
                {
                    icon: 'discourse',
                    label: 'Community Forum',
                    href: 'https://forum.rvlink.app'
                },
            ],
            sidebar: [
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Gallery', link: '/gallery/' },
                        { label: 'Build or Buy', link: '/purchase/' },
                    ],
                },
                {
                    label: 'Getting Started',
                    autogenerate: { directory: 'getting-started' },
                },
                {
                    label: 'Hardware',
                    autogenerate: { directory: 'hardware' },
                },
                {
                    label: 'Installation',
                    autogenerate: { directory: 'installation' },
                },
                {
                    label: 'Configuration',
                    autogenerate: { directory: 'configuration' },
                },
                {
                    label: 'Automation',
                    autogenerate: { directory: 'automation' },
                },
                {
                    label: 'Monitoring',
                    autogenerate: { directory: 'monitoring' },
                },
                {
                    label: 'Troubleshooting',
                    autogenerate: { directory: 'troubleshooting' },
                },
                {
                    label: 'Concepts',
                    autogenerate: { directory: 'concepts' },
                },
            ],
        }),
    ],

    adapter: cloudflare({
        platformProxy: {
            enabled: true
        },

        imageService: "cloudflare"
    }),
});