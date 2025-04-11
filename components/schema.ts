import * as z from "zod";

export const actorSchema = z.object({
    name: z.string(),
    avatarUrl: z.string().optional(),
})

export type ActorSchema = z.output<typeof actorSchema>

export const actorFormConfig = {
    fields: [
        {fieldKey: 'name', label: 'Name', type: 'text'},
        {fieldKey: 'avatarUrl', label: 'Avatar', type: 'text'},
    ]
}


export const writerSchema = z.object({
    name: z.string(),
    avatarUrl: z.string().optional(),
})

export type WriterSchema = z.output<typeof writerSchema>

export const writerFormConfig = {
    fields: [
        {fieldKey: 'name', label: 'Name', type: 'text'},
        {fieldKey: 'avatarUrl', label: 'Avatar', type: 'text'},
    ]
}



export const characterSchema = z.object({
    name: z.string(),
    creditedName: z.string().optional(),
    avatarUrl: z.string().optional(),
    actorId: z.number(),
})

export type CharacterSchema = z.output<typeof characterSchema>

export const characterFormConfig = {
    fields: [
        {fieldKey: 'name', label: 'Name', type: 'text'},
        {fieldKey: 'creditedName', label: 'Credited Name', type: 'text'},
        {fieldKey: 'actorId', label: 'Actor', type: 'api-select', apiEndpoint: '/api/actors'},
        {fieldKey: 'avatarUrl', label: 'Avatar', type: 'text'},
    ]
}

export const characterConnectionSchema = z.object({
    connectionType: z.string(),
    sketchId: z.number(),
    targetCharacterId: z.number(),
    sourceCharacterId: z.number()
})


export type CharacterConnectionSchema = z.output<typeof characterConnectionSchema>

export const characterConnectionFormConfig = {
    fields: [
        {fieldKey: 'connectionType', label: 'Connection Type', type: 'text'},
        {fieldKey: 'sketchId', label: 'Sketch', type: 'api-select', apiEndpoint: '/api/sketches'},
        {fieldKey: 'targetCharacterId', label: 'Target Character', type: 'api-select', apiEndpoint: '/api/characters'},
        {fieldKey: 'sourceCharacterId', label: 'Source Character', type: 'api-select', apiEndpoint: '/api/characters'},
    ]
}


export const sketchSchema = z.object({
    episodeId: z.number(),
    runtime: z.number().optional(),
    sketchNumberInEpisode: z.number().optional(),
    name: z.string(),
    location: z.string().optional(),
})

export type SketchSchema = z.output<typeof sketchSchema>

export const sketchFormConfig = {
    fields: [
        {fieldKey: 'episodeId', label: 'Episode', type: 'api-select', apiEndpoint: '/api/episodes'},
        {fieldKey: 'runtime', label: 'Runtime', type: 'number'},
        {fieldKey: 'sketchNumberInEpisode', label: 'Sketch Number in Episode', type: 'number'},
        {fieldKey: 'name', label: 'Name', type: 'text'},
        {fieldKey: 'location', label: 'Location', type: 'text'},
    ]
}


export const noteSchema = z.object({
    notableType: z.string(),
    notableId: z.number(),
    note: z.string()
})

export type NoteSchema = z.output<typeof noteSchema>

export const noteColumns = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (row) => {
            return `${row.getValue('id')}`
        },
    },
    {
        accessorKey: 'note',
        header: 'Note',
        cell: (row) => row.getValue('note'),
    },
]

export const noteFormConfig = {
    fields: [
        {fieldKey: 'notableType', label: 'Notable Type', type: 'text'},
        {fieldKey: 'notableId', label: 'Notable ID', type: 'number'},
        {fieldKey: 'note', label: 'Note', type: 'text'},
    ]
}
