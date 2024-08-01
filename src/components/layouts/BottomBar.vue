<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-fab icon="mdi-pencil-outline" rounded="lg" class="me-5 mb-5" color="blue-grey-lighten-5" @click="dialog = !dialog" location="bottom right" app sticky appear></v-fab>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-text>
        <v-text-field label="File name"></v-text-field>
        <small class="text-grey">* This doesn't actually save.</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="dialog = false">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- <v-bottom-navigation bg-color="blue-grey-lighten-5" :elevation="0" v-model="value"  mode="shift" horizontal grow color="blue-darken-1">
    <v-btn  v-for="(item, index) in items" :key="index" :to="{ name: item.routeName }">
      <v-icon size="28">{{ item.icon }}</v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation> -->
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)

// const value = ref(0)

// const items = ref([
//   { title: 'Home', icon: 'mdi-home-variant-outline', routeName: 'Home'},
//   { title: 'Session', icon: 'mdi-message-text-outline', routeName: 'Session'},
//   { title: 'Profile', icon: 'mdi-account-outline', routeName: 'Profile'},
// ])

</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
