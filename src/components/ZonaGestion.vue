<template>
    <v-app id="inspire">
    
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Zona de Gestión (Grupo 163 • UTP)</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn
      icon
      class="mr-5"
      @click="salir()">
        <v-icon>mdi-logout</v-icon>
        <span>Salir</span>

      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list flat>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{name:item.ruta}"
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-card>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
name: 'ZonaGestion',
    data (){
        return {
            drawer: null,
            selectedItem: 1,
                items: [
                { text: 'Inicio', icon: 'mdi-home', ruta: 'Home'},
                { text: 'Categorías', icon: 'mdi-table', ruta: 'Categoria'},
                { text: 'Artículos', icon: 'mdi-table', ruta: 'Articulo'},
                { text: 'Usuarios', icon: 'mdi-account', ruta: 'Usuario'},
            ],
        } 
    },

    created () {
      this.$store.dispatch('autoLogin');
    },

    methods: {
      salir() {
        this.$store.dispatch('salir');
      }
    }
}
</script>