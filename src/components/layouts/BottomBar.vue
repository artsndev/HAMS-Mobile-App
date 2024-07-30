<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-bottom-navigation  :elevation="3" v-model="value"  mode="shift" horizontal grow color="blue-darken-3">
    <v-btn  v-for="(item, index) in items" :key="index" :to="{ name: item.routeName }">
      <v-icon size="28">{{ item.icon }}</v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(0)

const items = ref([
  { title: 'Home', icon: 'mdi-home-variant-outline', routeName: 'Home'},
  { title: 'Session', icon: 'mdi-message-text-outline', routeName: 'Session'},
  { title: 'Profile', icon: 'mdi-account-outline', routeName: 'Profile'},
])

</script>
