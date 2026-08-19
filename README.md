# Centro Léa Rosenberg — Painel Administrativo

Sistema interno de gestão do Centro de Atendimento Especializado Léa Rosenberg:
cadastro de beneficiários, prontuário, medicamentos, ocorrências, financeiro,
atividades e prestação de contas (que também alimenta o site público).

## Tecnologias

- Vite
- TypeScript
- React (com React Router, em modo Hash — necessário para funcionar no GitHub Pages)
- shadcn-ui + Tailwind CSS
- Supabase (autenticação + banco de dados + armazenamento de arquivos)

## Rodando localmente

Requisito: Node.js e npm instalados ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# 1. Clonar o repositório
git clone https://github.com/gustavoalves0013/lea-admin.git

# 2. Entrar na pasta
cd lea-admin

# 3. Instalar as dependências
npm install

# 4. Rodar o servidor de desenvolvimento
npm run dev
```

O projeto já vem com um arquivo `.env` com as credenciais públicas do Supabase
(são chaves seguras para expor, feitas para isso — a segurança de verdade vem
das políticas de acesso configuradas no banco).

## Publicação (deploy)

O deploy é **automático**: toda vez que um push é feito na branch `main`, o
workflow em `.github/workflows/deploy.yml` builda o projeto e publica no
GitHub Pages sozinho, sem precisar de nenhum passo manual.

Se for a primeira vez configurando isso neste repositório, ative o GitHub
Pages em **Settings → Pages → Source → GitHub Actions** (uma vez só).

O endereço final fica em `https://<seu-usuário>.github.io/lea-admin/`.

## Banco de dados (Supabase)

As alterações de schema ficam versionadas em `supabase/migrations/`. Para
aplicar uma migração nova, copie o conteúdo do arquivo `.sql` mais recente e
rode no **SQL Editor** do painel do Supabase do projeto.

Os usuários do painel (login da equipe) são criados manualmente em
**Authentication → Users** no Supabase — não existe cadastro público.
