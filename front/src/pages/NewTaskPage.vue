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
      <h1 class="text-h4 text-weight-bold">Créer une tache</h1>
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Nom de la tache</h1>
      <q-input outlined v-model="taskTitle"/>
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Description</h1>
      <q-input outlined v-model="taskDesc" type="textarea" />
    </div>
    <div class="row q-px-lg q-py-md q-mt-auto">
      <q-btn label="Créer" size="lg" class="full-width add_btn" @click="submitNewTask()" />
    </div>
  </div>
</template>

<script setup>
import { createTask } from 'src/services/tasks'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const taskTitle = ref('')
const taskDesc = ref('')

console.log(route.params.id)
console.log(router)

async function submitNewTask () {
  console.log(taskTitle.value, taskDesc.value, route.params.id)
  const { data } = await createTask({
    title: taskTitle.value,
    description: taskDesc.value,
    list: route.params.id
  })
  console.log(data)
  router.push(`/lists/${route.params.id}`)
}
</script>
