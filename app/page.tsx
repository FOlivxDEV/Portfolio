"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight, BarChart3, Check, ChevronLeft, ChevronRight, Gauge,
  Layers3, Menu, ShieldCheck, Sparkles, X, Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { siteConfig, portfolio, plans, timeline, stats } from "./site-data";

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

type Scene = { index: string; kicker: string; title: React.ReactNode; text: string };
function ScrollyScene({ scene, reduce }: { scene: Scene; reduce: boolean | null }) {
  const parent = {
    hidden: { opacity: 0, y: 44, scale: .975 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .72, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], staggerChildren: .11, delayChildren: .1 } },
    exit: { opacity: 0, y: -34, scale: 1.018, transition: { duration: .58, ease: [0.7, 0, 0.84, 0] as [number, number, number, number], staggerChildren: .045, staggerDirection: -1 } },
  };
  const child = {
    hidden: { opacity: 0, y: 28, scale: .985, filter: "blur(32px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: .68, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: { opacity: 0, y: -18, scale: 1.01, filter: "blur(28px)", transition: { duration: .46, ease: [0.7, 0, 0.84, 0] as [number, number, number, number] } },
  };
  return <motion.div className="scrolly-scene"
    style={{ willChange: "transform, opacity, filter" }}
    variants={parent} initial={reduce ? false : "hidden"} animate="visible" exit={reduce ? undefined : "exit"}>
    <motion.span variants={child} className="kicker">{scene.kicker}</motion.span>
    <motion.h1 variants={child}>{scene.title}</motion.h1>
    <motion.p variants={child}>{scene.text}</motion.p>
    {scene.index === "04" && <motion.div variants={child} className="hero-actions"><a className="primary-button" href="#planos">Iniciar meu projeto <ArrowRight size={17} /></a><a className="secondary-button" href="#portfolio">Ver portfólio <Layers3 size={17} /></a></motion.div>}
  </motion.div>;
}

function HeroCarousel() {
  const reduce = useReducedMotion();
  const [activeScene, setActiveScene] = useState(0);
  const scenes: Scene[] = [
    { index: "04", kicker: "Bem-vindo ao Studio X", title: <>Seu próximo grande site pode <span>começar agora.</span></>, text: "Você está pronto para construir uma presença digital à altura da sua empresa?" },
    { index: "01", kicker: "A percepção começa antes da primeira palavra", title: <>Criamos sites que fazem empresas <span>parecerem gigantes.</span></>, text: "Autoridade, confiança e conversão traduzidas em uma experiência digital memorável." },
    { index: "02", kicker: "Excelência técnica comprovada", title: <>Excelente desempenho e performance nos <span>parâmetros do Lighthouse.</span></>, text: "Velocidade, acessibilidade, boas práticas e SEO são tratados como requisitos essenciais para entregar uma experiência rápida e confiável." },
    { index: "03", kicker: "Design que move o negócio", title: <>Um bom site pode aumentar sua conversão em <span>até 60%.</span></>, text: "Clareza, velocidade e confiança reduzem fricção e ajudam mais visitantes a avançar até a decisão." },
  ];
  const duration = activeScene === 0 ? 8_000 : 5_000;
  useEffect(() => {
    if (reduce) return;
    const timer = window.setTimeout(() => setActiveScene(current => (current + 1) % scenes.length), duration);
    return () => window.clearTimeout(timer);
  }, [reduce, scenes.length, activeScene, duration]);
  const select = (index: number) => setActiveScene(index);
  return <section id="inicio" className="scrolly-hero carousel-hero">
    <div className="scrolly-sticky carousel-sticky" onClick={event => {
      if (!(event.target as HTMLElement).closest("a,button")) select((activeScene + 1) % scenes.length);
    }}>
      <div className="scrolly-glow" />
      <div className="hero-aurora" aria-hidden="true"><span /></div>
      <div className="scrolly-grid carousel-grid">
        <div className="scrolly-copy"><AnimatePresence mode="wait" initial={false}><ScrollyScene key={scenes[activeScene].index} scene={scenes[activeScene]} reduce={reduce} /></AnimatePresence></div>
        <div className="hero-glass-visual" aria-hidden="true">
          <div className="glass-browser-top"><i /><i /><i /></div>
          <svg className="glass-wave" viewBox="0 0 620 510" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8fa7ff" stopOpacity=".2" />
                <stop offset=".55" stopColor="#4f69c9" stopOpacity=".08" />
                <stop offset="1" stopColor="#1a2347" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wave-line" x1="0" y1="0" x2="1" y2=".7">
                <stop offset="0" stopColor="#dbe3ff" stopOpacity=".9" />
                <stop offset=".48" stopColor="#8ba4ff" stopOpacity=".95" />
                <stop offset="1" stopColor="#5267bc" stopOpacity=".25" />
              </linearGradient>
              <filter id="wave-glow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <path className="wave-depth" d="M-25 286 C90 238 180 308 278 383 C378 460 492 472 655 426 L655 550 L-25 550 Z" />
            <path className="wave-main" d="M-25 286 C90 238 180 308 278 383 C378 460 492 472 655 426" />
            <path className="wave-echo" d="M-35 306 C88 266 171 329 270 398 C374 470 501 487 660 446" />
          </svg>
          <span className="glass-shine" />
        </div>
      </div>
      <div className="carousel-controls-hero" aria-label="Selecionar mensagem">
        <div className="carousel-timer" key={activeScene}><i style={{ animationDuration: `${duration}ms` }} /></div>
        <span>{String(activeScene + 1).padStart(2, "0")} / 04</span>
        <div>{scenes.map((scene, index) => <button key={scene.index} className={activeScene === index ? "active" : ""} onClick={() => select(index)} aria-label={`Ver mensagem ${index + 1}`} />)}</div>
      </div>
    </div>
  </section>;
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

function AmbientAtmosphere() {
  const atmosphere = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        atmosphere.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
        atmosphere.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);
  return <div ref={atmosphere} className="cursor-atmosphere" aria-hidden="true"><i /><i /></div>;
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
      <AmbientAtmosphere />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="nav-wrap">
        <nav className="navbar glass" aria-label="Navegação principal">
          <a className="brand" href="#inicio"><span>⌁</span>{siteConfig.name}</a>
          <div className={`nav-links ${menu ? "open" : ""}`}>
            {siteConfig.navigation.map(item => <a key={item.href} href={item.href} onClick={() => setMenu(false)}>{item.label}</a>)}
          </div>
          <a className="nav-cta" href="#planos">Iniciar projeto <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menu"><Menu size={20} /></button>
        </nav>
      </header>

      <main id="conteudo">
        <HeroCarousel />

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
          <div className="section-heading centered"><span className="kicker">Resultados que você percebe</span><h2>Por que escolher a {siteConfig.name}?</h2><p>Porque seu cliente não espera. Entregamos um site rápido, confiável e pronto para transformar visitas em oportunidades.</p></div>
          <div className="lighthouse-showcase glass">
            <div className="lighthouse-proof">
              <span className="proof-label"><Gauge size={16} /> Resultado de referência no Lighthouse</span>
              <div className="proof-scores">
                {[["99", "Performance"], ["100", "Acessibilidade"], ["100", "Boas práticas"], ["100", "SEO"]].map(([score, label]) =>
                  <div key={label}><i style={{ "--score": `${score}%` } as React.CSSProperties}><b>{score}</b></i><span>{label}</span></div>)}
              </div>
              <div className="proof-metrics">
                <div><span>Primeiro conteúdo</span><b>1,8 s</b></div>
                <div><span>Interação disponível</span><b>2,1 s</b></div>
                <div><span>Carregamento visual</span><b>2,0 s</b></div>
                <div><span>Estabilidade da página</span><b>100%</b></div>
              </div>
              <small>*Indicadores de referência. Os resultados variam conforme conteúdo, hospedagem e integrações.</small>
            </div>
            <div className="proof-benefits">
              <article><Zap size={20} /><div><b>Abre rápido</b><p>Seu cliente vê o que precisa antes de perder a paciência.</p></div></article>
              <article><ShieldCheck size={20} /><div><b>Passa confiança</b><p>Uma experiência estável faz sua empresa parecer mais profissional.</p></div></article>
              <article><BarChart3 size={20} /><div><b>Converte melhor</b><p>Menos espera e menos atrito ajudam mais pessoas a pedir um orçamento.</p></div></article>
            </div>
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
              <a className={plan.featured ? "primary-button" : "secondary-button"}
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no plano ${plan.name} e gostaria de conversar sobre meu projeto.`)}`}
                target="_blank" rel="noopener noreferrer">{plan.cta}<ArrowRight size={16} /></a>
            </article>)}
          </div></div>
          <div className="carousel-controls"><button aria-label="Plano anterior" onClick={() => embla?.scrollPrev()}><ChevronLeft /></button><button aria-label="Próximo plano" onClick={() => embla?.scrollNext()}><ChevronRight /></button></div>
        </Section>

        <Section id="contato" className="contact-section">
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
