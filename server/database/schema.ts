import {
    integer,
    pgTable,
    varchar,
    serial, primaryKey, text, date, json
} from 'drizzle-orm/pg-core' // Use pg-core instead of mysql-core
import { relations } from 'drizzle-orm'

// Update table definitions
export const season = pgTable('seasons_table', {
    id: serial('id').primaryKey(),
    seasonNumber: integer(),
    releaseYear: integer(),
})

export const episode = pgTable('episodes_table', {
    id: serial('id').primaryKey(),
    seasonId: integer().notNull().references(() => season.id),
    title: varchar({ length: 255 }),
    episodeNumber: integer().notNull(),
    episodeNumberInSeason: integer().notNull(),
})

export const sketch = pgTable('sketches_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    episodeId: integer().notNull().references(() => episode.id),
    sketchNumberInEpisode: integer(),
    runtime: integer(),
    location: text(),

})

export const writer = pgTable('writers_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
    avatarUrl: varchar({ length: 255 }),
})

export const actor = pgTable('actors_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
    avatarUrl: varchar({ length: 255 }),
})

export const character = pgTable('characters_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    creditedName: varchar({ length: 255 }),
    actorId: integer().references(() => actor.id),
    avatarUrl: varchar({ length: 255 }),
})

export const characterConnection = pgTable('character_connections_table', {
    id: serial('id').primaryKey(),
    connectionType: varchar({ length: 255 }).notNull(),
    targetCharacterId: integer().notNull().references(() => character.id),
    sourceCharacterId: integer().notNull().references(() => character.id),
    sketchId: integer().notNull().references(() => sketch.id),
})

export const note = pgTable('notes_table', {
    id: serial('id').primaryKey(),
    notableType: varchar({ length: 255 }).notNull(),
    notableId: integer().notNull(),
    note: text(),
})

export const visualizerView = pgTable('visualizer_views_table', {
    id: serial('id').primaryKey(),
    timestamp: date().notNull(),
    viewData: json().notNull(),
})


// Many to Many lookup tables
export const writerToEpisode = pgTable('writers_to_episodes_table', {
    writerId: integer().notNull().references(() => writer.id),
    episodeId: integer().notNull().references(() => episode.id),
}, (t) => [
    primaryKey({ columns: [t.writerId, t.episodeId] })
])

export const characterToSketch = pgTable('characters_to_sketches_table', {
    characterId: integer().notNull().references(() => character.id),
    sketchId: integer().notNull().references(() => sketch.id),
    note: text(),
}, (t) => [
    primaryKey({ columns: [t.characterId, t.sketchId] })
])



// Relations
export const seasonRelations = relations(season, ({ many }) => ({
    episodes: many(episode),
}))

export const episodeRelations = relations(episode, ({ one, many }) => ({
    season: one(season, {
        fields: [episode.seasonId],
        references: [season.id],
    }),
    sketches: many(sketch),
    writerToEpisode: many(writerToEpisode),
}))

export const writerRelations = relations(writer, ({ many }) => ({
    writerToEpisode: many(writerToEpisode),
}))

export const sketchRelations = relations(sketch, ({ one, many }) => ({
    episode: one(episode, {
        fields: [sketch.episodeId],
        references: [episode.id],
    }),
    characterToSketch: many(characterToSketch),
    characterConnection: many(characterConnection),
}))

export const characterRelations = relations(character, ({ one, many }) => ({
    actor: one(actor, {
        fields: [character.actorId],
        references: [actor.id],
    }),
    characterToSketch: many(characterToSketch),
    toConnection: many(characterConnection, {relationName: "toConnection"}),
    fromConnection: many(characterConnection, {relationName: "fromConnection"}),

}))

export const actorRelations = relations(actor, ({ many }) => ({
    characters: many(character),
}))

export const characterConnectionRelations = relations(characterConnection, ({ one }) => ({
    target: one(character, {
        fields: [characterConnection.targetCharacterId],
        references: [character.id],
        relationName: "toConnection"
    }),
    source: one(character, {
        fields: [characterConnection.sourceCharacterId],
        references: [character.id],
        relationName: "fromConnection"
    }),
    sketch: one(sketch, {
        fields: [characterConnection.sketchId],
        references: [sketch.id],
    }),
}))

// Many to Many relations
export const writerToEpisodeRelations = relations(writerToEpisode, ({ one }) => ({
    writer: one(writer, {
        fields: [writerToEpisode.writerId],
        references: [writer.id],
    }),
    episode: one(episode, {
        fields: [writerToEpisode.episodeId],
        references: [episode.id],
    }),
}));

export const characterToSketchRelations = relations(characterToSketch, ({ one }) => ({
    character: one(character, {
        fields: [characterToSketch.characterId],
        references: [character.id],
    }),
    sketch: one(sketch, {
        fields: [characterToSketch.sketchId],
        references: [sketch.id],
    }),
}));