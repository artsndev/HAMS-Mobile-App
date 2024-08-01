<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar flat>
    <v-container>
      <v-text-field variant="outlined" @focus="onFocus" bg-color="blue-grey-lighten-5" placeholder="Search in appointments" color="blue-darken-4" density="comfortable" class="mt-5" rounded>
      <template v-slot:prepend-inner>
        <v-app-bar-nav-icon size="30" :ripple="false" @touchstart.prevent="toggleMenu" @mousedown.prevent="toggleMenu" @click="toggleMenu"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append-inner>
        <v-avatar size="30" @touchstart.prevent="toggleDialog" @mousedown.prevent="toggleDialog">
          <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
          <v-dialog v-model="dialog" persistent activator="parent" width="500px" >
            <v-card style="border-radius: 30px; background-color: #EEEEEE;" >
              <v-toolbar density="compact">
                <v-toolbar-title class="text-center font-weight-medium ms-10" style="font-size: medium;">alfhaigarusman@gmailcom</v-toolbar-title>
                <v-btn icon="mdi-close" dark  @click="dialog = false" density="compact"></v-btn>
              </v-toolbar>
              <v-avatar size="100" class="mx-auto">
                <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
              </v-avatar>
              <h2 class="mx-auto font-weight-regular">Hi, Al-Fhaigar Usman!</h2>
              <v-btn class="mb-4 mx-auto" rounded color="primary" variant="outlined">Manage your Account</v-btn>
              <v-container>
                <v-card style="border-radius: 25px;">
                  <v-list>
                    <v-list-item prepend-avatar="@/assets/images/avatar.jpg" title="Al-Fhaigar Usman" subtitle="alfhaigarusman@gmailcom">
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
  <v-navigation-drawer v-model="drawer" fla>
    <div class="text-center mt-3">
      <v-avatar size="70" class="mx-auto">
        <img src="@/assets/images/avatar.jpg" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
      </v-avatar>
      <v-list>
        <v-list-item subtitle="alfhaigarusman@gmailcom" title="Al-Fhaigar Usman"></v-list-item>
      </v-list>
    </div>
    <v-list density="compact" nav class="mt-3">
      <v-divider class="mb-5"></v-divider>
        <v-list-item v-for="(item, i) in navDrawitems" :key="i" :value="item" class="fs-5">
            <template v-slot:prepend>
                <v-icon :icon="item.icon" size="33"></v-icon>
            </template>
            <router-link :to="{ name: item.routeName }" class="text-dark text-decoration-none">
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </router-link>
        </v-list-item>
        <v-divider class="mt-5"></v-divider>
    </v-list>
    <template v-slot:append>
      <div class="text-center mb-2">
        <p class="text-grey fs-14">@QuirkyQuarks Squadrons</p>
        <p class="text-grey mb-2 fs-14">© 2024 All rights reserved.</p>
      </div>
    </template>
  </v-navigation-drawer>
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

const drawer = ref(false);
const toggleMenu = () => {
  drawer.value = !drawer.value;
}

const navDrawitems = ref([
  { icon: 'mdi-home-variant-outline', text: 'Home', routeName: 'Home' },
  { icon: 'mdi-account-outline', text: 'Profile', routeName: 'Profile' },
  { icon: 'mdi-message-text-outline', text: 'Session', routeName: 'Session'},
  { icon: 'mdi-bullhorn-variant-outline', text: 'Announcement',},
  { icon: 'mdi-cog-outline', text: 'Settings',},
]);


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

const toggleDialog = () => {
  dialog.value = !dialog.value;
};

const onFocus = (event) => {
  if (dialog.value) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target) event.target.blur();
  }
};

onMounted(() => {
  loadUser()
})
</script>

<style>
.fs-14{
    font-size: 12px;
}
</style>
