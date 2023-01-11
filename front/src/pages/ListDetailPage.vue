<template>
  <div class="column window-height">
    <div class="row justify-between q-px-lg q-py-md">
      <q-btn class="text-grey-7 bg-grey-3 justify-center items-center row q-px-sm" flat size="sm"
        @click="$router.push(`/`)">
        <q-icon class="text-grey-7" name="arrow_back" />
      </q-btn>
      <div class="q-ml-md text-h5 text-weight-bold">{{ list.title }}</div>
      <q-space />
      <q-btn class="text-grey-7" dense flat round size="md" icon="more_horiz" @click="open('bottom')" />
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Tasks - </h1>
      <div>
        <div v-for="(task, index) in list.tasks" :key="index">
          <q-checkbox v-if="task.done === false" v-model="task.done" :label="task.title"
            class="task-card q-px-md q-py-sm bg-grey-2 full-width" @click="goToTask(task._id)" />
        </div>
      </div>
    </div>
    <div class="q-px-lg">
      <h1 class="text-h6 text-weight-bold">Tasks completed - </h1>
      <div>
        <div v-for="(task, index) in list.tasks" :key="index">
          <q-checkbox v-if="(task.done === true)" v-model="task.done" :label="task.title"
            class="task-card q-px-md q-py-sm bg-grey-2 full-width" @click="goToTask(task._id)" />
        </div>
      </div>
    </div>
    <div class="row justify-center q-px-lg q-py-md q-mt-auto">
      <q-btn size="lg" round icon="add" class="add_btn" @click="$router.push(`${route.params.id}/task/new`)" />
    </div>
  </div>
  <q-dialog v-model="dialog" :position="position">
    <q-card style="width: 350px">
      <q-card-section class="column items-center no-wrap">
        <div class="row full-width justify-between items-center">
          <div class="text-weight-bold">Options de la liste</div>
          <q-btn class="text-grey-7" dense flat size="md" label="Annuler" />
        </div>

        <q-space />

        <div class="column full-width">
          <q-btn dense flat size="md" label="Editer" />
          <q-btn class="text-red-7" flat label="Supprimer" @click="confirm = true" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row full-width items-center text-center">
        <div class="row full-width justify-center text-red-7 text-weight-medium">Supprimer la liste</div>
        <span class="q-mt-md">Vous etes sur le point de supprimer votre liste etes vous sur de vouloir faire ça ?</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Annuler" color="primary" v-close-popup />
        <q-btn flat label="Supprimer" color="red" v-close-popup @click="deleteMyList()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style>
.task-card {
  border-radius: 10px;
  margin: .2rem 0;
}

</style>

<script setup>
import { ref } from 'vue'
import { getList } from 'services/lists'
import { useRoute, useRouter } from 'vue-router'
import { getAllTasks } from 'services/tasks'
import { deleteList } from 'src/services/lists'

const route = useRoute()
const router = useRouter()

const dialog = ref(false)
const confirm = ref(false)
const position = ref('bottom')

const list = ref({});

(async () => {
  const { data } = await getList(route.params.id)
  const NewList = data
  const tasks = await getAllTasks().then(res => res.data)
  NewList.tasks = tasks.filter(task => task.list === NewList._id)
  list.value = NewList
})()

function goToTask (id) {
  router.push(`/task/${id}`)
}

const open = (position) => {
  dialog.value = true
  position.value = position
}

async function deleteMyList () {
  await deleteList(list.value._id)
  router.push('/')
}

</script>
