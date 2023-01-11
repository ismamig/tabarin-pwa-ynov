<template>
  <q-card class="my-card text-black q-my-xl">
    <q-card-section class="card-header row justify-between">
      <div class="text-h6">{{ title }}</div>
      <q-btn class="text-grey-7" dense flat round icon="more_horiz" />
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      <div v-for="(task, index) in tasks" :key="index">
        <q-checkbox v-model="task.done" :label="task.title" @click="checkTask(task)" />
      </div>
    </q-card-section>
    <q-card-section v-if=" tasks.length === 0" class="text-black text-weight-medium q-px-xl">
      Cette liste ne contient aucune tâches ajoutez en une depuis la liste
    </q-card-section>
    <q-separator />
    <q-card-actions class="justify-center">
      <q-btn flat label="Voir la liste complète" @click="$router.push(`/lists/${id}`)" />
    </q-card-actions>
  </q-card>
</template>

<style>
.card-header {
  background: #F2F2F2;
}
</style>

<script setup>

import { updateTask } from 'src/services/tasks'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true,
    default: () => []
  }
})

const router = useRouter()

const id = ref(props.id)

const title = ref(props.title)

const tasks = ref(props.tasks)

const checkTask = async (task) => {
  const data = { list: task.list, title: task.title, description: task.description, done: task.done }
  const res = await updateTask(data, task._id)
  console.log(res)
  router.go()
}

</script>
