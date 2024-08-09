<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar flat>
    <v-container>
      <v-text-field v-model="searchQuery" variant="outlined" @focus="onFocus" bg-color="blue-grey-lighten-5" placeholder="Search in appointments history" color="blue-darken-4" density="comfortable" class="mt-5" rounded>
        <template v-slot:prepend-inner>
          <v-app-bar-nav-icon size="30" :ripple="false" @touchstart.prevent="toggleMenu" @mousedown.prevent="toggleMenu" @click="toggleMenu"></v-app-bar-nav-icon>
        </template>
        <template v-slot:append-inner>
          <v-avatar size="30" @touchstart.prevent="toggleDialog" @mousedown.prevent="toggleDialog">
            <img src="@/assets/images/avatar.png" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
            <v-dialog v-model="dialog" persistent activator="parent" width="500px" >
              <v-card style="border-radius: 30px; background-color: #EEEEEE;" >
                <v-toolbar density="compact">
                  <v-toolbar-title class="text-center font-weight-medium ms-10" style="font-size: medium;">{{ email }}</v-toolbar-title>
                  <v-btn icon="mdi-close" dark  @click="dialog = false" density="compact"></v-btn>
                </v-toolbar>
                <v-avatar size="100" class="mx-auto">
                  <img src="@/assets/images/avatar.png" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;">
                </v-avatar>
                <h2 class="mx-auto font-weight-regular">Hi, {{ name }}!</h2>
                <v-btn class="mb-4 mx-auto" rounded color="primary" variant="outlined">Manage your Account</v-btn>
                <v-container>
                  <v-card style="border-radius: 25px;">
                    <v-list>
                      <v-list-item prepend-avatar="@/assets/images/avatar.png" :title="name" :subtitle="email">
                      </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list :lines="false" nav>
                      <v-list-item v-for="(item, i) in signOut" :key="i" :value="item" rounded="xl" @click="handleItemClick(item)">
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

  <v-navigation-drawer v-model="drawer" flat>
    <div class="text-center mt-3">
      <v-avatar size="70" class="mx-auto">
        <img src="@/assets/images/avatar.png" alt="Avatar" style="object-fit: cover; width: 100%; height: 100%;"/>
      </v-avatar>
      <v-list>
        <v-list-item :subtitle="email" :title="name"></v-list-item>
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
        <p class="text-grey fs-12">@QuirkyQuarks Squadrons</p>
        <p class="text-grey mb-2 fs-12">© 2024 All rights reserved.</p>
      </div>
    </template>
  </v-navigation-drawer>

  <v-list v-if="filteredData.length" :items="filteredData" lines="two" item-props class="mt-n3">
    <template v-slot:subtitle="{ subtitle, item }">
      <router-link :to="'/doctor/profile/' + item.id" class="text-decoration-none text-dark">
        <div v-html="highlightText(subtitle)"></div>
      </router-link>
    </template>
    <template v-slot:append="{ item }">
      <div class="flex">
        <p class="ms-5 text-disabled fs-12 mt-n5">{{ formatTime(item.created_at) }}</p>
        <p class="ms-5 text-disabled text-end fs-12">{{ formatDate(item.created_at) }}</p>
      </div>
    </template>
  </v-list>

  <!-- No Data Template -->
  <div v-else class="text-center mt-5">
    <v-icon size="50" class="mb-2">mdi-alert-circle-outline</v-icon>
    <p>No matching appointments found.</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, reactive, computed } from 'vue';
import { BASE_URL } from '@/web';
import avatar from '@/assets/images/avatar.png'
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const signOut = ref([
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
  { icon: 'mdi-account-outline', text: 'Profile', routeName: 'Profile' },
  { icon: 'mdi-bullhorn-variant-outline', text: 'Announcement', routeName: 'Announcement'},
  { icon: 'mdi-doctor', text: 'Doctor', routeName: 'Doctor'},
  { icon: 'mdi-message-text-outline', text: 'Session', routeName: 'Session'},
  // { icon: 'mdi-cog-outline', text: 'Settings',},
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

const items = ref([
  { type: 'subheader', title: 'Session' },
]);

const formatDate = (dateTime) => {
    return dayjs(dateTime).format('D MMM');
};

const formatTime = (dateTime) => {
  return dayjs(dateTime).format('h:mm A');
};

const doctorData = reactive({
  doctor: null
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get( BASE_URL + '/doctor/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    doctorData.doctor = response.data.data;
    items.value = [{ type: 'subheader', title: 'Doctor' }];
    doctorData.doctor.forEach((doctor) => {
      items.value.push({
        id: doctor.id,
        prependAvatar: doctor.avatarUrl || avatar,
        title: doctor.name,
        subtitle: doctor.specialization,
        created_at: doctor.created_at,
      });
      items.value.push({ type: 'divider', inset: true });
    });
  } catch (error) {
    console.log(error);
  }
};

const searchQuery = ref('');

const highlightText = (text) => {
  const search = searchQuery.value.trim();
  if (!search) return text;
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, '<span style="background-color: yellow;">$1</span>');
}

const filteredData = computed(() => {
  if (!doctorData.doctor) return [];
  const search = searchQuery.value.toLowerCase();
  return items.value.filter(item =>
    item.title?.toLowerCase().includes(search) ||
    item.subtitle?.toLowerCase().includes(search)
  );
});

onMounted(() => {
  loadUser()
  fetchData();
});
</script>

<style scoped>
.fs-12{
  font-size: 12px;
}
</style>
