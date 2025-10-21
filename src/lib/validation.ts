import { z } from "zod";

/**
 * Schemas de validação para formulários críticos
 * Segue as melhores práticas de segurança
 */

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .max(72, { message: "Senha deve ter no máximo 72 caracteres" })
});

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .max(72, { message: "Senha deve ter no máximo 72 caracteres" })
    .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "Senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
});

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" })
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  age: z
    .number()
    .int({ message: "Idade deve ser um número inteiro" })
    .min(1, { message: "Idade deve ser maior que 0" })
    .max(150, { message: "Idade inválida" }),
  role: z.enum(["pai", "mae", "filho"], { message: "Papel inválido" }),
  difficulty: z.enum(["facil", "medio", "dificil"], { message: "Dificuldade inválida" }),
  bible_version: z.string()
});

export const noteSchema = z.object({
  notes: z
    .string()
    .trim()
    .max(10000, { message: "Anotação deve ter no máximo 10000 caracteres" })
});

export const suggestionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Título deve ter no mínimo 3 caracteres" })
    .max(200, { message: "Título deve ter no máximo 200 caracteres" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Descrição deve ter no mínimo 10 caracteres" })
    .max(2000, { message: "Descrição deve ter no máximo 2000 caracteres" }),
  module: z
    .string()
    .trim()
    .min(2, { message: "Módulo é obrigatório" })
    .max(100, { message: "Módulo deve ter no máximo 100 caracteres" })
});
