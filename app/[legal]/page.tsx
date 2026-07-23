import { notFound } from "next/navigation";
import Link from "next/link";

const pages: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
  privacidade: { title: "Política de Privacidade", sections: [
    { heading: "Dados tratados", text: "Podemos tratar nome, e-mail, empresa e informações enviadas voluntariamente no formulário de contato para responder solicitações e elaborar propostas." },
    { heading: "Base legal e finalidade", text: "O tratamento é realizado para atender sua solicitação, adotar medidas pré-contratuais e cumprir obrigações legais aplicáveis." },
    { heading: "Seus direitos", text: "Você pode solicitar confirmação, acesso, correção, portabilidade, anonimização ou exclusão de dados, conforme a LGPD." },
  ]},
  cookies: { title: "Política de Cookies", sections: [
    { heading: "Cookies essenciais", text: "São utilizados para preferências de privacidade, segurança e funcionamento básico do site." },
    { heading: "Analytics", text: "Medições opcionais permanecem bloqueadas até consentimento expresso no banner. O consentimento pode ser revisto a qualquer momento." },
  ]},
  termos: { title: "Termos de Uso", sections: [
    { heading: "Uso do site", text: "Este site apresenta serviços e trabalhos do estúdio. O conteúdo não constitui proposta comercial definitiva." },
    { heading: "Propriedade intelectual", text: "Marcas, textos, interfaces e elementos visuais pertencem a seus respectivos titulares e não podem ser reproduzidos sem autorização." },
  ]},
  "exclusao-de-dados": { title: "Solicitação de Exclusão de Dados", sections: [
    { heading: "Como solicitar", text: "Envie uma mensagem pelo formulário principal com o assunto “Exclusão de dados” e o e-mail usado no contato. A identidade poderá ser confirmada antes do atendimento." },
    { heading: "Prazo e exceções", text: "A solicitação será analisada no prazo legal. Alguns registros poderão ser preservados quando houver obrigação legal ou exercício regular de direitos." },
  ]},
};

export function generateStaticParams() { return Object.keys(pages).map(legal => ({ legal })); }
export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const page = pages[legal];
  if (!page) notFound();
  return <main className="legal-page"><Link className="brand" href="/"><span>⌁</span>Studio X</Link><h1>{page.title}</h1><p className="model">MODELO INFORMATIVO — este texto deve ser revisado por assessoria jurídica antes da publicação comercial.</p>{page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<p>Última atualização do modelo: julho de 2026.</p><Link className="secondary-button" href="/">Voltar ao site</Link></main>;
}
