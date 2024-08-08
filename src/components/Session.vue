<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar />
  <v-list :items="items" lines="two" item-props class="mt-n3">
    <template v-slot:subtitle="{ subtitle, item }">
      <router-link :to="'/session/info/' + item.id" class="text-decoration-none text-dark">
        <div v-html="subtitle"></div>
      </router-link>
    </template>
    <template v-slot:append>
        <p class="fs-12 ms-5 text-disabled mt-n5">{{ formatDate(created_at) }}</p>
      </template>
  </v-list>
  <BottomBar />
</template>

<script setup>
import axios from 'axios';
import AppBar from './layouts/AppBar.vue';
import BottomBar from './layouts/BottomBar.vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { BASE_URL } from '@/web';
import avatar from '@/assets/images/avatar.png'
import dayjs from 'dayjs';

const items = ref([
  { type: 'subheader', title: 'Session' },
]);
const created_at = ref('')
const formatDate = (dateTime) => {
    return dayjs(dateTime).format('D MMM');
};

const appointmentData = reactive({
  appointment: null
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get( BASE_URL + '/appointment/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    appointmentData.appointment = response.data.data;
    created_at.value = appointmentData.appointment.created_at
    items.value = [{ type: 'subheader', title: 'Session' }];
    appointmentData.appointment.forEach((appointment) => {
      items.value.push({
        id: appointment.id,
        prependAvatar: appointment.doctor.avatarUrl || avatar,
        title: appointment.session_of_appointment,
        subtitle: appointment.doctor.name + ' - ' + appointment.purpose_of_appointment,
      });
      items.value.push({ type: 'divider', inset: true });
    });

  } catch (error) {
    console.log(error);
  }
};

const searchQuery = ref('');

const filteredData = computed(() => {
  if (!appointmentData.appointment) return [];
  const search = searchQuery.value.toLowerCase();
  return appointmentData.appointment.filter(item =>
    formatDate(item.schedule_time).toLowerCase().includes(search)
  );
});


onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.fs-12{
  font-size: 12px;
}
</style>
