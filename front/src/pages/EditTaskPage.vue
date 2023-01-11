<template>
  <div class="column window-height">
    <div class="row justify-between q-px-lg q-py-md">
      <q-btn class="text-grey-7 bg-grey-3 justify-center items-center row q-px-sm" flat size="sm"
        @click="$router.back()">
        <q-icon class="text-grey-7" name="arrow_back" />
      </q-btn>
      <q-space />
      <q-btn @click="$router.push(`/`)" class="text-grey-7" dense flat size="md" label="Annuler" />
    </div>
    <div class="q-px-lg">
      <h1 class="text-h4 text-weight-bold">Modifier une tache</h1>
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Nom de la tache</h1>
      <q-input outlined v-model="title" />
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Description</h1>
      <q-input :placeholder="task.description" outlined v-model="desc" type="textarea" />
    </div>
    <div class="row q-px-lg q-py-md q-mt-auto">
      <q-btn label="Modifier" size="lg" class="full-width add_btn" @click="$router.push(`/task/new`)" />
    </div>
  </div>
</template>

<script setup>
import { getTask } from 'services/tasks'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const title = ref('')
const desc = ref('')
const route = useRoute()
const task = ref({});

(async () => {
  const { data } = await getTask(route.params.id)
  const newTask = data
  task.value = newTask
  title.value = newTask.title
  desc.value = newTask.description
  console.log(task.value)
})()

</script>
