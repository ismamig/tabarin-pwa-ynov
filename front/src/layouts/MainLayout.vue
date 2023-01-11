<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title class="text-weight-medium">
          Dashboard
        </q-toolbar-title>

        <q-btn class="text-grey-7" dense flat round size="lg" icon="account_circle" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <!-- drawer content -->
      <div class="col q-px-lg q-py-xl">
        <div class="text-h4">Mes listes</div>
        <q-btn class="text-white full-width q-my-md add_list_btn" flat label="Créer une liste" @click="alert = true" />
        <div v-for="(list, index) in lists" :key="index">
          <div @click="$router.push(`/lists/${list._id}`)" class="text-h6 q-my-md">{{ list.title }}</div>
          <div v-if="index !== lists.length - 1" class="q-mb-md">
            <q-separator />
          </div>
        </div>
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white text-grey-7">
      <q-toolbar class="flex justify-between q-px-xl">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-btn round icon="add" @click="alert = true" class="add_btn" />
        <q-btn dense flat round icon="person" @click="toggleRightDrawer" />

        <q-dialog v-model="alert">
          <q-card square flat class="modal_new">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Créer une nouvelle liste</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="q-pt-md">
              <label class="q-mr-sm">Nom de la liste</label>
              <q-input class="q-mt-sm" outlined v-model="newList" placeholder="Ex: Courses" />
            </q-card-section>
            <q-card-actions align="center" class="q-mb-sm">
              <q-btn flat label="Annuler" color="grey-7" v-close-popup />
              <div class="q-mx-md"></div>
              <q-btn flat label="Créer" class="add_list_btn text-white" padding="5px 20px" @click="submitNewList(); alert = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style>
.add_btn {
  background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
  color: #fff;
}

.add_list_btn {
  background: #613973;
  border-radius: 5px;
}

.modal_new {
  border-radius: 10px !important;
}
</style>

<script setup>
import { ref } from 'vue'
import { getAllLists } from 'services/lists'
import { getAllTasks } from 'services/tasks'
import { useRouter } from 'vue-router'
import { createList } from 'src/services/lists'

const alert = ref(false)
const router = useRouter()

const newList = ref('')

const lists = ref([]);

(async () => {
  const { data } = await getAllLists()
  const fetchedLists = data
  console.log(lists)
  const tasks = await getAllTasks().then(res => res.data)
  lists.value = fetchedLists.map(list => {
    list.tasks = tasks.filter(task => task.list === list._id)
    return list
  })
})()

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

async function submitNewList () {
  console.log(newList.value)
  const { data } = await createList({ title: newList.value })
  console.log(data)
  router.go()
}

</script>
