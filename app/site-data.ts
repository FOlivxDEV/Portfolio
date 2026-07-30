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
  { name: "Atria Odontologia", slug: "atria", category: "Odontologia", description: "Presença digital sofisticada para uma clínica de alta performance.", accent: "#a7bbff", eyebrow: "ODONTOLOGIA DE PRECISÃO", mockTitle: "O seu sorriso, elevado." },
  { name: "Valentim Legal", slug: "valentim", category: "Advocacia", description: "Autoridade e clareza para um escritório jurídico contemporâneo.", accent: "#d1b999", eyebrow: "ESTRATÉGIA JURÍDICA", mockTitle: "Clareza para decisões complexas." },
  { name: "Nexo Engenharia", slug: "nexo", category: "Engenharia", description: "Performance e escala para uma engenharia sem fronteiras.", accent: "#9bd6c4", eyebrow: "ENGENHARIA INTEGRADA", mockTitle: "Construímos o que vem depois." },
  { name: "Alba Clínica", slug: "alba", category: "Clínicas", description: "Cuidado, ciência e uma experiência digital acolhedora.", accent: "#d5a7ff", eyebrow: "SAÚDE PERSONALIZADA", mockTitle: "Cuidado em cada detalhe." },
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
