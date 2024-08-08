<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-app-bar flat active elevation="0" >
    <template v-slot:prepend>
      <v-btn icon  @click="goBack">
          <v-icon size="25">mdi-chevron-left</v-icon>
        </v-btn>
    </template>
    <v-app-bar-title class="text-center">Session Details</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon :ripple="false" disabled>
          <v-icon size="25">mdi-dots-vertical</v-icon>
        </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
