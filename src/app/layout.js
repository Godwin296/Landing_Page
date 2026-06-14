import "./globals.css";

export const metadata = {
  title: "SIGNING DONGMO Marc Godwin · Portfolio",
  description: "Développeur Web, Créateur SaaS et Builder Africain basé à Dschang, Cameroun.",
  alternates: {
    canonical: "https://landing-page-ten-cyan-35.vercel.app/",
  },
  verification: {
    google: "SBklAuf6SVKKf0jVp5zxfh99OSI_7k2u6smz05w4T3Y",
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