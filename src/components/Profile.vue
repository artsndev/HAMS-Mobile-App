<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
  <v-container>
    <div class="text-center">
      <v-avatar size="100" class="mx-auto">
        <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
      </v-avatar>
      <h2 class="mx-auto font-weight-regular mt-3">Al-Fhaigar Usman</h2>
      <p class="mx-auto text-grey font-weight-regular">alfhaigarusman@gmail.com</p>
      <v-btn prepend-icon="mdi-pencil-outline" color="dark" variant="outlined" class="mt-3 text-capitalize">Edit Profile</v-btn>
    </div>
  </v-container>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card-title class="text-center mt-n3">21</v-card-title>
        <v-card-subtitle class="text-center text-caption mt-n3">Appointments</v-card-subtitle>
      </v-col>
      <v-divider vertical inset></v-divider>
      <v-col cols="6">
        <v-card-title class="text-center mt-n3">10</v-card-title>
        <v-card-subtitle class="text-center text-caption mt-n3">Pending</v-card-subtitle>
      </v-col>
    </v-row>
  </v-container>
  <v-divider></v-divider>
    <v-list  nav >
      <v-list-item>
        <p class="fs-10 mb-5">Details</p>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-at</v-icon>
          <span class="mx-2">alfhaigarusman@gmail.com</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-map-marker-radius-outline</v-icon>
          <span class="mx-2">Sinunuc, Zamboanga City</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-phone-outline</v-icon>
          <span class="mx-2">(+63) 995 8111 348</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
</template>

<script setup>
import AppBar from './layouts/ProfileAppBar.vue';
</script>

<style scoped>
.fs-10{
  font-size: 15px;
}
</style>
