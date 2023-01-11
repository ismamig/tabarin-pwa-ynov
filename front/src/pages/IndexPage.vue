<template>
  <q-page class="q-px-lg">
    <h4 class="text-bold">
      Bonjour,<br />
      Tom Dupont ! 👋
    </h4>
    <q-space />
    <div v-for="(list, index) in lists" :key="index">
      <HomeCard :id="list._id" :title="list.title" :tasks="list.tasks"/>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import HomeCard from 'components/homepage/cardComponent.vue'
import { getAllLists } from 'services/lists'
import { getAllTasks } from 'services/tasks'

const lists = ref([]);

(async () => {
  const { data } = await getAllLists()
  const NewLists = data
  const tasks = await getAllTasks().then(res => res.data)
  lists.value = NewLists.map(list => {
    list.tasks = tasks.filter(task => task.list === list._id)
    return list
  })
})()

// const tasks = ref([
//   { title: 'Task 1' },
//   { title: 'Task 2' },
//   { title: 'Task 3' }
// ])

</script>
