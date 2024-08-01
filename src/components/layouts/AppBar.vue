<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar flat>
    <v-container>
      <v-text-field variant="outlined" bg-color="blue-grey-lighten-5" placeholder="Search in appointments" color="blue-darken-4" density="comfortable" class="mt-5" rounded>
      <template v-slot:prepend-inner>
        <v-app-bar-nav-icon size="35"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append-inner>
        <v-avatar size="35">
          <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
          <v-dialog v-model="dialog" persistent activator="parent" width="500px" >
            <v-card style="border-radius: 30px; background-color: #EEEEEE;" >
              <v-toolbar density="compact">
                <v-toolbar-title class="text-center font-weight-medium ms-10" style="font-size: medium;">{{ email }}</v-toolbar-title>
                <v-btn icon="mdi-close" dark  @click="dialog = false" density="compact"></v-btn>
              </v-toolbar>
              <v-avatar size="100" class="mx-auto">
                <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
              </v-avatar>
              <h2 class="mx-auto font-weight-regular">Hi, {{ name }}!</h2>
              <v-btn class="mb-4 mx-auto" rounded color="primary" variant="outlined">Manage your Account</v-btn>
              <v-container>
                <v-card style="border-radius: 25px;">
                  <v-list>
                    <v-list-item prepend-avatar="@/assets/images/avatar.jpg" :title="name" :subtitle="email">
                    </v-list-item>
                  </v-list>
                  <v-divider></v-divider>
                  <v-list :lines="false" nav>
                    <v-list-item v-for="(item, i) in items" :key="i" :value="item" rounded="xl" @click="handleItemClick(item)">
                      <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                      </template>
                      <v-list-item-title v-text="item.text" style="font-size: medium;"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-container>
            </v-card>
          </v-dialog>
        </v-avatar>
      </template>
    </v-text-field>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { BASE_URL } from '@/web';

const items = ref([
  { text: 'Sign Out', icon: 'mdi-logout'}
])

const handleItemClick = (item) => {
  if (item.text === 'Sign Out') {
    logout();
  }
}

const dialog = ref(false)

const router = useRouter();

const name = ref('');
const email = ref('');

const loadUser = async () => {
  try {
    const token = localStorage.getItem('userToken')
    const response = await axios.get(BASE_URL + '/data', {
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    name.value = response.data.name
    email.value = response.data.email
  } catch (error) {
    console.log(error)
  }
}

const logout = async () => {
  try {
    const token = localStorage.getItem('userToken')
    await axios.post(BASE_URL + '/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    localStorage.removeItem('userToken');
    name.value = ''
    email.value = ''
    window.history.pushState(null, '', '/')
    router.push({
      name: 'Login'
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  loadUser()
})
</script>
