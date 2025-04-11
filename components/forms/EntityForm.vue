<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EntityForm",
  emits: ['submitted', 'mounted'],
  props: {
    title: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    validationSchema: {
      type: Object,
      required: true,
    },
    formConfig: {
      type: Object,
      required: true,
    },
    entityId: {
      type: Number,
      required: true,
    },
    additionalFieldsApi: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      entityState: {},
      formState: {},
      dynamicOptions: {},
      fetchStatuses: {},
      entityReady: false,
    }
  },
  methods: {
    async fetchEntity() {
      this.entityState = await $fetch(`${this.apiUrl}/${this.entityId}`)
      for (const field of this.formConfig.fields) {
        this.formState[field.fieldKey] = this.entityState[field.fieldKey]
        if (field.type === 'api-select') {
          this.fetchStatuses[field.fieldKey] = "pending";
          const fieldOptions = await $fetch(field.apiEndpoint)
          this.dynamicOptions[field.fieldKey] = fieldOptions.map((item: any) => ({
            label: item.name ?? item.title,
            value: item.id,
          }));
          this.fetchStatuses[field.fieldKey] = "success";
        }
      }
      this.entityReady = true
    },
    async onFormSubmit() {
      const response = await $fetch(`${this.apiUrl}/${this.entityId}`, {
        method: 'PATCH',
        body: this.formState,
      });
      this.entityState = {
        ...this.entityState,
        ...this.formState,
      }

      this.$emit('submitted', {entity: this.entityState, response: response});
      await this.fetchEntity()
    },
    async onCancel() {
      this.$emit('submitted', {entity: this.entityState});
    }
  },
  async mounted() {
    await this.fetchEntity()
    this.$emit('mounted', {entity: this.entityState})
  }
})
</script>

<template>
  <UCard class="w-lg">
    <h2 class="text-xl pb-4">{{ title }}</h2>
    <UForm v-if="entityReady" :schema="validationSchema" :state="formState" class="space-y-4">
      <template v-for="field in formConfig.fields" :key="field.fieldKey">
        <div class="">
          <div>
            {{ field.label }}
          </div>

          <template v-if="field.fieldKey in dynamicOptions">
            <USelect
                :items="dynamicOptions[field.fieldKey]"
                :loading="fetchStatuses[field.fieldKey] === 'pending'"
                v-model="formState[field.fieldKey]"
                placeholder="Select an option"
                class="max-w-xs w-full"
            >

            </USelect>
          </template>
          <template v-else-if="field.type === 'text'">
            <UInput class="max-w-xs w-full" v-model="formState[field.fieldKey]"/>
          </template>

          <template v-else-if="field.type === 'textarea'">
            <UTextarea class="max-w-xs w-full" v-model="formState[field.fieldKey]"/>
          </template>

          <template v-else-if="field.type === 'number'">
            <UInput class="max-w-xs w-50" v-model="formState[field.fieldKey]" type="number"/>
          </template>
        </div>
      </template>

      <UButton @click="onFormSubmit">Update</UButton>
      <UButton @click="onCancel" color="red">Cancel</UButton>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>