<script >

export const sketchesColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) =>  row.getValue('name'),
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

export const characterColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) => {
      return `${row.getValue('name')}`
    },
  },
  {
    accessorKey: 'actor',
    header: 'Actor',
    cell: (row) => row.getValue('actor'),
  }
]

</script>
