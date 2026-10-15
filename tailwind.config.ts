/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            screens: {
                sm: "575.98px",
                md: "767.98px",
                lg: "991.98px",
                xl: "1199.98px",
                xxl: "1439.98px"
            },
            container: {
                center: true,
                screens: {
                    sm: "100%",
                    md: "767px",
                    lg: "992px",
                    xl: "1200px",
                    xxl: "1440px"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            }
        }
    }
};
