<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black">
      <q-toolbar class="q-px-lg">
        <q-btn class="text-grey-7 bg-grey-3 justify-center items-center row q-px-sm" flat size="sm" @click="$router.push(`/`)">
          <q-icon class="text-grey-7" name="arrow_back"/>
        </q-btn>
        <q-toolbar-title class="text-weight-medium q-ml-md">
          ListName
        </q-toolbar-title>

        <q-btn class="text-grey-7" dense flat round size="md" icon="more_horiz" @click="$router.push(`/`)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style>
.add_btn {
  background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
  color: #fff;
}
</style>

<script setup>

</script>
