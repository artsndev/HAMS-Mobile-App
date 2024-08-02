<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
  <v-container>
    <div class="text-center">
      <v-avatar size="100" class="mx-auto">
        <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
      </v-avatar>
      <h2 class="mx-auto font-weight-regular mt-3">Dr. Al-Fhaigar Usman</h2>
      <p class="mx-auto text-grey font-weight-regular">Neurologists Specialists</p>
    </div>
  </v-container>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card rounded="xl" elevation="0" color="blue-grey-lighten-5" class="mx-2 py-2 text-center">
          <v-icon size="40">mdi-wheelchair</v-icon>
          <v-card-title class="text-center mt-n3">21+</v-card-title>
          <v-card-subtitle class="text-center text-caption mt-n3">Successful Patients</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card rounded="xl" elevation="0" color="blue-grey-lighten-5" class="mx-2 py-2 text-center">
          <v-icon size="40">mdi-microscope</v-icon>
          <v-card-title class="text-center mt-n3">10 years</v-card-title>
          <v-card-subtitle class="text-center text-caption mt-n3">Experience</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-4">
      <v-col cols="6">
        <v-card rounded="xl" elevation="0" color="blue-grey-lighten-5" class="mx-2 py-2 text-center">
          <v-icon size="40">mdi-iv-bag</v-icon>
          <v-card-title class="text-center mt-n3">11+</v-card-title>
          <v-card-subtitle class="text-center text-caption mt-n3">Patients</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card rounded="xl" elevation="0" color="blue-grey-lighten-5" class="mx-2 py-2 text-center">
          <v-icon size="40">mdi-certificate-outline</v-icon>
          <v-card-title class="text-center mt-n3">10</v-card-title>
          <v-card-subtitle class="text-center text-caption mt-n3">Certificates</v-card-subtitle>
        </v-card>
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
    <v-footer class="mt-16">
        <v-btn block color="blue-darken-4 mt-16" rounded="lg">Request For Appointment</v-btn>
      </v-footer>
</template>

<script setup>
import AppBar from './layouts/DoctorProfileAppBar.vue';
</script>

<style scoped>
.fs-10{
  font-size: 15px;
}
</style>
