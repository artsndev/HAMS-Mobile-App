<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
  <v-container>
    <div class="text-center">
      <v-avatar size="100" class="mx-auto">
        <img src="@/assets/images/avatar.png" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
      </v-avatar>
      <h2 class="mx-auto font-weight-regular mt-3">{{ name }}</h2>
      <p class="mx-auto text-grey font-weight-regular">{{ specialization }}</p>
    </div>
  </v-container>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card-title class="text-center mt-n3">21</v-card-title>
        <v-card-subtitle class="text-center text-caption mt-n3">Pending</v-card-subtitle>
      </v-col>
      <!-- <v-divider vertical inset></v-divider> -->
      <v-col cols="6">
        <v-card-title class="text-center mt-n3">10</v-card-title>
        <v-card-subtitle class="text-center text-caption mt-n3">Completed</v-card-subtitle>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-divider></v-divider> -->
    <v-list  nav>
      <v-list-item>
        <p class="fs-10 mb-5">Details</p>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-briefcase-variant-outline</v-icon>
          <span class="mx-2">{{ specialization }}</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-at</v-icon>
          <span class="mx-2">{{ email }}</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-cake-variant-outline</v-icon>
          <span class="mx-2">{{ birthdate }}</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-phone-outline</v-icon>
          <span class="mx-2">{{ phone_number }}</span>
        </v-list-item-title>
        <v-list-item-title class="font-weight-medium fs-10 mb-2">
          <v-icon>mdi-map-marker-radius-outline</v-icon>
          <span class="mx-2 text-wrap">{{ address }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-footer class="position-relative ">
        <v-btn block color="blue-darken-4 sticky-bottom" rounded="lg">Request For Appointment</v-btn>
      </v-footer>
</template>

<script setup>
import AppBar from './layouts/DoctorProfileAppBar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/web';
import { useRouter, useRoute } from 'vue-router';

const name = ref('')
const email = ref('')
const address = ref('')
const birthdate = ref('')
const phone_number = ref('')
const specialization = ref('')

const doctorId = ref(null)

const router = useRouter()

const loadUser = async () => {
  try {
    const token = localStorage.getItem('userToken')
    const response = await axios.get(BASE_URL + '/doctor/'+ doctorId.value, {
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    name.value = response.data.data.name
    email.value = response.data.data.email
    address.value = response.data.data.address
    birthdate.value = response.data.data.birthdate
    phone_number.value = response.data.data.phone_number
    specialization.value = response.data.data.specialization
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('userToken');
      setTimeout(() => {
        location.reload()
        router.push({
          name: 'Login'
        })
      }, 3000)
    }
  }
}

const route = useRoute()

onMounted(() => {
  doctorId.value = route.params.id
  loadUser()
})
</script>

<style scoped>
.fs-10{
  font-size: 15px;
}
</style>
