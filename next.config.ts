import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Génère les fichiers statiques HTML/CSS/JS
  images: {
    unoptimized: true, // Désactive l'API d'optimisation d'images (non supportée par GitHub Pages)
  },};

export default nextConfig;
