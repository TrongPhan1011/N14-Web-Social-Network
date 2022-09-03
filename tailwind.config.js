/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'lcn-blue-1': '#F3F9FF',
                'lcn-blue-2': '#DEF0FF',
                'lcn-blue-3': '#C6E4FF',
                'lcn-blue-4': '#47A9FF',
                'lcn-blue-5': '#004078',
                'lcn-green-1': '#66DA53',
            },
        },
    },
    plugins: [],
};
