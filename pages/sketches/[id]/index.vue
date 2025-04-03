<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useRoute} from "#vue-router";
import {characterColumns} from "~/components/columns.vue";
import {characterSchema} from "~/components/schema";

const router = useRouter(); // Initialize Vue Router

const route = useRoute();
const sketchId = route.params.id;

const sketch = ref(null)

const getSketch= async () => {
  sketch.value = await $fetch(`/api/sketches/${sketchId}`)
}

const characters = ref([])

const getCharacters = async () => {
  characters.value = await $fetch(`/api/sketches/${sketchId}/characters`)
}

const charactersTableRef = ref(null);

async function onCharacterAdded(data, other) {

  const resp = await $fetch(`/api/characters/${data.response.id}/add-to-sketch`,
      {
        method: 'POST',
        body: {
          sketchId: sketch.value.id
        }
      })

  if (charactersTableRef.value) {
    await charactersTableRef.value.fetchData();
  }

}

const nodes = ref([]);
const edges = ref([]);

function prepareNodesAndEdges() {
  nodes.value = []
  edges.value = []
  mapSketch()
  mapCharacters()
  if(filters.value.includeRelationships) {
    mapRelationships()
  }
}

function mapSketch() {
  if(!sketch.value) return;
  nodes.value.push({
    data: {
      id: `sketch${sketch.value.id}`,
      label: sketch.value.name,
      type: 'sketch-node',
    }
  })
}

function mapCharacters() {
  if(!characters.value) return;
  characters.value.forEach(character => {
    nodes.value.push({
      data: {
        id: `character${character.id}`,
        label: character.name,
        type: 'character-node',
      }
    })

    nodes.value.push({
      data: {
        id: `actor${character.actor.id}`,
        label: character.actor.name,
        type: 'actor-node',
      }
    })

    edges.value.push({
      data: {
        id: `actor${character.actor.id}-character${character.id}`,
        target: `character${character.id}`,
        source: `actor${character.actor.id}`,
        type: 'actor-character-edge',
      }
    })

    edges.value.push({
      data: {
        id: `character${character.id}-sketch${sketch.value.id}`,
        target: `sketch${sketch.value.id}`,
        source: `character${character.id}`,
        type: 'character-sketch-edge',
      }
    })
  })
}



function mapRelationships() {
  if(!characters.value) return;
  characters.value.forEach(character => {
    if(character.toConnection?.length > 0){
      character.toConnection.forEach(connection => {
        if(!nodes.value.find(n => n.data.id === `character${connection.sourceCharacterId}`)){
         if(!filters.value.includeOtherCharacters) return

          nodes.value.push({
            data: {
              id: `character${connection.sourceCharacterId}`,
              label: connection.source.name,
              type: 'character-node',
            }
          })
        }

        edges.value.push({
          data: {
            id: `character${connection.sourceCharacterId}-character${character.id}`,
            target: `character${character.id}`,
            source: `character${connection.sourceCharacterId}`,
            type: 'character-connection-edge',
            connectionType: connection.connectionType,
          }
        })
      })
    }

    if(character.fromConnection?.length > 0){
      character.fromConnection.forEach(connection => {
        if(!nodes.value.find(n => n.data.id === `character${connection.targetCharacterId}`)){
          if(!filters.value.includeOtherCharacters) return

          nodes.value.push({
            data: {
              id: `character${connection.targetCharacterId}`,
              label: connection.target.name,
              type: 'character-node',
            }
          })
        }
        edges.value.push({
          data: {
            id: `character${character.id}-character${connection.targetCharacterId}`,
            target: `character${connection.targetCharacterId}`,
            source: `character${character.id}`,
            type: 'character-connection-edge',
            connectionType: connection.connectionType
          }
        })
      })
    }
  })
}

onMounted(async () => {
  await getSketch()
  await getCharacters()
  prepareNodesAndEdges()
})

const filters = ref({
  includeRelationships: true,
  includeOtherCharacters: true,
})
const checkboxes = ref([
  { key: 'includeRelationships', default: true, label: 'Include Relationships', value: filters.value.includeRelationships },
  { key: 'includeOtherCharacters', default: true, label: 'Include Other Characters', value: filters.value.includeOtherCharacters },
]);


function onCheckboxUpdate(key) {
  filters.value[key] = !filters.value[key];
  const checkbox = checkboxes.value.find(cb => cb.key === key);
  if (checkbox) {
    checkbox.value = filters.value[key];
  }
  prepareNodesAndEdges()
}

</script>

<template>

  <div>
    <h1 class="text-2xl font-bold" v-if="sketch">  {{sketch.name}}</h1>
    <div class="table-header flex items-center justify-between">
      <h1 class="text-xl"> Characters </h1>

      <AddEntityModal
          title="Add Character"
          post-url="/api/characters"
          :schema="characterSchema"
          :default-state="{ name: '', avatarUrl: '', actorId: 0 }"
          :additional-fields-api="{ actorId: '/api/actors' }"
          @submitted="onCharacterAdded"
      />

    </div>
    <DisplayTable
        :columns="characterColumns"
        rowPath="/characters"
        :row-data="characters"
        ref="charactersTableRef"
    />
    <StandardDiagram :nodes="nodes" :edges="edges" @updateCheckbox="onCheckboxUpdate" :checkboxes="checkboxes"/>
  </div>
</template>