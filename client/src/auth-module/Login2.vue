<template>
  <div class="bg-default">
    <div class="main-content">
      <!-- Header -->
      <div class="header bg-gradient-primary py-5 py-lg-6">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-6">
                <h1 class="text-white">BIENVENIDO!</h1>
                <p class="text-lead text-light">
                  Identifícate
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              class="fill-default"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <!-- Page content -->
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Ingresa con tus credenciales</small>
                </div>
                <form role="form" ref="elForm">
                  <div class="form-group mb-3">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        class="form-control"
                        v-input-focused
                        placeholder="Email"
                        type="email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <app-input-password
                      class="input-group-alternative"
                      v-model="password"
                    ></app-input-password>
                  </div>
                  <!-- <app-checkbox class="custom-control-alternative">
                    <span class="text-muted">Recuerdame</span>
                  </app-checkbox> -->
                  <div class="text-center">
                    <app-button-submit class="my-4" @oneClick="sendForm()">
                      Ingresar
                    </app-button-submit>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <a href="#" class="text-light"
                  ><small>Forgot password?</small></a
                >
              </div>
              <div class="col-6 text-right">
                <a href="#" class="text-light">
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="py-5">
        <div class="container">
          <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6">
              <div class="copyright text-center text-xl-left text-muted">
                © 2018
                <a
                  href="https://www.creative-tim.com"
                  class="font-weight-bold ml-1"
                  target="_blank"
                  >Creative Tim</a
                >
              </div>
            </div>
            <div class="col-xl-6">
              <ul
                class="nav nav-footer justify-content-center justify-content-xl-end"
              >
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    class="nav-link"
                    target="_blank"
                    >Creative Tim</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/presentation"
                    class="nav-link"
                    target="_blank"
                    >About Us</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="http://blog.creative-tim.com"
                    class="nav-link"
                    target="_blank"
                    >Blog</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                    class="nav-link"
                    target="_blank"
                    >MIT License</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import $ from "jquery";

const InitForm = {
  username: "root@root.root",
  password: ""
};

export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    /**
     *
     * Accion que debe realizar despues de redireccionar
     *
     */
    afterLogged: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    email: "",
    password: ""
  }),

  computed: {
    ...mapState({
      logueado: (s) => s.auth.logged
    })
  },

  watch: {
    //
  },

  created() {
    if (process.env.NODE_ENV == "development") {
      this.email = InitForm.username;
      this.password = InitForm.password;
    }
  },

  mounted() {
    // $(".form-control")
    //   .on("focus blur", function(e) {
    //     $(this)
    //       .parents(".form-group")
    //       .toggleClass("focused", e.type === "focus");
    //   })
    //   .trigger("blur");
  },

  methods: {
    ...mapActions({
      logout: "auth/logout",
      login: "auth/login"
    }),
    sendForm() {
      this.login({
        username: this.email,
        password: this.password
      }).then(
        () => {
          this.afterLogged(this);
        },
        (err) => {
          this.$store.dispatch("showError", err);
        }
      );
    }
  }
};
</script>
<style></style>
