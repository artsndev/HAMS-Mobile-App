<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
    <v-list :items="items" lines="two" item-props class="mt-n3">
        <template v-slot:subtitle="{ subtitle }" >
        <router-link to="/doctor/profile" class="text-decoration-none text-dark">
          <div v-html="subtitle"></div>
        </router-link>
      </template>
    </v-list>
  <BottomBar/>
</template>

<script setup>
import AppBar from './layouts/AppBar.vue';
import BottomBar from './layouts/BottomBar.vue';
import { ref } from 'vue'

const items = ref([
  { type: 'subheader', title: 'Doctor' },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Test Doctor Name 1',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Test Doctor Name 2',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Test Doctor Name 3',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Test Doctor Name 4',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Test Doctor Name 5',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Test Doctor Name 6',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Test Doctor Name 7',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Test Doctor Name 8',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Test Doctor Name 9',
    subtitle: 'January 07, 2024',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Test Doctor Name 10',
    subtitle: 'January 07, 2024',
  },
])
</script>
