<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
  <v-container>
    <v-card rounded="xl" class="mb-5" elevation="5">
      <v-img height="150" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover></v-img>
      <v-row class="mx-1 mt-1">
        <v-col cols="7">
          <v-chip  size="x-small" color="grey-darken-3 text-uppercase" >
            Announcement
          </v-chip>
        </v-col>
        <v-col cols="5" class="mt-1">
          <p class="fs-14">21/10/2023 11:21 PM</p>
        </v-col>
      </v-row>
      <v-card-title class="text-wrap fs-20">Make a donation today with a quick scan!</v-card-title>
      <v-card-text>
        <p class="text-grey-darken-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, recusandae.</p>
      </v-card-text>
    </v-card>
    <v-card rounded="xl" elevation="5">
      <!-- <v-img height="150" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover></v-img> -->
      <v-row class="mx-1 mt-1" >
        <v-col cols="7">
          <v-chip  size="x-small" color="grey-darken-3 text-uppercase" >
            Announcement
          </v-chip>
        </v-col>
        <v-col cols="5" class="mt-1">
          <p class="fs-14">21/10/2023 11:21 PM</p>
        </v-col>
      </v-row>
      <v-card-title class="text-wrap fs-20">Make a donation today with a quick scan!</v-card-title>
      <v-card-text>
        <p class="text-grey-darken-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, recusandae.</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import AppBar from './layouts/AppBar.vue';
// import { ref } from 'vue'

</script>

<style scoped>
.fs-18{
  font-size: 18px;
}
.fs-14{
  font-size: 12px;
}
</style>
