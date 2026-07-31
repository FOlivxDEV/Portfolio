"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectModal } from "../components/project-modal";
import { ProjectVisual } from "../components/project-visual";
import { portfolio, siteConfig } from "../site-data";

export default function PortfolioPage() {
  const categories = ["Todos", ...Array.from(new Set(portfolio.map(project => project.category)))];
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<(typeof portfolio)[number] | null>(null);
  const projects = useMemo(() => category === "Todos" ? portfolio : portfolio.filter(project => project.category === category), [category]);

  return (
    <main className="portfolio-page">
      <header className="portfolio-page-nav">
        <Link className="brand" href="/"><span>⌁</span>{siteConfig.name}</Link>
        <Link className="secondary-button small" href="/#portfolio"><ArrowLeft size={15} /> Voltar ao site</Link>
      </header>
      <section className="portfolio-page-hero">
        <span className="kicker">Projetos por segmento</span>
        <h1>Escolha o tipo de site que<br /><span>você deseja explorar.</span></h1>
        <p>Selecione uma categoria para conhecer projetos pensados para diferentes mercados e objetivos.</p>
      </section>
      <nav className="portfolio-category-menu" aria-label="Categorias do portfólio">
        {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""} aria-pressed={category === item}>{item}</button>)}
      </nav>
      <section className="portfolio-page-grid" aria-live="polite">
        {projects.map(project => (
          <button type="button" className="portfolio-page-card glass" key={project.slug} onClick={() => setSelected(project)} aria-label={`Abrir projeto ${project.name}`}>
            <ProjectVisual project={project} />
            <div><span><small>{project.category}</small><b>{project.name}</b><p>{project.description}</p></span><i><ArrowRight size={18} /></i></div>
          </button>
        ))}
      </section>
      <AnimatePresence>{selected && <ProjectModal project={selected} close={() => setSelected(null)} />}</AnimatePresence>
    </main>
  );
}
