"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

function Header() {
  const [cvOpen, setCvOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCvOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80 transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">

        {/* Logo - Left */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md transition-transform hover:scale-105 cursor-pointer">
            <span className="text-sm font-bold text-white leading-none">MS</span>
          </div>
        </div>

        {/* Navigation - Middle */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {[
              { name: "Accueil", href: "#accueil" },
              { name: "À propos", href: "#apropos" },
              { name: "Mon parcours", href: "#parcours" },
              { name: "Expériences", href: "#experience" },
              { name: "Compétences", href: "#competences" },
              { name: "Portfolio", href: "#portfolio" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400
                             after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right - Bouton CV */}
        <div className="hidden md:flex items-center" ref={dropdownRef}>
          <div className="relative">
            <button
              id="cv-btn"
              onClick={() => setCvOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold shadow-md hover:from-amber-500 hover:to-orange-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {/* Icône document */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              CV
              {/* Chevron */}
              <svg
                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 ${cvOpen ? "rotate-180" : "rotate-0"}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 flex flex-col items-center gap-3 p-3 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/60 rounded-2xl shadow-xl transition-all duration-200 origin-top ${cvOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              {/* Bouton Voir */}
              <a
                href={"/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                title="Voir le CV"
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white transition-all duration-200 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Voir</span>
              </a>

              {/* Bouton Télécharger */}
              <a
                href={"/cv.pdf"}
                download
                title="Télécharger le CV"
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-white transition-all duration-200 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Télécharger</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-700 md:hidden text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-zinc-50">
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Section Accueil */}
        <section id="accueil" className="dark relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-12 py-24 text-center bg-zinc-950 overflow-hidden">

          {/* Futuristic Tech Background */}
          <div className="absolute inset-0 bg-zinc-950 overflow-hidden pointer-events-none">
            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/25 blur-[120px] rounded-full opacity-70 mix-blend-screen animate-pulse"></div>
            <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-purple-600/25 blur-[100px] rounded-full opacity-60 mix-blend-screen"></div>
            <div className="absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-blue-600/25 blur-[100px] rounded-full opacity-60 mix-blend-screen"></div>

            {/* Perspective Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f30_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f30_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-80"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Main Avatar Placeholder */}
            <div className="mb-8 relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/photopourcv.jpg"
                  alt="Portrait de Mathieu SUEUR"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white mb-6">
              Mathieu SUEUR
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-6">
              Étudiant en 2ème année de BUT informatique à Amiens
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-zinc-400 leading-relaxed mb-6">
              Actuellement en spécialisation Backend, je souhaite d'abord consolider mon expertise en tant que développeur, pour ensuite évoluer vers la gestion de projets tech ou l'indépendance.            </p>
            <div className="mt-8 px-8 py-6 bg-zinc-800/80 rounded-2xl border-2 border-zinc-700 shadow-lg inline-block backdrop-blur-sm">
              <span className="text-zinc-500 italic font-medium">"C'est en forgeant qu'on devient forgeron."</span>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-4">
              <a href="https://www.linkedin.com/in/mathieu-sueur-681616346/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0a66c2]/90 border border-[#0a66c2]/50 text-white font-semibold rounded-full shadow-lg hover:bg-[#004182] hover:border-[#004182] hover:-translate-y-1 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section À propos */}
        <section id="apropos" className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-12 py-24 bg-white border-t border-zinc-200">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-12 text-center">À propos de moi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne Présentation & Valeurs */}
              <div className="bg-zinc-50 p-8 rounded-3xl shadow-md border border-zinc-200 transition hover:shadow-xl hover:border-indigo-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-zinc-900">Qui suis-je ?</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Doté d'un esprit calme et d'une forte soif d'apprendre, je place l'engagement et la culture du travail bien fait au cœur de ma démarche professionnelle.                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Mon parcours m'a permis de forger une vision globale du développement. J'ai ainsi acquis de solides compétences techniques, allant de l'optimisation du code à la modélisation de bases de données performantes.                </p>
              </div>

              {/* Colonne Qualités & Défauts */}
              <div className="bg-zinc-50 p-8 rounded-3xl shadow-md border border-zinc-200 transition hover:shadow-xl hover:border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                </div>
                <h3 className="text-2xl font-semibold mb-6 text-zinc-900">Personnalité</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200 block mb-1">Mes atouts</span>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Proactif et capable de monter rapidement en compétences, je suis très vite opérationnel sur de nouveaux environnements. Bien qu'autonome, je m'intègre facilement dans des dynamiques collaboratives pour faire avancer les projets.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200 block mb-1">Mon point d'attention</span>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Face à un bug complexe, je peux avoir tendance à m'acharner longtemps seul avant de solliciter l'aide de l'équipe. Pour y remédier, j'essaie désormais d'appliquer la règle du "timeboxing" : si je bloque plus d'une heure sur un problème, je vais poser la question à un collègue.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ligne Passion */}
              <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-purple-600 hover:to-purple-700 p-8 md:p-10 rounded-3xl shadow-lg border border-transparent text-white transition-all duration-300">
                {/* Basketball Neon (Top Right) */}
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)] opacity-60">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M 7 5.5 C 10 9, 10 15, 7 18.5" />
                    <path d="M 17 5.5 C 14 9, 14 15, 17 18.5" />
                  </svg>
                </div>

                {/* Running Shoes Neon (Bottom Left) */}
                <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.8)] opacity-60">
                    {/* Corps de la chaussure sportive */}
                    <path d="M22 15 c0 2.2 -1.8 4 -4 4 H6 c-2.2 0 -4 -1.8 -4 -4 v-2 c0 -2 1.5 -3.5 3.5 -3.5 l2 -3.5 c0.5 -1 1.5 -1.5 2.5 -1.5 h2 c1 0 2 0.5 2.5 1.5 l2 3.5 c0.5 0.5 1 1 1.5 1 h1.5 c1.5 0 2.5 1 2.5 2.5 v2 Z" />
                    {/* Ligne de séparation de la semelle */}
                    <path d="M2 15 h20" />
                    {/* Crampons / Design de la semelle */}
                    <path d="M6 19 l1 -4" />
                    <path d="M10 19 l1 -4" />
                    <path d="M14 19 l1 -4" />
                    <path d="M18 19 l1 -4" />
                    {/* Logo/Ligne aérodynamique sur le côté */}
                    <path d="M7 12 l3 -2 l5 3" />
                    {/* Lignes de vitesse */}
                    <line x1="0" y1="10" x2="3" y2="10" />
                    <line x1="1" y1="13" x2="4" y2="13" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4 py-4">
                  <h3 className="text-2xl md:text-3xl font-bold mb-1">Passionné par le sport</h3>
                  <p className="text-indigo-50/90 leading-relaxed text-lg max-w-2xl mx-auto">
                    Le sport est un véritable moteur dans mon équilibre quotidien. Mes 17 années de basket en club m'ont inculqué le sens du collectif et un fort esprit d'équipe. En parallèle, ma pratique de la course à pied nourrit ma rigueur et ma capacité de dépassement de soi.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline - Parcours */}
            <div id="parcours" className="mt-16 scroll-mt-24 bg-zinc-50 p-8 md:p-12 rounded-3xl shadow-md border border-zinc-200 transition hover:shadow-xl hover:border-indigo-200">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">Mon Parcours</h3>
              </div>

              <div className="relative border-l-2 border-indigo-200 flex flex-col justify-center ml-0 md:ml-12 lg:ml-24 space-y-12">

                {/* Item 3 */}
                <div className="relative group">
                  <div className="absolute -left-[11px] w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center ring-4 ring-zinc-50 shadow-md group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className="pl-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-2 tracking-wide uppercase">2024 - Aujourd'hui</span>
                    <h4 className="text-xl font-bold text-zinc-900">BUT Informatique</h4>
                    <p className="text-zinc-600 mt-2 font-medium">IUT d'Amiens</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative group">
                  <div className="absolute -left-[11px] w-5 h-5 bg-zinc-300 rounded-full ring-4 ring-zinc-50 group-hover:bg-indigo-400 transition-colors">
                  </div>
                  <div className="pl-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-700 text-sm font-semibold mb-2">2023 - 2024</span>
                    <h4 className="text-xl font-bold text-zinc-900">Licence Mathématiques & Informatique (L1)</h4>
                    <p className="text-zinc-600 mt-2 font-medium">Amiens</p>
                  </div>
                </div>

                {/* Item 1 */}
                <div className="relative group">
                  <div className="absolute -left-[11px] w-5 h-5 bg-zinc-300 rounded-full ring-4 ring-zinc-50 group-hover:bg-indigo-400 transition-colors">
                  </div>
                  <div className="pl-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-700 text-sm font-semibold mb-2">Juillet 2023</span>
                    <h4 className="text-xl font-bold text-zinc-900">Baccalauréat Général (mention assez bien)</h4>
                    <p className="text-zinc-600 mt-2 font-medium">Spécialités Mathématiques & Informatique</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Conteneur Expériences */}
            <div id="experience" className="mt-20 scroll-mt-24 flex flex-col gap-10">

              {/* Titre de section */}
              <div className="flex items-center gap-4 mb-2 justify-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">Expériences</h3>
              </div>

              {/* Expérience - Stage */}
              <div className="bg-zinc-50 overflow-hidden rounded-3xl shadow-md border border-zinc-200 transition hover:shadow-xl hover:border-indigo-200 flex flex-col">

                {/* Image en haut */}
                <div className="w-full h-56 relative overflow-hidden group">
                  <Image
                    src="/images/i.png"
                    alt="Aperçu du site ice-dev.com réalisé lors du stage"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Contenu texte en dessous */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">Stage Professionnel</h3>
                  </div>

                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 mb-6">
                    Développement Web (Symfony)
                  </h4>

                  <div className="space-y-4 text-zinc-600 leading-relaxed text-[15px] sm:text-base">
                    <p>
                      Au cours de ce stage, j'ai pu plonger au cœur de l'écosystème <strong className="text-zinc-900">Symfony</strong>. Ma mission principale m'a permis d'aborder toutes les étapes d'un projet web, de son initialisation jusqu'à la création d'interfaces complètes.
                    </p>
                    <p>
                      J'ai été en charge de concevoir et <strong className="text-zinc-900">créer la base de données</strong>, ainsi que de réaliser l'<strong className="text-zinc-900">installation complète et personnalisée</strong> du projet. Pour rendre la gestion du site autonome, j'ai mis en place une interface d'administration sur-mesure très poussée avec <strong className="text-zinc-900">Sonata Admin</strong>.
                    </p>
                    <p>
                      Enfin, j'ai pu approfondir mes connaissances en <strong className="text-zinc-900">référencement naturel (SEO)</strong>, en intervenant directement pour optimiser la visibilité globale de la plateforme sur les moteurs de recherche.
                    </p>
                    <div className="pt-4 mt-2">
                      <a href="https://www.ice-dev.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors group">
                        Voir le résultat
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section Compétences */}
        <section id="competences" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 py-24 bg-zinc-100 border-t border-zinc-200 transition-colors">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600 mb-6">Compétences du BUT</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Acquisition progressive des savoir-faire fondamentaux en informatique au fil de la formation.
              </p>
            </div>

            {/* Grille des compétences (C1 à C6) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { id: "C1", title: "Réaliser un développement d'application", color: "from-blue-500 to-cyan-500", icon: "💻" },
                { id: "C2", title: "Optimiser des applications informatiques", color: "from-emerald-500 to-teal-500", icon: "⚡" },
                { id: "C3", title: "Administrer des systèmes informatiques", color: "from-purple-500 to-pink-500", icon: "⚙️" },
                { id: "C4", title: "Gérer des données de l'information", color: "from-amber-500 to-orange-500", icon: "📊" },
                { id: "C5", title: "Conduire un projet", color: "from-rose-500 to-red-500", icon: "📈" },
                { id: "C6", title: "Travailler dans une équipe informatique", color: "from-indigo-500 to-blue-500", icon: "🤝" },
              ].map((comp) => (
                <div key={comp.id} className="group bg-white p-6 rounded-2xl shadow-md border border-zinc-200 transition-all duration-300 hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${comp.color} opacity-10 rounded-bl-full transition-transform group-hover:scale-110`}></div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl">{comp.icon}</span>
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${comp.color}`}>
                      {comp.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900">{comp.title}</h3>
                </div>
              ))}
            </div>

            {/* Réflexion et Parcours */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden">
              {/* Effet d'arrière-plan */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-16 h-16 shrink-0 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                </div>

                <div className="space-y-4 text-zinc-600 text-[15px] sm:text-base leading-relaxed">
                  <p>
                    Le développement est un apprentissage continu. Si à mes débuts, l'écriture d'un code optimisé, la lisibilité (clean code) et la navigation dans les documentations officielles représentaient de véritables défis, la pratique quotidienne en a fait des réflexes naturels.
                  </p>
                  <p>
                    Plus j'approfondis mes compétences techniques, plus je mesure l'immense diversité des carrières qui s'offrent à moi. C'est avec cette volonté d'explorer toutes ces possibilités que j'ai choisi d'intégrer le BUT Parcours A (Développement d'applications). Une voie polyvalente, idéale pour me forger un profil complet et m'ouvrir un maximum de portes pour l'avenir.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section Portfolio */}
        <section id="portfolio" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-12 py-24 bg-white border-t border-zinc-200">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">Mon Portfolio</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Découvrez ici une sélection de mes projets. Cliquez sur l'une des cartes pour être redirigé vers le code source sur GitHub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Projet 1 — carte individuelle avec lien GitHub et image d'aperçu */}
              <a
                href="https://github.com/MathieuSUEUR/mon-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-zinc-50 rounded-3xl overflow-hidden shadow-md border border-zinc-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-2"
              >
                {/* Aperçu du projet */}
                <div className="w-full h-48 bg-zinc-200 overflow-hidden relative">
                  <Image
                    src="/images/previewPortfolio.png"
                    alt="Aperçu du portfolio"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Informations */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-6 group-hover:text-blue-600 transition-colors">
                    Mon Portfolio
                  </h3>

                  <div className="mt-auto pt-4 border-t border-zinc-200">
                    <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium shadow-sm transition-colors group-hover:border-blue-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>

              {/* Projet 2 — Calendrier (en cours) */}
              <div className="group flex flex-col bg-zinc-50 rounded-3xl overflow-hidden shadow-md border border-zinc-200 relative">
                {/* Banderole En cours */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                  En cours de développement
                </div>

                {/* Icône Calendrier */}
                <div className="w-full h-48 bg-zinc-100 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 to-cyan-500/15"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500/80 relative z-10">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <rect x="7" y="14" width="3" height="3" rx="0.5"/>
                    <rect x="14" y="14" width="3" height="3" rx="0.5"/>
                  </svg>
                </div>

                {/* Informations */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-6">
                    Application Calendrier
                  </h3>
                  <div className="mt-auto pt-4 border-t border-zinc-200">
                    <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React Native"].map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Projet 3 — Statistiques (en cours) */}
              <div className="group flex flex-col bg-zinc-50 rounded-3xl overflow-hidden shadow-md border border-zinc-200 relative">
                {/* Banderole En cours */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
                  En cours de développement
                </div>

                {/* Icône Statistiques */}
                <div className="w-full h-48 bg-zinc-100 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 to-teal-500/15"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/80 relative z-10">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                    <line x1="2" y1="20" x2="22" y2="20"/>
                  </svg>
                </div>

                {/* Informations */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-6">
                    Projet Statistiques
                  </h3>
                  <div className="mt-auto pt-4 border-t border-zinc-200">
                    <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js"].map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-12 py-24 bg-zinc-50 border-t border-zinc-200 overflow-hidden">

          {/* Décor moderne — fond clair */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Orbes lumineuses pastel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-400/25 blur-[130px] rounded-full"></div>
            <div className="absolute right-[-10%] top-[-15%] w-[500px] h-[500px] bg-purple-400/25 blur-[110px] rounded-full"></div>
            <div className="absolute left-[-10%] bottom-[-15%] w-[500px] h-[500px] bg-sky-400/25 blur-[110px] rounded-full"></div>

            {/* Grille subtile en perspective */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#a1a1aa30_1px,transparent_1px),linear-gradient(to_bottom,#a1a1aa30_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)]"></div>

            {/* Points décoratifs */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-500/40 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            <div className="absolute bottom-32 left-40 w-2 h-2 bg-sky-500/40 rounded-full animate-pulse [animation-delay:1s]"></div>
            <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-indigo-500/40 rounded-full animate-pulse [animation-delay:1.5s]"></div>
          </div>

          <div className="relative z-10 max-w-3xl w-full text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Contactez-moi</h2>
            <p className="text-lg text-zinc-600 mb-12">
              Vous avez un projet en tête, une question ou vous souhaitez simplement échanger ? Je suis à votre écoute !
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Mail */}
              <a href="mailto:matsueur@outlook.fr" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <span>M'envoyer un email</span>
              </a>

              {/* Conteneur pour les réseaux sociaux */}
              <div className="flex gap-4">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/mathieu-sueur-681616346/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-zinc-200 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>

                {/* GitHub */}
                <a href="https://github.com/MathieuSUEUR" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
