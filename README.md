# Studio X — Portfólio premium

Site de portfólio em tema escuro com linguagem visual Liquid Glass, construído com Next/React, TypeScript, Tailwind CSS, Framer Motion, Embla, React Hook Form, Zod e Supabase.

## Desenvolvimento

1. Instale as dependências com `pnpm install`.
2. Copie `.env.example` para `.env.local` e preencha somente valores públicos/permitidos.
3. Execute `pnpm dev`.
4. Valide com `pnpm lint`, `pnpm exec tsc --noEmit` e `pnpm build`.

O conteúdo principal editável está em `app/site-data.ts`.

## Supabase

Crie um projeto Supabase e aplique a migration em `supabase/migrations`. A tabela `leads` possui RLS ativo e uma policy mínima somente para inserção anônima. Leituras não são liberadas ao cliente público. Nunca use `service_role` no frontend.

Variáveis:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Deploy

O projeto está preparado para deploy automático após conectar o repositório ao provedor. Configure as variáveis no painel do ambiente de produção. Tokens, chaves privadas e credenciais não fazem parte do repositório.

## LGPD

O banner mantém analytics bloqueado até consentimento. As páginas legais são modelos informativos e precisam de revisão jurídica antes de uso comercial. Atualize contatos, controlador, operador, prazos de retenção e fornecedores conforme a operação real.
