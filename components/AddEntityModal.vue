<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import * as z from "zod";

// Props for customization
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  postUrl: {
    type: String,
    required: true,
  },
  schema: {
    type: Object,
    required: true, // Expecting a Zod schema object
  },
  defaultState: {
    type: Object,
    required: true, // Expecting an object for the default blank state
  },
  additionalFieldsApi: {
    type: Object,
    required: false, // Optional object defining dynamic fields and their API
  },
});

const emit = defineEmits(['submitted']);


const savedDefault = ref(props.defaultState);

// Modal title and endpoint
const title = ref(props.title);
const postUrl = ref(props.postUrl);
const externalApiConfig = ref(props.additionalFieldsApi || null);

// Form state and schema
const formSchema = computed(() => props.schema);
const formState = reactive({ ...props.defaultState });
const addFormOpen = ref(false);

// Dynamic options loader for additional fields (e.g., actor list)
const dynamicOptions = reactive({});
const fetchStatuses = reactive({});

if (externalApiConfig.value) {
  // Fetch data for each additional field's API
  for (const [fieldName, apiEndpoint] of Object.entries(externalApiConfig.value)) {
    fetchStatuses[fieldName] = "pending";
    $fetch(apiEndpoint)
        .then((data) => {
          dynamicOptions[fieldName] = data.map((item: any) => ({
            label: item.name ?? item.title,
            value: item.id,
          }));
          fetchStatuses[fieldName] = "success";
        })
        .catch((e) => {
          console.log(e)
          fetchStatuses[fieldName] = "error";
        });
  }
}

// Handle form submission
async function onFormSubmit() {
  const respose = await $fetch(postUrl.value, {
    method: 'POST',
    body: formState,
  });

  // Reset modal state upon submission
  Object.keys(formState).forEach((key) => {
    formState[key] = props.defaultState[key] ?? null;
  });
  emit('submitted', {form: formState, response: respose});


  addFormOpen.value = false;
}
</script>

<template>
  <UModal :title="title" v-model:open="addFormOpen">
    <UButton>
      <UIcon name="i-lucide-badge-plus" size="1.5rem" class="cursor-pointer" />
    </UButton>
    <template #body>
      <UForm :schema="formSchema" :state="formState" class="space-y-4">
        <!-- Loop through schema keys to auto-generate form fields -->
        <template v-for="(type, key) in formSchema.shape" :key="key">
          <UFormField v-if="props.defaultState[key] === 0 || props.defaultState[key] === '' || props.defaultState[key] === undefined" :label="key[0].toUpperCase() + key.slice(1)" :name="key">
            <!-- Render based on type -->
            <template v-if="key in dynamicOptions">
              <USelect
                  :items="dynamicOptions[key]"
                  :loading="fetchStatuses[key] === 'pending'"
                  v-model="formState[key]"
                  placeholder="Select an option"
                  class="max-w-xs w-full"
              >

              </USelect>
            </template>
            <template v-else-if="typeof props.defaultState[key] === 'string'">
              <UInput v-model="formState[key]" />
            </template>
            <template v-else-if="typeof props.defaultState[key] === 'number' && props.defaultState[key] === 0">
              <UInput type="number" v-model="formState[key]" />
            </template>
            <!-- Add other types as needed -->
          </UFormField>
        </template>

        <!-- Submit button -->
        <UButton @click="onFormSubmit">Add</UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>

</style>