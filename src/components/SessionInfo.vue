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
  <!-- <v-divider></v-divider> -->
  <p class="fs-10 mb-5 ms-5 mt-n5">Request Status</p>
  <div height="100">
    <v-timeline align="start" side="end" truncate-line="both">
      <v-timeline-item dot-color="success" size="20" >
        <template v-slot:opposite>
          <div class="flex">
            <p class="ms-5 fs-12">{{ formatDate(created_at) }}</p>
            <p class="ms-5 fs-12">{{ formatTime(created_at) }}</p>
          </div>
        </template>
        <v-container class="ms-n7 mt-n5">
          <strong>Completed</strong>
          <div class="text-caption text-wrap">
            Your appointment request is completed.
          </div>
        </v-container>
      </v-timeline-item>
      <v-timeline-item dot-color="warning" size="20" >
        <template v-slot:opposite>
          <div class="flex">
            <p class="ms-5 fs-12">{{ formatDate(created_at) }}</p>
            <p class="ms-5 fs-12">{{ formatTime(created_at) }}</p>
          </div>
        </template>
        <v-container class="ms-n7 mt-n5">
          <strong>Pending</strong>
          <div class="text-caption text-wrap">
                Your appointment request is on list.
          </div>
        </v-container>
      </v-timeline-item>
  </v-timeline>
  </div>
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

const formatTime = (dateTime) => {
    return dayjs(dateTime).format('hh:mm A');
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
