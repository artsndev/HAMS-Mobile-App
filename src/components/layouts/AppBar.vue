<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar flat>
    <v-container class="px-4">
            <v-row no-gutters>
                <v-col cols="5" xxl="4" xl="4" lg="8">
                  <v-avatar size="35">
                    <v-icon size="50">mdi-account</v-icon>
                      <!-- <img src="@/assets/avatar.png" alt="Avatar" > -->
                      <v-dialog v-model="dialog" persistent activator="parent" width="500px" >
                        <v-card style="border-radius: 30px; background-color: #EEEEEE;" >
                          <v-toolbar density="compact">
                            <v-toolbar-title class="text-center font-weight-medium ms-10" style="font-size: medium;">{{ email }}</v-toolbar-title>
                            <v-btn icon="mdi-close" dark  @click="dialog = false" density="compact"></v-btn>
                          </v-toolbar>
                          <v-avatar size="100" class="mx-auto">
                            <v-icon size="130" class="rounded-circle">mdi-account</v-icon>
                            <!-- <img src="@/assets/avatar.png" alt="Avatar"> -->
                          </v-avatar>
                          <h2 class="mx-auto font-weight-regular">Hi, {{ name }}!</h2>
                          <v-btn class="mb-4 mx-auto" rounded color="primary" variant="outlined">Manage your Account</v-btn>
                          <v-container>
                            <v-card style="border-radius: 25px;">
                              <v-list>
                                <v-list-item prepend-avatar="@/assets/avatar.png" :title="name" :subtitle="email">
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
                </v-col>
                <v-col cols="5">
                  <v-img src="@/assets/logo.png" alt="Logo" max-width="70" max-height="70"></v-img>
                </v-col>
            </v-row>
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
  const token = localStorage.getItem('userToken')
  if (!token) {
    localStorage.removeItem('userToken')
    router.push('/login')
  }
  try {
    await axios.post(BASE_URL + '/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    window.history.pushState(null, '', '/')
    router.push({
      name: 'Login'
    })
    name.value = ''
    email.value = ''
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  loadUser()
})
</script>
