<template>
  <div class="row justify-between q-px-lg q-py-md">
    <q-btn class="text-grey-7 bg-grey-3 justify-center items-center row q-px-sm" flat size="sm" @click="$router.back()">
      <q-icon class="text-grey-7" name="arrow_back" />
    </q-btn>
    <q-btn class="text-grey-7" dense flat round size="md" icon="more_horiz" @click="open('bottom')" />
  </div>
  <div class="q-px-lg">
    <h1 class="text-h6 text-weight-regular text-grey-6">Task</h1>
    <div class="text-h5 text-weight-medium q-mb-xl">{{ task.title }}</div>
    <h1 class="text-h6 text-weight-regular text-grey-6 q-mt-md">Description</h1>
    <div class="text-h6 text-weight-regular q-mb-xl">{{ task.description }}</div>
    <h1 class="text-h6 text-weight-regular text-grey-6 q-mt-md">Terminée</h1>
    <div class="text-h6 text-weight-regular q-mb-xl">{{ task.done ? "Oui" : "Non" }}</div>
  </div>
  <q-dialog v-model="dialog" :position="position">
    <q-card style="width: 350px">
      <q-card-section class="column items-center no-wrap">
        <div class="row full-width justify-between items-center">
          <div class="text-weight-bold">Options de la tache</div>
          <q-btn class="text-grey-7" dense flat size="md" label="Annuler" />
        </div>

        <q-space />

        <div class="column full-width">
          <q-btn dense flat size="md" label="Editer" @click="$router.push(`/task/edit/${route.params.id}`)" />
          <q-btn class="q-py-sm" flat label="Deplacer" @click="alert = true" />
          <q-btn class="text-red-7" flat label="Supprimer" @click="confirm = true" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row full-width items-center text-center">
        <div class="row full-width justify-center text-red-7 text-weight-medium">Supprimer la tache</div>
        <span class="q-mt-md">Vous etes sur le point de supprimer votre tache etes vous sur de vouloir faire ça ?</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Annuler" color="primary" v-close-popup />
        <q-btn flat label="Supprimer" color="red" v-close-popup @click="deleteMyTask()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="alert">
    <q-card square flat class="modal_new">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-subtitle2 q-px-sm q-py-sm">Déplacer la tache dans une nouvelle liste</div>
      </q-card-section>
      <q-card-section class="q-pt-md column">
        <div v-for="(list, index) in lists" :key="index">
          <div>{{ list}}</div>
          <div>{{ index }}</div>
        </div>
        <label class="q-mr-sm">Selectionner la liste</label>
        <q-btn-dropdown outlined :label="task.list.title">
          <q-list>
            <q-item clickable v-close-popup >
              <q-item-section>
                <q-item-label>s</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </q-card-section>
      <q-card-actions align="center" class="q-mb-sm">
        <q-btn flat label="Annuler" color="grey-7" v-close-popup />
        <div class="q-mx-md"></div>
        <q-btn flat label="Créer" class="add_list_btn text-white" padding="5px 20px"
          @click="submitNewList(); alert = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style>
.task-card {
  border-radius: 10px;
}
</style>

<script setup>
import { getAllLists } from 'services/lists'
import { getTask } from 'services/tasks'
import { deleteTask } from 'src/services/tasks'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const alert = ref(false)
const route = useRoute()
const router = useRouter()
const task = ref({})
const lists = ref([])

const dialog = ref(false)
const confirm = ref(false)
const position = ref('bottom');

(async () => {
  const { data } = await getTask(route.params.id)
  const newTask = data
  task.value = newTask
  const { data: lists } = await getAllLists()
  const newLists = lists
  lists.value = newLists
  console.log(task.value)
  console.log(lists.value)
})()

const open = (position) => {
  dialog.value = true
  position.value = position
}

const deleteMyTask = async () => {
  await deleteTask(task.value._id)
  router.push(`/lists/${task.value.list._id}`)
}

</script>
