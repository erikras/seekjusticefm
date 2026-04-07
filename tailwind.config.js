/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#b98552",
        "brand-light": "#d3b28b",
        "brand-dark": "#4b2d1f",
        ink: "#1f2528",
        paper: "#fffaf3",
        sand: "#f2eadf",
        line: "#d7c9b7",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#3b3530",
            h1: {
              color: "#1f2528",
              fontWeight: "700",
              fontFamily: "var(--font-serif)",
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h2: {
              color: "#1f2528",
              fontWeight: "600",
              fontFamily: "var(--font-serif)",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              marginTop: "1.75rem",
              marginBottom: "0.75rem",
            },
            h3: {
              color: "#1f2528",
              fontWeight: "600",
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            },
            h4: {
              color: "#1f2528",
              fontWeight: "600",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              marginTop: "1.25rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
              lineHeight: "1.8rem",
            },
            ul: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            ol: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            a: {
              color: "#8d5b24",
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: "#4b2d1f",
              },
            },
            blockquote: {
              borderLeftColor: "#d3b28b",
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "italic",
              color: "#6a5a49",
              backgroundColor: "#fcf6ed",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              borderRadius: "0.375rem",
            },
            code: {
              backgroundColor: "#f4ece2",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            },
            pre: {
              backgroundColor: "#261c17",
              color: "#f9f1e8",
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
            },
            hr: {
              borderColor: "#d7c9b7",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            strong: {
              fontWeight: "600",
              color: "#1f2528",
            },
            em: {
              fontStyle: "italic",
            },
            img: {
              borderRadius: "0.75rem",
              boxShadow: "0 18px 40px rgba(31, 37, 40, 0.14)",
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
            },
            th: {
              backgroundColor: "#f4ece2",
            },
            "th, td": {
              border: "1px solid #d7c9b7",
              padding: "0.75rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
