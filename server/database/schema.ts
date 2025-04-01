import {
    boolean,
    integer,
    pgTable,
    varchar,
    serial, primaryKey
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
    episodeId: integer().notNull().references(() => episode.id),
    sketchNumberInEpisode: integer().notNull(),
    runtime: integer().notNull()
})

export const writer = pgTable('writers_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).unique(),
})

export const actor = pgTable('actors_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).unique(),
})

export const character = pgTable('characters_table', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).unique(),
    actorId: integer().notNull().references(() => actor.id),
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
}))

export const characterRelations = relations(character, ({ one, many }) => ({
    actor: one(actor, {
        fields: [character.actorId],
        references: [actor.id],
    }),
    characterToSketch: many(characterToSketch),
}))

export const actorRelations = relations(actor, ({ many }) => ({
    characters: many(character),
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