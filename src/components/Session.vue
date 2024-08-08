<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar />
  <v-list :items="items" lines="two" item-props class="mt-n3">
    <template v-slot:subtitle="{ subtitle, item }">
      <router-link :to="'/doctor/profile/' + item.id" class="text-decoration-none text-dark">
        <div v-html="subtitle"></div>
      </router-link>
    </template>
  </v-list>
  <BottomBar />
</template>

<script setup>
import axios from 'axios';
import AppBar from './layouts/AppBar.vue';
import BottomBar from './layouts/BottomBar.vue';
import { ref, onMounted } from 'vue';
import { BASE_URL } from '@/web';
import avatar from '@/assets/images/avatar.png'

const items = ref([
  { type: 'subheader', title: 'Session' },
]);

const fetchData = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get( BASE_URL + '/appointment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the response contains an array of doctors
    const appointments = response.data.data;

    // Clear the current items except the subheader
    items.value = [{ type: 'subheader', title: 'Session' }];

    // Push new items based on fetched data
    appointments.forEach((appointment) => {
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

onMounted(() => {
  fetchData();
});
</script>
