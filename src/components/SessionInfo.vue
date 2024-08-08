<template>
  <AppBar/>
  <v-list>
    <v-list-item prepend-avatar="@/assets/images/avatar.png" :subtitle="specialization" :title="name">
      <template v-slot:append>
        <span class="fs-12 text-disabled mt-n4">{{ formatDate(created_at) }}</span>
      </template>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-container>
    <p class="fs-10 mb-5">Details</p>
    <v-text-field readonly v-model="appointment_time" color="primary" label="Scheduled appointment time" variant="outlined"></v-text-field>
    <v-textarea readonly v-model="session_of_appointment" rows="0" label="Session of Appointment" auto-grow color="primary" variant="outlined"></v-textarea>
    <v-textarea readonly v-model="purpose_of_appointment" rows="0" label="Purpose of Appointment" auto-grow color="primary" variant="outlined"></v-textarea>
  </v-container>
</template>

<script setup>
import AppBar from './layouts/SessionInfoAppBar.vue';
import { BASE_URL } from '@/web';
import axios from 'axios';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const name = ref('')
const specialization = ref('')
const purpose_of_appointment = ref('')
const session_of_appointment = ref('')
const appointment_time = ref('')
const created_at = ref('')

const appointmentId = ref(null)

const formatDate = (dateTime) => {
    return dayjs(dateTime).format('MMM D, YYYY');
};

const formattedDate = (dateTime) => {
    return dayjs(dateTime).format('dddd, MMMM D, YYYY hh:mm A');
};
const loadData = async () => {
  try {
    const token = localStorage.getItem('userToken')
    const response = await axios.get(BASE_URL + '/appointment/' + appointmentId.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const appointment = response.data.data
    name.value = appointment.doctor.name
    specialization.value = appointment.doctor.specialization
    appointment_time.value = formattedDate(appointment.appointment_time)
    purpose_of_appointment.value = appointment.purpose_of_appointment
    session_of_appointment.value = appointment.session_of_appointment
    created_at.value = appointment.created_at
    // console.log(name)
  } catch (error) {
    console.log(error)
  }
}

const route = useRoute()

onMounted(() => {
  appointmentId.value = route.params.id
  loadData()
})
</script>

<style scoped>
.fs-12{
  font-size: 12px;
}
</style>
