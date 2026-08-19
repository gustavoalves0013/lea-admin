import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface RelatorioDb {
  id: string;
  mes: string;
  ano: string;
  receitas: string | null;
  despesas: string | null;
  atendimentos: string | null;
  descricao: string | null;
  status: "publicado" | "rascunho";
  arquivo_url: string | null;
  arquivo_nome: string | null;
  atualizado_em: string | null;
  created_at: string;
}

export interface CreateRelatorioData {
  mes: string;
  ano: string;
  receitas?: string;
  despesas?: string;
  atendimentos?: string;
  descricao?: string;
  status?: "publicado" | "rascunho";
  arquivo_url?: string | null;
  arquivo_nome?: string | null;
}

export function usePrestacaoContas() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["relatorios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("relatorios")
        .select("*")
        .order("ano", { ascending: false })
        .order("mes", { ascending: false });

      if (error) throw error;
      return data as RelatorioDb[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, ...relatorio }: CreateRelatorioData & { id?: string }) => {
      const payload = { ...relatorio, atualizado_em: new Date().toLocaleDateString("pt-BR") };
      if (id) {
        const { error } = await supabase.from("relatorios").update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("relatorios").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relatorios"] });
      toast({ title: "Relatório salvo com sucesso!" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Erro ao salvar relatório", description: error.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("relatorios").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relatorios"] });
      toast({ title: "Relatório excluído." });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Erro ao excluir relatório", description: error.message });
    },
  });

  async function uploadArquivo(file: File): Promise<{ url: string; nome: string }> {
    const nomeArquivo = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("relatorios-arquivos").upload(nomeArquivo, file);
    if (error) throw error;
    const { data } = supabase.storage.from("relatorios-arquivos").getPublicUrl(nomeArquivo);
    return { url: data.publicUrl, nome: file.name };
  }

  return {
    relatorios: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    saveRelatorio: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    deleteRelatorio: deleteMutation.mutate,
    uploadArquivo,
  };
}
