<template >

  <v-container >
    <div >
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="450"
      ></v-carousel-item>
      </v-carousel>
    </div>
  
    <br>
    <br>

    <h2>NOSOTROS</h2>
    <div>
      <v-carousel :show-arrows="false"  hide-delimiters>
        <v-carousel-item
          v-for="(us,i) in nosotros"
          :key="i"
          :src="us.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="450"
          
      ></v-carousel-item>
      </v-carousel>
    </div>

    <br>
    <br>

    <h2 id="Servicios">SERVICIOS</h2>
    <div>
      <v-carousel :show-arrows="false" hide-delimiters>
        <v-carousel-item
          v-for="(serva,i) in serv1"
          :key="i"
          :src="serva.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="300"
      ></v-carousel-item>
      </v-carousel>
    </div>

    <div>
      <v-carousel :show-arrows="false" hide-delimiters>
        <v-carousel-item
          v-for="(servb,i) in serv2"
          :key="i"
          :src="servb.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="300"
      ></v-carousel-item>
      </v-carousel>
    </div>
    
    <div>
      <v-carousel :show-arrows="false" hide-delimiters>
        <v-carousel-item
          v-for="(servc,i) in serv3"
          :key="i"
          :src="servc.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="300"
      ></v-carousel-item>
      </v-carousel>
    </div>
   
    
    <div>
      <v-carousel :show-arrows="false" hide-delimiters>
        <v-carousel-item
          v-for="(servd,i) in serv4"
          :key="i"
          :src="servd.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="300"
      ></v-carousel-item>
      </v-carousel>
    </div>

    <br>
    <br>

    <h2 id="Precios">PRECIOS</h2>
    <div>
      <v-carousel :show-arrows="false" hide-delimiters>
        <v-carousel-item
          v-for="(precio,i) in precios"
          :key="i"
          :src="precio.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="450"
      ></v-carousel-item>
      </v-carousel>
    </div>

    <br>
    <br>

    <h2 id="Testimonios">TESTIMONIOS</h2>
    <div>
      <v-carousel>
        <v-carousel-item
          v-for="(testimonio,i) in testimonios"
          :key="i"
          :src="testimonio.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          min-height="300"
      ></v-carousel-item>
      </v-carousel>
    </div>
    <br>
    <br>

    <v-footer
      padless
      
    >
      <v-card
        flat
        tile
        class="grey darken-4 white--text text-center"
        height="350px"
        width="1500px"
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
   </v-container>
   
</template>

<script>

  export default {
    name: 'HelloWorld',

    data () {
      return {
        items: [
          {
            src: './imgs/slider1.jpg',
          },
          {
            src: './imgs/slider2.jpg',
          },
          {
            src: './imgs/slider3.jpg',
          },
        ],

        nosotros: [
          {
            src: './imgs/nosotros.jpg',
          }
        ],

        serv1: [
          {
            src: './imgs/servicio1.jpg',
          }
        ],

        serv2: [
          {
            src: './imgs/servicio2.jpg',
          }
        ],

        serv3: [
          {
            src: './imgs/servicio3.jpg',
          }
        ],

        serv4: [
          {
            src: './imgs/servicio4.jpg',
          }
        ],

        precios: [
          {
            src: './imgs/precios.jpg',
          }
        ],

        testimonios: [
          {
            src: './imgs/testimonio1.jpg',
          },
          {
            src: './imgs/testimonio2.jpg',
          },
          {
            src: './imgs/testimonio3.jpg',
          },
          {
            src: './imgs/testimonio4.jpg',
          },
        ],

        icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      }
    },

    
  }
</script>

<style scoped>
  .generic_background {
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  }
</style>