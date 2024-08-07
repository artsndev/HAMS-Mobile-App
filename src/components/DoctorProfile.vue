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
    <v-footer class="position-bottom">
      <v-dialog transition="dialog-bottom-transition" fullscreen>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn block v-bind="activatorProps" color="blue-darken-4 sticky-bottom" rounded="lg">Request For Appointment</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            Appointment Form
            <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
          </v-card-title>
          <v-card-text>
            <div class=" mb-4">Invite collaborators to your network and grow your connections.</div>
            <v-select v-model="form.appointment_time" density="compact" clearable chips label="Select a schedule" :items="scheduleItem" variant="outlined" ></v-select>
            <v-select v-model="form.session_of_appointment" color="primary" variant="outlined" density="compact" :items="items" label="Select a Session of appointment" multiple>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 1">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 1" class="text-grey text-caption align-self-center">
                  (+{{ form.session_of_appointment.length - 1 }} others)
                </span>
              </template>
            </v-select>
            <v-textarea v-model="form.purpose_of_appointment" label="Purpose of Appointment. *" density="compact" :counter="300" class="mb-2" rows="3" variant="outlined" persistent-counter color="primary" auto-grow></v-textarea>
            <v-btn color="primary" class="text-decoration-none">Submit a Request</v-btn>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    </v-footer>
</template>

<script setup>
import AppBar from './layouts/DoctorProfileAppBar.vue';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/web';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';

const name = ref('')
const email = ref('')
const address = ref('')
const birthdate = ref('')
const phone_number = ref('')
const specialization = ref('')

const doctorId = ref(null)

const router = useRouter()

const form = reactive({
  appointment_time: null,
  purpose_of_appointment: '',
  session_of_appointment: null,
})
const items = ref(['Website', 'Web Application', 'Mobile App', 'Web Design', 'Cloud Hosting', 'API Development']);

const scheduleItem = ref([])

const formatDate = (dateTime) => {
    return dayjs(dateTime).format('dddd, MMMM D, YYYY hh:mm A');
};

const loadUser = async () => {
  try {
    const token = localStorage.getItem('userToken')
    const response = await axios.get(BASE_URL + '/doctor/'+ doctorId.value, {
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    const doctor = response.data.data
    name.value = doctor.name
    email.value = doctor.email
    address.value = doctor.address
    birthdate.value = doctor.birthdate
    phone_number.value = doctor.phone_number
    specialization.value = doctor.specialization
    if (Array.isArray(doctor.schedule)) {
      scheduleItem.value = doctor.schedule.flatMap(sch => {
        const scheduleTimes = Array.isArray(sch.schedule_time) ? sch.schedule_time : sch.schedule_time.split(',')
        return scheduleTimes.map(time => formatDate(time))
      });
    }
    // console.log(scheduleItem.value);
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
