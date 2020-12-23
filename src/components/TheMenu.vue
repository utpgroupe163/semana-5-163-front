<template>
  <v-bottom-navigation
    class="pa-md-2 mx-lg-auto"
    :value="value"
    color="orange"
    grow
  >
    <v-btn>
      <a href="http://localhost:8080/">
      <span>Inicio</span>
      <v-icon>mdi-home</v-icon>
      </a>
    </v-btn>

    <v-btn>
      <a href="#Servicios">
      <span>Servicios</span>
      <v-icon>mdi-tools</v-icon>
      </a>
    </v-btn>

    <v-btn>
      <a href="#Precios">
      <span>Precios</span>
      <v-icon>mdi-table</v-icon>
      </a>
    </v-btn>

    <v-btn>
      <a href="#Testimonios">
      <span>Testimonios</span>
      <v-icon>mdi-file</v-icon>
      </a>
    </v-btn>

    <v-btn>
      <a href="http://localhost:8080/login">
      <span>Zona de gestión</span>
      <v-icon>mdi-account</v-icon>
      </a>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>