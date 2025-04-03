import * as z from "zod";

export const actorSchema = z.object({
    name: z.string(),
    avatarUrl: z.string().optional(),
})

export type ActorSchema = z.output<typeof actorSchema>

export const writerSchema = z.object({
    name: z.string(),
    avatarUrl: z.string().optional(),
})

export type WriterSchema = z.output<typeof writerSchema>

export const characterSchema = z.object({
    name: z.string(),
    avatarUrl: z.string().optional(),
    actorId: z.number(),
})

export type CharacterSchema = z.output<typeof characterSchema>

export const characterConnectionSchema = z.object({
    connectionType: z.string(),
    sketchId: z.number(),
    targetCharacterId: z.number(),
    sourceCharacterId: z.number()
})

export type CharacterConnectionSchema = z.output<typeof characterConnectionSchema>


export const sketchSchema = z.object({
    episodeId: z.number(),
    runtime: z.number(),
    sketchNumberInEpisode: z.number(),
    name: z.string()
})

export type SketchSchema = z.output<typeof sketchSchema>

