<template>
  <form @submit.prevent="submit">
    <!-- enable error if data is dirty and invalid -->
    <!-- @blur Trigger notification if user highlights over input but then changes to next input -->
     <!-- touch === user touched this feild and value is now dirty -->
    <input
      type="email"
      placeholder="What's your email?"
      v-model="email"
      @blur="$v.email.$touch()"
      :class="{ error: $v.email.$error }"
    />
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <button :disabled="$v.$invalid" type="submit ">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required feilds
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    sumbit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form Submitted:', this.email)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>