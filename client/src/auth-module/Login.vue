<template>
  <form @submit.prevent="login()">
    <div class="mb-3">
      <label for="">Email:</label>
      <input
        type="text"
        autocomplete="username"
        name="user-email"
        class="form-control"
        :class="{ 'is-invalid': formErrors.email }"
        v-model="email"
      />
      <InvalidFeedback :errors="formErrors.email"></InvalidFeedback>
    </div>
    <div class="mb-3">
      <label for="">Password:</label>
      <input
        type="password"
        :autocomplete="autocomplete ? '' : 'new-password'"
        class="form-control"
        :class="{ 'is-invalid': formErrors.password }"
        v-model="password"
      />
      <InvalidFeedback :errors="formErrors.password"></InvalidFeedback>
    </div>

    <!-- <div class="mb-3"> -->
    <!--   <app-checkbox v-model="rememberme">&nbsp; Recordarme</app-checkbox> -->
    <!-- </div> -->

    <!-- <input -->
    <!--   type="submit" -->
    <!--   class="btn btn-primary" -->
    <!--   value="Sign in" -->
    <!--   :disabled="sending" -->
    <!-- /> -->
    <app-button-loading :loading="sending">Sign in</app-button-loading>

    <div class="alert alert-danger mt-3" v-show="errorMessage.length > 0">
      {{ errorMessage }}
    </div>
  </form>
</template>
<script>
import { AuthServices } from "./AuthServices.js";
import InvalidFeedback from "./InvalidFeedback.vue";
import validator from "../utils/validator.js";

const formRules = {
  email: {
    email: true
  },
  password: {
    presence: {
      allowEmpty: false
      // message: "'%{value}' hola amigo",
      // message: ""
    }
  }
};

export default {
  components: {
    InvalidFeedback
  },

  // directives
  // filters

  props: {
    autocomplete: {
      default: true
    }
  },

  data: () => ({
    email: "",
    password: "",
    errorMessage: "",
    sending: false
    // rememberme: true
  }),

  computed: {
    formErrors() {
      return validator(
        {
          email: this.email,
          password: this.password
        },
        formRules
      );
    }
  },

  watch: {
    // rememberme(to) {
    //   if (to) {
    //     localStorage.setItem("user_remember_me", 1);
    //   } else {
    //     localStorage.removeItem("user_remember_me");
    //     localStorage.removeItem("user_email");
    //   }
    // }
  },

  mounted() {
    if (localStorage.getItem("user_email")) {
      this.email = localStorage.getItem("user_email");
    }
    // if (localStorage.getItem("user_remember_me")) {
    //   this.rememberme = true;
    // }
  },

  methods: {
    async login() {
      // if (this.rememberme) {
      localStorage.setItem("user_email", this.email);
      // }

      this.sending = true;
      this.errorMessage = "";
      try {
        await AuthServices.login(this.email, this.password);
        this.$emit("logued");
      } catch (e) {
        console.log("error", e);
        window.alert("Quizas el usuario o clave no son correctas");
      }
      this.sending = false;
    }
  }
};
</script>

<style scoped></style>
