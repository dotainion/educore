import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/bootstrap.js',
                'resources/js/apps/account/main.jsx',
                'resources/js/apps/attendance/main.jsx',
                'resources/js/apps/CRM/main.jsx',
                'resources/js/apps/dashboard/main.jsx',
                'resources/js/apps/employee/main.jsx',
                'resources/js/apps/expense/main.jsx',
                'resources/js/apps/HR/main.jsx',
                'resources/js/apps/invoice/main.jsx',
                'resources/js/apps/launcher/main.jsx',
                'resources/js/apps/leave/main.jsx',
                'resources/js/apps/payroll/main.jsx',
                'resources/js/apps/project/main.jsx',
                'resources/js/apps/support/main.jsx',
                'resources/js/apps/task/main.jsx',
                'resources/js/testing/main.jsx',
            ],
            refresh: true,
        }),
        react({
            jsxRuntime: 'automatic',
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});