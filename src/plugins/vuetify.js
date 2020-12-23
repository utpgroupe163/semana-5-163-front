import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';
import colors from 'vuetify/lib/util/colors';


Vue.use(Vuetify);


export default new Vuetify({
  
  theme: {
    
      options: {
        customProperties: true,
      },
    themes: {
      light: { 
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
});
