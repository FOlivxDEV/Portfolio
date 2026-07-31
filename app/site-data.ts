export const siteConfig = {
  name: "Studio X",
  founder: "Seu Nome",
  whatsapp: "5511999999999",
  navigation: [
    { label: "Início", href: "#inicio" }, { label: "Portfólio", href: "#portfolio" },
    { label: "Sobre", href: "#sobre" }, { label: "Planos", href: "#planos" }, { label: "Contato", href: "#contato" },
  ],
  about: "Eu uno direção de arte, estratégia e desenvolvimento para criar experiências digitais que comunicam valor antes mesmo da primeira palavra. Cada entrega é conduzida de perto, do conceito ao lançamento.",
};

export const portfolio = [
  { name: "Jr Odontologia", slug: "clinica-odonto-02", category: "Odontologia", description: "Presença digital acolhedora para uma clínica odontológica.", accent: "#a7bbff", eyebrow: "ODONTOLOGIA", mockTitle: "Sorrisos com confiança.", previewImage: "/projects/clinica-odonto-02.webp", sourceUrl: "https://clinicaodonto02.vercel.app/" },
  { name: "Jr Odontologia Premium", slug: "clinica-odonto-03", category: "Odontologia", description: "Experiência premium focada em cuidado, tecnologia e conversão.", accent: "#9bd6c4", eyebrow: "ODONTOLOGIA PREMIUM", mockTitle: "Cuidado em cada detalhe.", previewImage: "/projects/clinica-odonto-03.webp", sourceUrl: "https://clinicaodonto03.vercel.app/" },
  { name: "Pedro Moura", slug: "pedro-moura-odontologia", category: "Odontologia", description: "Odontologia estética autoral com uma presença digital elegante e acolhedora.", accent: "#d7b66f", eyebrow: "ODONTOLOGIA ESTÉTICA AUTORAL", mockTitle: "Natural não é acaso. É intenção.", previewImage: "/projects/pedro-moura-odontologia.webp" },
  { name: "Ferraz, Oliveira & Martins", slug: "escritorio-adv-01", category: "Advocacia", description: "Autoridade e clareza para um escritório jurídico contemporâneo.", accent: "#d1b999", eyebrow: "ESTRATÉGIA JURÍDICA", mockTitle: "Experiência que protege.", previewImage: "/projects/escritorio-adv-01.webp", sourceUrl: "https://escritorioadv01.vercel.app/" },
  { name: "Ferraz Advocacia", slug: "escritorio-adv-02", category: "Advocacia", description: "Posicionamento jurídico sofisticado, direto e confiável.", accent: "#d5a7ff", eyebrow: "ADVOCACIA ESTRATÉGICA", mockTitle: "Clareza para decisões complexas.", previewImage: "/projects/escritorio-adv-02.webp", sourceUrl: "https://escritorioadv02.vercel.app/" },
  { name: "Haus Imóveis", slug: "haus", category: "Imobiliária", description: "Imóveis extraordinários apresentados com a atenção que merecem.", accent: "#b6d8ff", eyebrow: "CURADORIA IMOBILIÁRIA", mockTitle: "Endereços que contam histórias." },
  { name: "Auré E-commerce", slug: "aure", category: "E-commerce", description: "Uma experiência de compra tátil, editorial e memorável.", accent: "#f0c49c", eyebrow: "OBJETOS ESSENCIAIS", mockTitle: "Menos coisas. Melhores escolhas." },
];

export const benefits = [
  { title: "Performance", description: "Experiências leves, rápidas e desenhadas para métricas reais." },
  { title: "SEO", description: "Fundação técnica pronta para sua marca ser encontrada." },
  { title: "Design Premium", description: "Direção visual exclusiva, sem aparência de template." },
  { title: "Código Limpo", description: "Arquitetura organizada, sustentável e fácil de evoluir." },
  { title: "Suporte", description: "Acompanhamento próximo antes e depois do lançamento." },
  { title: "Escalabilidade", description: "Tecnologia preparada para crescer junto com o negócio." },
];
export const stats = [{ value: "+200", label: "projetos" }, { value: "2 anos", label: "de experiência" }, { value: "Landing Page", label: "especialidade" }, { value: "UI", label: "premium" }];
export const plans = [
  { name: "Landing Page", description: "Uma única página com tudo que você precisa. Ideal para todos os tipos de negócio.", prefix: "a partir de", price: "R$ 297", suffix: "", features: ["Ideal para vender um único serviço", "Feita para gerar mais contatos", "Carregamento rápido", "Funciona em celular e computador", "Aumenta sua conversão em +60%"], cta: "Quero este plano", featured: true },
  { name: "Site Institucional", description: "Presença completa para consolidar autoridade e confiança.", prefix: "a partir de", price: "R$ 497", suffix: "", features: ["Até 6 páginas", "Apresente sua empresa com profissionalismo", "Fácil de atualizar quando precisar", "Aparece melhor no Google", "Funciona em qualquer dispositivo"], cta: "Escolher institucional" },
  { name: "Projeto Personalizado", description: "Para plataformas, e-commerces e desafios fora do padrão.", prefix: "", price: "Sob consulta", suffix: "", features: ["Escopo sob medida", "Arquitetura dedicada", "Integrações e automações", "Design system", "Evolução contínua"], cta: "Falar com especialista" },
];
