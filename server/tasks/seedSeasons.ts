import {Episode, eq, tables, useDrizzle} from "~/server/utils/drizzle";
import {integer} from "drizzle-orm/pg-core";

export default defineTask({
    meta: {
        name: 'db:seed',
        description: 'Run database seed task'
    },
    async run() {
        console.log('Running DB seed task...')
        const seasonData = [
            {releaseYear: 2019, seasonNum:1, episodeTitles: [
                "Has This Ever Happened to You?",
                    "Thanks for Thinking They Are Cool",
                    "It's the Cigars You Smoke That Are Going to Give You Cancer",
                    "Oh Crap, a Bunch More Bad Stuff Just Happened",
                    "I'm Wearing One of Their Belts Right Now",
                    "We Used to Watch This at My Old Work"
                ]},
            {releaseYear: 2021, seasonNum:2,episodeTitles: [
                    "They said that to me at a dinner.",
                    "They have a cake shop there Susan where the cakes just look stunning.",
                    "You sure about that? You sure about that that's why?",
                    "Everyone just needs to be more in the moment.",
                    "Didn't you say there was gonna be five people at this table?",
                    "I need a wet paper towel"
                ]},
            {releaseYear: 2023,seasonNum:3, episodeTitles: [
                "THAT WAS THE EARTH TELLING ME I'M SUPPOSED TO DO SOMETHING GREAT.",
                    "I CAN DO WHATEVER I WANT.",
                    "CUT TO: WE'RE CHATTING ABOUT THIS AT YOUR BACHELOR PARTY.",
                    "SO NOW EVERY TIME I'M ABOUT TO DO SOMETHING I REALLY WANT TO DO, I ASK MYSELF, \"WAIT A MINUTE, WHAT IS THIS?\"",
                    "DON'T JUST SAY \"RELAX,\" ACTUALLY RELAX.",
                    "WHEN I FIRST THOUGHT OF THIS YOU DIDN'T EVEN HAVE HANDS UP THERE — YOU WERE JUST WALKING STRAIGHT UP THE WALL."]},
        ]
        const db = useDrizzle();
        let epNumber = 1;
        for (const season of seasonData) {
            const seasonVals = {
                releaseYear: season.releaseYear,
                seasonNumber: season.seasonNum,
            }

            await db.insert(tables.season).values(seasonVals)
            const savedSeason = await db.select().from(tables.season).where(
                eq(tables.season.releaseYear, seasonVals.releaseYear)
            ).limit(1)
            let seasonEpNumber = 1;

            for( const epTitle of season.episodeTitles){
                const episodeVals: Episode = {
                    seasonId: savedSeason[0].id,
                    title: epTitle,
                    episodeNumber: epNumber,
                    episodeNumberInSeason: seasonEpNumber,
                }
                await db.insert(tables.episode).values(episodeVals)
                seasonEpNumber++;
                epNumber++;
            }
        }
        return {result: 'success'}
    }
})
