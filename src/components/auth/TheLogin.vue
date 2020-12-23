<template>
  <v-layout align-center justify-center class="generic_background">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="">
          <v-toolbar-title>Acceso Zona Gestión</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="login.email"
              name="login"
              label="Email"
              id="login"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              name="password"
              label="Contraseña"
              id="password"
              type="password"
              required

            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
             
            color="blue" 
            :disabled="!(this.login.email && this.login.password)" 
            @click="loginUser"
          >
            Ingresar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template> 

<script>
import swal from "sweetalert";
import axios from "axios";

export default {
  name: 'TheLogin',
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },

  beforecreate () {
      this.$store.dispatch('autoLogin')? this.$router.push({name: 'Gestion'}) : false;
  },

  methods: {
    loginUser() {
      axios.post("http://localhost:3000/api/usuario/login", this.login)
        .then(response => {
          return response.data; 
        })
        .then(data => {
          this.$store.dispatch('guardarToken', data.tokenReturn);
          this.$router.push({name: 'Gestion'});
          swal("Login Correcto", `Los datos son correctos, bienvenido` , "success");
          console.log(data);
        })
        .catch(error => {
          swal("Login Incorrecto", "Usuario inválido, por favor revise la información digitada", "error");
          console.log("error");
          return error;
        })
    }
  }
}
</script>
<style scoped>
  .generic_background {
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  }
</style>