<script>
export const seasonsColumns = [
  {
    accessorKey: 'id',
    header: 'Season #',
  },
  {
    accessorKey: 'releaseYear',
    header: 'Release Year',
  }
]

export const sketchesColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) =>  row.getValue('name'),
  },
  {
    accessorKey: 'location',
    header: 'Sketch Location',
    cell: (row) => row.getValue('location'),
  },
  {
    accessorKey: 'runtime',
    header: 'Runtime',
    cell: (row) => `${parseInt(row.getValue('runtime')/60)}:${row.getValue('runtime')%60}`,
  }
]

export const writerColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) => row.getValue('name'),
  },
  {
    accessorKey: 'avatarUrl',
    header: 'Picture',
    cell: (row) => row.getValue('avatarUrl') ?? '',
  }
]

export const actorColumns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (row) => row.getValue('name'),
  },
  {
    accessorKey: 'avatarUrl',
    header: 'Picture',
    cell: (row) => row.getValue('avatarUrl') ?? '',
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
    cell: (row) => row.getValue('actor')?.name ?? '',
  },
  {
    accessorKey: 'avatarUrl',
    header: 'Picture',
    cell: (row) => row.getValue('avatarUrl') ?? '',
  },
  {
    accessorKey: 'characterToSketch',
    header: 'Sketches',
    cell: (row) => {
      return row.getValue('characterToSketch').length ?? ''
    },
  },
]



export const characterConnectionColumns = [

  {
    accessorKey: 'source',
    header: 'Source',
    cell: (row) => row.getValue('source').name,
  },
  {
    accessorKey: 'connectionType',
    header: 'Type',
    cell: (row) => {
      return `${row.getValue('connectionType')}`
    },
  },
  {
    accessorKey: 'target',
    header: 'Target',
    cell: (row) => row.getValue('target').name,
  },
  {
    accessorKey: 'sketch',
    header: 'Sketch',
    cell: (row) => {
      return row.getValue('sketch').name
    },
  },
]
</script>