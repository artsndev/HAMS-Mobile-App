<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar/>
  <v-container>
    <v-card rounded="xl" class="mb-5" elevation="0" v-for="(item, index) in data" :key="index">
      <!-- <v-img height="150" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover></v-img> -->
      <v-row class="mx-1 mt-1">
        <v-col cols="6">
          <v-chip  size="x-small" color="grey-darken-3 text-uppercase" >
            Announcement
          </v-chip>
        </v-col>
        <v-col cols="6" class="mt-1">
          <div class="text-end">
            <p class="fs-14">{{ formatDate(item.created_at) }}</p>
          </div>
        </v-col>
      </v-row>
      <v-card-title class="text-wrap fs-20">{{ item.title }}</v-card-title>
      <v-card-text>
        <p class="text-grey-darken-1">{{ item.body }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import AppBar from './layouts/AppBar.vue';
import { onMounted, ref } from 'vue'
import { BASE_URL } from '@/web';
import dayjs from 'dayjs';
import { onUnmounted } from 'vue';

const data = ref([])

const fetchData = async () => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await axios.get(BASE_URL + '/post', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        data.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}

const formatDate = (dateTime) => {
    return dayjs(dateTime).format('D/MM/YYYY hh:mm A');
};

onMounted(() => {
  const intervalId = setInterval(() => {
    fetchData()
  }, 5000);
  onUnmounted(() => {
    clearInterval(intervalId);
  });
})

</script>

<style scoped>
.fs-18{
  font-size: 18px;
}
.fs-14{
  font-size: 12px;
}
</style>
