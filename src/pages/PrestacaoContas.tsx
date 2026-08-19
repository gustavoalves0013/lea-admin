import { useState } from "react";
import { Plus, Loader2, Pencil, Trash2, Paperclip, X } from "lucide-react";
import { usePrestacaoContas, RelatorioDb } from "@/hooks/usePrestacaoContas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MESES = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const vazio = {
  mes: "", ano: String(new Date().getFullYear()), receitas: "", despesas: "",
  atendimentos: "", descricao: "", status: "publicado" as "publicado" | "rascunho",
};

export default function PrestacaoContas() {
  const { relatorios, isLoading, saveRelatorio, isSaving, deleteRelatorio, uploadArquivo } = usePrestacaoContas();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...vazio });
  const [arquivo, setArquivo] = useState<{ url: string; nome: string } | null>(null);
  const [enviandoArquivo, setEnviandoArquivo] = useState(false);
  const [excluirId, setExcluirId] = useState<string | null>(null);

  const abrirNovo = () => {
    setEditId(null);
    setForm({ ...vazio });
    setArquivo(null);
    setIsFormOpen(true);
  };

  const abrirEdicao = (r: RelatorioDb) => {
    setEditId(r.id);
    setForm({
      mes: r.mes, ano: r.ano, receitas: r.receitas || "", despesas: r.despesas || "",
      atendimentos: r.atendimentos || "", descricao: r.descricao || "", status: r.status,
    });
    setArquivo(r.arquivo_url ? { url: r.arquivo_url, nome: r.arquivo_nome || "arquivo" } : null);
    setIsFormOpen(true);
  };

  const handleArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Arquivo muito grande. Máximo 10MB."); return; }
    setEnviandoArquivo(true);
    try {
      const res = await uploadArquivo(file);
      setArquivo(res);
    } catch (err: any) {
      alert("Erro ao enviar arquivo: " + err.message);
    } finally {
      setEnviandoArquivo(false);
    }
  };

  const handleSalvar = () => {
    if (!form.mes || !form.ano) { alert("Informe o mês e o ano."); return; }
    saveRelatorio({
      id: editId || undefined,
      ...form,
      arquivo_url: arquivo?.url ?? null,
      arquivo_nome: arquivo?.nome ?? null,
    });
    setIsFormOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Prestação de Contas</h1>
          <p className="mt-1 text-muted-foreground">
            Relatórios financeiros publicados no site institucional
          </p>
        </div>
        <Button onClick={abrirNovo} className="animate-fade-in [animation-delay:100ms]">
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card animate-fade-in [animation-delay:150ms]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Período</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Receitas</TableHead>
              <TableHead className="text-right">Despesas</TableHead>
              <TableHead className="text-center">Anexo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relatorios.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Nenhum relatório cadastrado ainda.
                </TableCell>
              </TableRow>
            )}
            {relatorios.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{MESES[parseInt(r.mes)] || r.mes} / {r.ano}</TableCell>
                <TableCell>
                  <Badge variant={r.status === "publicado" ? "default" : "secondary"}>
                    {r.status === "publicado" ? "Publicado" : "Rascunho"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{r.receitas ? `R$ ${r.receitas}` : "—"}</TableCell>
                <TableCell className="text-right tabular-nums">{r.despesas ? `R$ ${r.despesas}` : "—"}</TableCell>
                <TableCell className="text-center">
                  {r.arquivo_url ? <Paperclip className="mx-auto h-4 w-4 text-muted-foreground" /> : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => abrirEdicao(r)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setExcluirId(r.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Editar relatório" : "Novo relatório"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Mês</Label>
                <Select value={form.mes} onValueChange={(v) => setForm({ ...form, mes: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {MESES.slice(1).map((m, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Ano</Label>
                <Input type="number" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Receitas (R$)</Label>
                <Input value={form.receitas} onChange={(e) => setForm({ ...form, receitas: e.target.value })} placeholder="0,00" />
              </div>
              <div className="space-y-1.5">
                <Label>Despesas (R$)</Label>
                <Input value={form.despesas} onChange={(e) => setForm({ ...form, despesas: e.target.value })} placeholder="0,00" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Pessoas atendidas no período</Label>
              <Input value={form.atendimentos} onChange={(e) => setForm({ ...form, atendimentos: e.target.value })} placeholder="Ex: 42" />
            </div>
            <div className="space-y-1.5">
              <Label>Descrição / resumo do mês</Label>
              <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Anexo (PDF ou imagem)</Label>
              {arquivo ? (
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                  <Paperclip className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{arquivo.nome}</span>
                  <button type="button" onClick={() => setArquivo(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Input type="file" onChange={handleArquivo} disabled={enviandoArquivo} accept=".pdf,image/*" />
              )}
              {enviandoArquivo && <p className="text-xs text-muted-foreground">Enviando arquivo...</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v: "publicado" | "rascunho") => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="publicado">Publicado (visível no site)</SelectItem>
                  <SelectItem value="rascunho">Rascunho (só a equipe vê)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
              <Button onClick={handleSalvar} disabled={isSaving || enviandoArquivo}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Salvar relatório
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!excluirId} onOpenChange={(open) => !open && setExcluirId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir relatório?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O relatório será removido também do site público.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (excluirId) deleteRelatorio(excluirId); setExcluirId(null); }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
