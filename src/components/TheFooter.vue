<template>
  <v-footer
    padless
    padless
  >
    <v-card
      flat
      tile
      class="grey darken-4 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="30px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <p>Esta landing page en netamente académica con el objetivo de dar cumplimiento al último reto (sprint 5) del ciclo 3 del programa Misión TIC 2022, implementado por el MinTIC de Colombia y, en nuestro caso, operado por la Universidad Tecnológica de Pereira -UTP.</p>
        <p>El grupo de trabajo esta conformado por Vanessa Aguado, Rolando Ospina, Erick Paredes y Jairo Pachón, nos puede contactar vía correo electrónico: rolando.ospina@hotmail.com o jpachon85@gmail.com o al número celular 3003790458.</p>
        <p><a href="https://github.com/utpgroupe163/semana-4-163.git" target="_blank" class="white--text pt-0">https://github.com/utpgroupe163/semana-4-163.gitt</a></p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>© Copyright: Groupe 163 UTP Misión TIC 2022</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>
