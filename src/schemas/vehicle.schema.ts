import { z } from 'zod';

export const createVehicleSchema = z.object({
    name: z.string({ required_error: "Nome é obrigatório." }).min(3, "Nome deve ter no mínimo 3 caracteres."),
    plateNumber: z.string({ required_error: "Placa é obrigatória." }).length(7, "Placa deve ter exatamente 7 caracteres."),
    year: z.number({ required_error: "Ano é obrigatório." }).int().min(1900, "Ano deve ser maior que 1900").max(new Date().getFullYear() + 1, "Ano não pode ser maior que o próximo ano"),
    type: z.enum(["CARRO", "MOTO", "CAMINHAO", "ONIBUS", "VAN"], {
        required_error: "Tipo é obrigatório.",
        invalid_type_error: "Tipo deve ser um dos seguintes: CARRO, MOTO, CAMINHAO, ONIBUS, VAN",
    }),
    color: z.string({ required_error: "Cor é obrigatória." }).min(3, "Cor deve ter no mínimo 3 caracteres.").optional()
});

export const updateVehicleSchema = createVehicleSchema.partial();

export const createVehicleWithUserSchema = createVehicleSchema.extend({
    userId: z.string({ required_error: "ID do usuário é obrigatório." })
});

export const updateVehicleStatusSchema = z.object({
    status: z.enum(["ATIVO", "INATIVO"], {
        required_error: "Status é obrigatório.",
        invalid_type_error: "Status deve ser ATIVO ou INATIVO",
    })
});

export type CreateVehicleData = z.infer<typeof createVehicleWithUserSchema>;
export type UpdateVehicleData = z.infer<typeof updateVehicleSchema>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleStatusData = z.infer<typeof updateVehicleStatusSchema>;