import "./globals.css";

export const metadata = {
  title: "SIGNING DONGMO Marc Godwin · Portfolio",
  description: "Développeur Web, Créateur SaaS et Builder Africain basé à Dschang, Cameroun.",
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