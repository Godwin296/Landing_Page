import "./globals.css";

export const metadata = {
  title: "SIGNING DONGMO Marc Godwin · Portfolio",
  description: "Développeur Web, Créateur SaaS et Builder Africain basé à Dschang, Cameroun.",
  alternates: {
    canonical: "https://landing-page-ten-cyan-35.vercel.app/",
  },
  verification: {
    google: "googleeb64f31b492c3528.html",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Importation des icônes Tabler Icons (la feuille de style CSS) */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}