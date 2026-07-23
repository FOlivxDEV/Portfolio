"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight, BarChart3, Check, ChevronLeft, ChevronRight, Code2, Gauge,
  Layers3, Menu, Search, ShieldCheck, Sparkles, X, Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { siteConfig, benefits, portfolio, plans, timeline, stats } from "./site-data";

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Conte um pouco mais sobre o projeto."),
  website: z.string().max(0, "Spam detectado."),
  consent: z.boolean().refine(value => value, "Aceite a política de privacidade."),
});
type ContactData = z.infer<typeof contactSchema>;

const reveal = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)", scale: .98 },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
};

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.section id={id} className={`section ${className}`}
      initial={reduce ? undefined : "hidden"} whileInView="visible"
      viewport={{ once: false, amount: .18 }} variants={reveal}
      transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.section>
  );
}

function ProjectVisual({ project, large = false }: { project: (typeof portfolio)[number]; large?: boolean }) {
  return (
    <div className={`project-visual ${large ? "large" : ""}`} style={{ "--accent": project.accent } as React.CSSProperties}>
      <div className="mock-nav"><span /><span /><span /><i /></div>
      <div className="mock-body">
        <div className="mock-copy"><small>{project.eyebrow}</small><b>{project.mockTitle}</b><span /><span /><button>Explorar</button></div>
        <div className="mock-art"><i /><i /><i /></div>
      </div>
    </div>
  );
}

function ProjectModal({ project, close }: { project: (typeof portfolio)[number]; close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [close]);
  return (
    <motion.div className="modal-backdrop" onMouseDown={close} role="presentation"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="browser-modal" role="dialog" aria-modal="true" aria-label={`Prévia de ${project.name}`}
        onMouseDown={e => e.stopPropagation()} initial={{ opacity: 0, y: 30, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}>
        <div className="browser-bar">
          <div className="traffic"><i /><i /><i /></div>
          <div className="address"><ShieldCheck size={13} /> studiox.design/{project.slug}</div>
          <button ref={closeRef} onClick={close} aria-label="Fechar prévia"><X size={18} /></button>
        </div>
        <div className="browser-scroll"><ProjectVisual project={project} large /></div>
      </motion.div>
    </motion.div>
  );
}

function CookieCenter() {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!localStorage.getItem("studiox-consent")), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const save = (analytics: boolean) => {
    localStorage.setItem("studiox-consent", JSON.stringify({ essential: true, analytics, at: new Date().toISOString(), version: 1 }));
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div className="cookie glass" role="dialog" aria-label="Preferências de cookies">
      <Sparkles size={18} />
      <div><b>Sua privacidade importa.</b><p>Usamos cookies essenciais. Analytics só será ativado com seu consentimento.</p>
        {prefs && <label className="cookie-toggle"><input type="checkbox" disabled checked /> Essenciais (obrigatórios)</label>}
      </div>
      <div className="cookie-actions">
        <button className="text-button" onClick={() => setPrefs(!prefs)}>Preferências</button>
        <button className="secondary-button small" onClick={() => save(false)}>Só essenciais</button>
        <button className="primary-button small" onClick={() => save(true)}>Aceitar</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<(typeof portfolio)[number] | null>(null);
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema), defaultValues: { website: "", consent: false },
  });
  const [formState, setFormState] = useState("");
  const categories = ["Todos", ...Array.from(new Set(portfolio.map(p => p.category)))];
  const filtered = category === "Todos" ? portfolio : portfolio.filter(p => p.category === category);

  const onSubmit = async (data: ContactData) => {
    setFormState("");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json() as { error?: string };
    setFormState(response.ok ? "Recebemos sua mensagem. Vamos conversar em breve." : result.error || "Não foi possível enviar agora.");
    if (response.ok) reset();
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="nav-wrap">
        <nav className="navbar glass" aria-label="Navegação principal">
          <a className="brand" href="#inicio"><span>⌁</span>{siteConfig.name}</a>
          <div className={`nav-links ${menu ? "open" : ""}`}>
            {siteConfig.navigation.map(item => <a key={item.href} href={item.href} onClick={() => setMenu(false)}>{item.label}</a>)}
          </div>
          <a className="nav-cta" href="#contato">Iniciar projeto <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menu"><Menu size={20} /></button>
        </nav>
      </header>

      <main id="conteudo">
        <Section id="inicio" className="hero">
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <motion.div className="float-badge badge-left" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Gauge size={18} /><span><small>PERFORMANCE</small> 99/100</span>
          </motion.div>
          <motion.div className="float-badge badge-right" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <ShieldCheck size={18} /><span><small>CONFIANÇA</small> Código robusto</span>
          </motion.div>
          <div className="hero-content">
            <div className="eyebrow"><i /> Websites de alta performance</div>
            <h1>Criamos sites que fazem empresas <span>parecerem gigantes.</span></h1>
            <p>Projetos desenvolvidos para gerar autoridade, confiança e conversão — com estratégia, tecnologia e acabamento impecável.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#contato">Iniciar meu projeto <ArrowRight size={17} /></a>
              <a className="secondary-button" href="#portfolio">Ver portfólio <Layers3 size={17} /></a>
            </div>
          </div>
          <div className="scroll-cue"><span /></div>
        </Section>

        <Section id="portfolio">
          <div className="section-heading split">
            <div><span className="kicker">Trabalhos selecionados</span><h2>Nosso Portfólio</h2></div>
            <p>Projetos digitais pensados para transformar percepção em valor e visitantes em clientes.</p>
          </div>
          <div className="category-list" role="tablist" aria-label="Categorias do portfólio">
            {categories.map(cat => <button role="tab" aria-selected={category === cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)} key={cat}>{cat}</button>)}
          </div>
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.button layout key={project.name} className="project-card glass" onClick={() => setSelected(project)}
                  initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }}>
                  <ProjectVisual project={project} />
                  <div className="project-meta"><span><small>{project.category}</small><b>{project.name}</b><p>{project.description}</p></span><i><ArrowRight size={18} /></i></div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        <Section id="sobre">
          <div className="section-heading centered"><span className="kicker">O padrão {siteConfig.name}</span><h2>O detalhe não é detalhe.<br />É o que define a experiência.</h2></div>
          <div className="benefit-grid">
            {benefits.map((item, i) => {
              const Icon = [Gauge, Search, Sparkles, Code2, ShieldCheck, BarChart3][i];
              return <article className="benefit-card glass" key={item.title}><span className="icon-box"><Icon size={21} /></span><b>{item.title}</b><p>{item.description}</p><small>0{i + 1}</small></article>;
            })}
          </div>
        </Section>

        <Section id="studio" className="about-section">
          <div className="about-portrait glass"><div className="portrait-mark"><span>S</span><i /></div><div className="portrait-caption"><small>FOUNDER & CREATIVE DEVELOPER</small><b>{siteConfig.founder}</b></div></div>
          <div className="about-copy"><span className="kicker">Quem está por trás</span><h2>Design com intenção.<br />Código com precisão.</h2><p>{siteConfig.about}</p>
            <div className="stats">{stats.map(item => <div key={item.label}><b>{item.value}</b><span>{item.label}</span></div>)}</div>
          </div>
          <div className="timeline">{timeline.map((item, i) => <div key={item.year}><span>{item.year}</span><i /><p><b>{item.title}</b>{item.text}</p>{i < timeline.length - 1 && <em />}</div>)}</div>
        </Section>

        <Section id="planos">
          <div className="section-heading centered"><span className="kicker">Investimento transparente</span><h2>Planos para cada ambição</h2><p>Escolha um ponto de partida. Cada projeto é refinado para a realidade da sua marca.</p></div>
          <div className="plan-viewport" ref={emblaRef}><div className="plan-grid">
            {plans.map((plan, index) => <article className={`plan-card glass ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="best">Melhor escolha</span>}
              <span className="plan-icon">{index === 0 ? <Zap /> : index === 1 ? <Layers3 /> : <Sparkles />}</span>
              <h3>{plan.name}</h3><p>{plan.description}</p>
              <div className="price"><small>{plan.prefix}</small><b>{plan.price}</b><span>{plan.suffix}</span></div>
              <ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
              <a className={plan.featured ? "primary-button" : "secondary-button"} href="#contato">{plan.cta}<ArrowRight size={16} /></a>
            </article>)}
          </div></div>
          <div className="carousel-controls"><button aria-label="Plano anterior" onClick={() => embla?.scrollPrev()}><ChevronLeft /></button><button aria-label="Próximo plano" onClick={() => embla?.scrollNext()}><ChevronRight /></button></div>
        </Section>

        <Section id="contato" className="contact-section">
          <div className="contact-glow" />
          <div className="contact-copy"><span className="kicker">Vamos criar algo memorável</span><h2>Pronto para ter<br />um site assim?</h2><p>Conte um pouco sobre seu momento. Em até um dia útil, você recebe uma resposta direta sobre caminhos, prazo e investimento.</p><div className="availability"><i /> Agenda aberta para novos projetos</div></div>
          <form className="contact-form glass" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field-row"><label>Nome<input autoComplete="name" {...register("name")} placeholder="Seu nome" />{errors.name && <small>{errors.name.message}</small>}</label><label>E-mail<input autoComplete="email" {...register("email")} placeholder="voce@empresa.com" />{errors.email && <small>{errors.email.message}</small>}</label></div>
            <label>Empresa <span>(opcional)</span><input autoComplete="organization" {...register("company")} placeholder="Nome da empresa" /></label>
            <label>Sobre o projeto<textarea {...register("message")} rows={4} placeholder="O que você quer construir?" />{errors.message && <small>{errors.message.message}</small>}</label>
            <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("website")} />
            <label className="consent"><input type="checkbox" {...register("consent")} /> Concordo com a <Link href="/privacidade">Política de Privacidade</Link>.</label>{errors.consent && <small className="form-error">{errors.consent.message}</small>}
            <button className="primary-button submit" disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Enviar briefing"}<ArrowRight size={17} /></button>
            {formState && <p className="form-status" role="status">{formState}</p>}
          </form>
        </Section>
      </main>

      <footer>
        <div className="footer-main"><a className="brand" href="#inicio"><span>⌁</span>{siteConfig.name}</a><p>Websites premium para marcas que não aceitam parecer comuns.</p><div className="footer-links">{siteConfig.navigation.map(n => <a href={n.href} key={n.label}>{n.label}</a>)}</div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</span><div><Link href="/privacidade">Privacidade</Link><Link href="/cookies">Cookies</Link><Link href="/termos">Termos</Link><Link href="/exclusao-de-dados">Exclusão de dados</Link></div></div>
        <p className="legal-note">Textos legais apresentados como modelos e sujeitos à revisão jurídica profissional.</p>
      </footer>
      <CookieCenter />
      <AnimatePresence>{selected && <ProjectModal project={selected} close={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}
