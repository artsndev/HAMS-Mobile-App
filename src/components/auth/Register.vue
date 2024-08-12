<!-- eslint-disable vue/multi-word-component-names -->
<template >
  <v-container class="fill-height" >
    <v-row align="center" justify="center" class="min-vh-100 px-2" >
      <v-col cols="12" sm="8" md="8" lg="4" xl="3" xxl="4">
        <div class="container" color="primary">
          <v-alert v-if="error" icon="mdi-alert"  variant="tonal" class="mb-5"  color="red-darken-4">
            {{ error }}
          </v-alert>
          <v-form @submit.prevent="register">
            <v-text-field density="compact" prepend-inner-icon="mdi-account-outline" v-model="form.name" label="Full Name" placeholder="Juan Dela Cruz" variant="outlined" :error-messages="name_error" clearable color="primary"></v-text-field>
            <v-text-field density="compact" prepend-inner-icon="mdi-email-outline" v-model="form.email" label="Email Address" placeholder="rubickking04@gmail.com" variant="outlined" :error-messages="email_error" clearable color="primary"></v-text-field>
            <v-text-field density="compact" prepend-inner-icon=" mdi-map-marker-radius-outline" v-model="form.address" label="Address" placeholder="Zamboanga City" variant="outlined" :error-messages="address_error" clearable color="primary"></v-text-field>
            <v-text-field density="compact" prepend-inner-icon="mdi-phone-outline" v-model="form.phone_number" label="Phone Number" clearable variant="outlined" :error-messages="phone_number_error" color="primary"></v-text-field>
            <v-date-input v-model="form.birthdate" label="Birthdate" prepend-icon="" prepend-inner-icon="$calendar" clearable variant="outlined" density="compact" :error-messages="birthdate_error" color="primary"></v-date-input>
            <v-text-field density="compact" prepend-inner-icon="mdi-lock-outline" v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Password" hint="Must be 8-20 characters long." clearable variant="outlined" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="togglePasswordVisibility" :error-messages="password_error" color="primary"></v-text-field>
            <v-text-field density="compact" prepend-inner-icon="mdi-lock-outline" v-model="form.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'" label="Confirm Password" class="mb-2" hint="Must be matched with your password." clearable variant="outlined" :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="toggleConfirmPasswordVisibility" :error-messages="confirm_password_error" color="primary"></v-text-field>
            <v-row class="text-center">
              <v-col>
                <v-btn type="submit" :disabled="isLoading" :loading="isLoading" color="primary" class="mb-2 text-capitalize" block rounded="xs">
                  Sign up
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
              <p class="text-muted mt-4">Already have an account? <RouterLink to="/login" class="text-decoration-none text-primary"><span>Login here</span></RouterLink></p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { BASE_URL } from '@/web';

const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  address: '',
  birthdate: null,
  specialization: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
});

const error = ref('')
const name_error = ref('')
const email_error = ref('')
const birthdate_error = ref('')
const address_error = ref('')
const specialization_error = ref('')
const phone_number_error = ref('')
const password_error = ref('')
const confirm_password_error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const timer = ref(null)

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(d);
}


const register = async () => {
  try {
    isLoading.value = true;
    const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('address', form.address);
        formData.append('birthdate', formatDate(form.birthdate));
        formData.append('specialization', form.specialization);
        formData.append('phone_number', form.phone_number);
        formData.append('password', form.password);
        formData.append('password_confirmation', form.password_confirmation);
    const response = await axios.post(BASE_URL + '/register', formData);

    const clearValidationErrors = () => {
      name_error.value = '';
      email_error.value = '';
      birthdate_error.value = '';
      address_error.value = '';
      phone_number_error.value = '';
      specialization_error.value = '';
      password_error.value = '';
    }

    const clearErrorValidation = () => {
      error.value = '';
    }

    const setValidationError = () => {
      clearValidationErrors();
      timer.value = setTimeout(() => {
        name_error.value = response.data.errors.name;
        email_error.value = response.data.errors.email;
        birthdate_error.value = response.data.errors.birthdate;
        address_error.value = response.data.errors.address;
        phone_number_error.value = response.data.errors.phone_number;
        specialization_error.value = response.data.errors.specialization;
        password_error.value = response.data.errors.password;
      }, 1);
      setTimeout(() => {
        clearValidationErrors();
      }, 10000);
    }

    const setErrorValidation = () => {
      clearErrorValidation();
      setTimeout(() => {
        error.value = response.data.message;
      }, 1);
      setTimeout(() => {
        clearErrorValidation();
      }, 10000);
    }
    if(response.data.success){
      localStorage.setItem('userToken', response.data.data.userToken);
      router.push('/announcement');
    } else {
      if (response.data.errors) {
        setValidationError();
      } else {
        setErrorValidation();
      }
    }
  } catch (error) {
    console.log("Error Data: ", error);
  } finally {
    isLoading.value = false;
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}
const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
}
</script>


<style>
.fs-30 {
    font-size: 30px;
}
</style>
