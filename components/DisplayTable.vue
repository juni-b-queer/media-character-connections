<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import type {TableColumn} from "#ui/components/Table.vue"; // Import Vue Router

// State for props and data
const props = defineProps({
  data: {
    type: Array
  },
  columns: {
    type: Array
  },
  dataPath: {
    type: String
  },
  rowPath: {
    type: String
  },
  header: {
    type: String,
  },
  canAdd: {
    type: Boolean,
    default: false
  }
})

const data = ref(props.data);
const columns = ref(props.columns);
const loading = ref(true);
const error = ref(null);

const router = useRouter(); // Initialize Vue Router

const selectHandler = (row, e) => {
  if(props.rowPath === undefined) return;
  router.push(`${props.rowPath}/${row.original.id}`); // Navigate to the appropriate season page

}

const fetchData = async () => {
  try {
    const response = await useFetch(props.dataPath);
// console.log(response.data.value)
    data.value = response.data.value; // Assign the fetched data
  } catch (err) {
    error.value = err.message || 'Failed to load seasons';
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  if(props.dataPath){
    fetchData();
  }

})

defineExpose({
  fetchData
});
</script>
<template>
  <div>
<!--    <div class="table-header flex items-center justify-between" >-->
<!--      <h1 class="text-xl font-bold"> {{header}} </h1>-->
<!--      <button v-if="canAdd" @click="addHandler">-->
<!--        <UIcon name="i-lucide-badge-plus" size="1.5rem" class="cursor-pointer" />-->
<!--      </button>-->
<!--    </div>-->
    <UCard>
      <UTable
          :data="data"
          class="flex-1"
          :columns="columns"
          @select="selectHandler"
          loading
          loading-animation="swing"
          loading-color="pink"
      />
    </UCard>

  </div>
</template>
