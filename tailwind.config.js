module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Complex site-specific column configuration
                'task': '40px 1fr 40px',
            }
        }
    },
    plugins: [],
}