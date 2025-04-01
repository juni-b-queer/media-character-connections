<script >

export const sketchesColumns = [
  {
    accessorKey: 'episode',
    header: 'Episode in season',
    cell: (row) => {
      return `S${row.row.original.episode.seasonId}E${row.row.original.episode.episodeNumberInSeason}`
    },
  },
  {
    accessorKey: 'sketchNumberInEpisode',
    header: 'Sketch Number In Episode',
    cell: (row) => row.getValue('sketchNumberInEpisode'),
  },
  {
    accessorKey: 'runtime',
    header: 'Runtime',
    cell: (row) => `${parseInt(row.getValue('runtime')/60)}:${row.getValue('runtime')%60}`,
  }
]

export const writersColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) => row.getValue('name'),
  }
]

</script>
