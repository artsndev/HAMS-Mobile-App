<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
    <v-list :items="items" lines="two" item-props class="mt-n3">
      <template v-slot:subtitle="{ subtitle }" >
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  <BottomBar/>
</template>

<script setup>
import AppBar from './layouts/AppBar.vue';
import BottomBar from './layouts/BottomBar.vue';
import { ref } from 'vue'

const items = ref([
  { type: 'subheader', title: 'Announcement' },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Test 1',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Test 2',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Test 3',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Test 4',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Test 5',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Test 6',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Test 7',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Test 8',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Test 9',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Test 10',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, fugiat?',
  },
])
</script>
