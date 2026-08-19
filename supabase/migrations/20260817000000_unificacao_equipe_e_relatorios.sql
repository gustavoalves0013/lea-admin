-- ═══════════════════════════════════════════════════════════════
-- UNIFICAÇÃO: site público + gestão de beneficiários
-- Rode este arquivo no SQL Editor do projeto Supabase do lea-admin
-- (o mesmo projeto cujas chaves estão no .env: soxcywfipndchpcwhmmc)
-- ═══════════════════════════════════════════════════════════════

-- ── 1) CORRIGIR ACESSO: hoje cada usuário só vê o que ELE cadastrou.
--       Numa ONG, toda a equipe logada precisa ver os mesmos dados.
--       Trocamos "auth.uid() = user_id" por "usuário está logado".
-- ═══════════════════════════════════════════════════════════════

-- beneficiarios
DROP POLICY IF EXISTS "Users can view their own beneficiarios" ON public.beneficiarios;
DROP POLICY IF EXISTS "Users can create their own beneficiarios" ON public.beneficiarios;
DROP POLICY IF EXISTS "Users can update their own beneficiarios" ON public.beneficiarios;
DROP POLICY IF EXISTS "Users can delete their own beneficiarios" ON public.beneficiarios;

CREATE POLICY "Equipe logada vê todos os beneficiários"
  ON public.beneficiarios FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "Equipe logada cria beneficiários"
  ON public.beneficiarios FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita beneficiários"
  ON public.beneficiarios FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui beneficiários"
  ON public.beneficiarios FOR DELETE
  TO authenticated USING (true);

-- ocorrencias
DROP POLICY IF EXISTS "Users can view ocorrencias of their beneficiarios" ON public.ocorrencias;
DROP POLICY IF EXISTS "Users can create ocorrencias for their beneficiarios" ON public.ocorrencias;
DROP POLICY IF EXISTS "Users can update ocorrencias of their beneficiarios" ON public.ocorrencias;
DROP POLICY IF EXISTS "Users can delete ocorrencias of their beneficiarios" ON public.ocorrencias;

CREATE POLICY "Equipe logada vê ocorrências"
  ON public.ocorrencias FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe logada cria ocorrências"
  ON public.ocorrencias FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita ocorrências"
  ON public.ocorrencias FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui ocorrências"
  ON public.ocorrencias FOR DELETE TO authenticated USING (true);

-- medicamentos
DROP POLICY IF EXISTS "Users can view medicamentos of their beneficiarios" ON public.medicamentos;
DROP POLICY IF EXISTS "Users can create medicamentos for their beneficiarios" ON public.medicamentos;
DROP POLICY IF EXISTS "Users can update medicamentos of their beneficiarios" ON public.medicamentos;
DROP POLICY IF EXISTS "Users can delete medicamentos of their beneficiarios" ON public.medicamentos;

CREATE POLICY "Equipe logada vê medicamentos"
  ON public.medicamentos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe logada cria medicamentos"
  ON public.medicamentos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita medicamentos"
  ON public.medicamentos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui medicamentos"
  ON public.medicamentos FOR DELETE TO authenticated USING (true);

-- pagamentos
DROP POLICY IF EXISTS "Users can view their own pagamentos" ON public.pagamentos;
DROP POLICY IF EXISTS "Users can create their own pagamentos" ON public.pagamentos;
DROP POLICY IF EXISTS "Users can update their own pagamentos" ON public.pagamentos;
DROP POLICY IF EXISTS "Users can delete their own pagamentos" ON public.pagamentos;

CREATE POLICY "Equipe logada vê pagamentos"
  ON public.pagamentos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe logada cria pagamentos"
  ON public.pagamentos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita pagamentos"
  ON public.pagamentos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui pagamentos"
  ON public.pagamentos FOR DELETE TO authenticated USING (true);

-- atividades
DROP POLICY IF EXISTS "Users can view their own atividades" ON public.atividades;
DROP POLICY IF EXISTS "Users can create their own atividades" ON public.atividades;
DROP POLICY IF EXISTS "Users can update their own atividades" ON public.atividades;
DROP POLICY IF EXISTS "Users can delete their own atividades" ON public.atividades;

CREATE POLICY "Equipe logada vê atividades"
  ON public.atividades FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe logada cria atividades"
  ON public.atividades FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita atividades"
  ON public.atividades FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui atividades"
  ON public.atividades FOR DELETE TO authenticated USING (true);

-- atividade_participantes
DROP POLICY IF EXISTS "Users can view participantes of their atividades" ON public.atividade_participantes;
DROP POLICY IF EXISTS "Users can create participantes for their atividades" ON public.atividade_participantes;
DROP POLICY IF EXISTS "Users can update participantes of their atividades" ON public.atividade_participantes;
DROP POLICY IF EXISTS "Users can delete participantes of their atividades" ON public.atividade_participantes;

CREATE POLICY "Equipe logada vê participantes"
  ON public.atividade_participantes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe logada cria participantes"
  ON public.atividade_participantes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Equipe logada edita participantes"
  ON public.atividade_participantes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Equipe logada exclui participantes"
  ON public.atividade_participantes FOR DELETE TO authenticated USING (true);


-- ── 2) NOVA TABELA: prestação de contas (o que hoje vive só no site
--       estático) — agora dentro do mesmo banco do painel completo.
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.relatorios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mes TEXT NOT NULL,
  ano TEXT NOT NULL,
  receitas TEXT,
  despesas TEXT,
  atendimentos TEXT,
  descricao TEXT,
  status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('publicado', 'rascunho')),
  arquivo_url TEXT,
  arquivo_nome TEXT,
  atualizado_em TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.relatorios ENABLE ROW LEVEL SECURITY;

-- Visitante do site (não logado) só vê os relatórios já publicados
CREATE POLICY "Público vê relatórios publicados"
  ON public.relatorios FOR SELECT
  TO anon USING (status = 'publicado');

-- Equipe logada no painel tem acesso total
CREATE POLICY "Equipe logada gerencia relatórios"
  ON public.relatorios FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Bucket de armazenamento para os anexos dos relatórios (PDF/imagem)
INSERT INTO storage.buckets (id, name, public)
VALUES ('relatorios-arquivos', 'relatorios-arquivos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Leitura pública de arquivos de relatórios"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'relatorios-arquivos');

CREATE POLICY "Equipe logada envia arquivos de relatórios"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'relatorios-arquivos');

CREATE POLICY "Equipe logada exclui arquivos de relatórios"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'relatorios-arquivos');

-- ═══════════════════════════════════════════════════════════════
-- Depois de rodar: crie o login de cada pessoa da equipe em
-- Authentication → Users, se ainda não tiver feito.
-- ═══════════════════════════════════════════════════════════════
