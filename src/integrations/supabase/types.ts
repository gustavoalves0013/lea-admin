export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      atividade_participantes: {
        Row: {
          atividade_id: string
          beneficiario_id: string
          created_at: string
          id: string
          presente: boolean | null
        }
        Insert: {
          atividade_id: string
          beneficiario_id: string
          created_at?: string
          id?: string
          presente?: boolean | null
        }
        Update: {
          atividade_id?: string
          beneficiario_id?: string
          created_at?: string
          id?: string
          presente?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "atividade_participantes_atividade_id_fkey"
            columns: ["atividade_id"]
            isOneToOne: false
            referencedRelation: "atividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atividade_participantes_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
        ]
      }
      atividades: {
        Row: {
          created_at: string
          data: string
          descricao: string | null
          horario: string
          id: string
          local: string | null
          responsavel: string | null
          status: string
          titulo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data: string
          descricao?: string | null
          horario: string
          id?: string
          local?: string | null
          responsavel?: string | null
          status?: string
          titulo: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string
          descricao?: string | null
          horario?: string
          id?: string
          local?: string | null
          responsavel?: string | null
          status?: string
          titulo?: string
          user_id?: string
        }
        Relationships: []
      }
      beneficiarios: {
        Row: {
          cpf_rg: string | null
          created_at: string
          data_entrada: string
          data_nascimento: string
          endereco: string | null
          foto_url: string | null
          id: string
          nome_completo: string
          nome_responsavel: string | null
          status: string
          telefone_contato: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cpf_rg?: string | null
          created_at?: string
          data_entrada?: string
          data_nascimento: string
          endereco?: string | null
          foto_url?: string | null
          id?: string
          nome_completo: string
          nome_responsavel?: string | null
          status?: string
          telefone_contato?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cpf_rg?: string | null
          created_at?: string
          data_entrada?: string
          data_nascimento?: string
          endereco?: string | null
          foto_url?: string | null
          id?: string
          nome_completo?: string
          nome_responsavel?: string | null
          status?: string
          telefone_contato?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      medicamentos: {
        Row: {
          beneficiario_id: string
          created_at: string
          dosagem: string
          horario: string
          id: string
          nome: string
        }
        Insert: {
          beneficiario_id: string
          created_at?: string
          dosagem: string
          horario: string
          id?: string
          nome: string
        }
        Update: {
          beneficiario_id?: string
          created_at?: string
          dosagem?: string
          horario?: string
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "medicamentos_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias: {
        Row: {
          beneficiario_id: string
          created_at: string
          data: string
          descricao: string
          id: string
          medicamento_administrado: string | null
          tipo: string
        }
        Insert: {
          beneficiario_id: string
          created_at?: string
          data: string
          descricao: string
          id?: string
          medicamento_administrado?: string | null
          tipo: string
        }
        Update: {
          beneficiario_id?: string
          created_at?: string
          data?: string
          descricao?: string
          id?: string
          medicamento_administrado?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          beneficiario_id: string
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          descricao: string | null
          id: string
          status: string
          user_id: string
          valor: number
        }
        Insert: {
          beneficiario_id: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          descricao?: string | null
          id?: string
          status?: string
          user_id: string
          valor: number
        }
        Update: {
          beneficiario_id?: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string | null
          id?: string
          status?: string
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
        ]
      }
      relatorios: {
        Row: {
          ano: string
          arquivo_nome: string | null
          arquivo_url: string | null
          atendimentos: string | null
          atualizado_em: string | null
          created_at: string
          descricao: string | null
          despesas: string | null
          id: string
          mes: string
          receitas: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          ano: string
          arquivo_nome?: string | null
          arquivo_url?: string | null
          atendimentos?: string | null
          atualizado_em?: string | null
          created_at?: string
          descricao?: string | null
          despesas?: string | null
          id?: string
          mes: string
          receitas?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          ano?: string
          arquivo_nome?: string | null
          arquivo_url?: string | null
          atendimentos?: string | null
          atualizado_em?: string | null
          created_at?: string
          descricao?: string | null
          despesas?: string | null
          id?: string
          mes?: string
          receitas?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
