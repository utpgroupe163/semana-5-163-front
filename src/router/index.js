import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      public: true
    },
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },

  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{
      public: true
    },
  },

  {
    path: '/gestion',
    name: 'Gestion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gestion" */ '../views/Gestion.vue'),
    meta:{
      auth: true
    },
    children: [
      {
        path: 'articulo',
        name: 'Articulo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "articulo" */ '../views/Articulo.vue'),
        meta:{
          //auth: true
          Adminsitrador: true,
          Vendedor: true,
          Almacenero: true,
        },
      },

      {
        path: 'categoria',
        name: 'Categoria',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
        meta:{
          //auth: true
          Adminsitrador: true,
          Vendedor: true,
        },
      },

      {
        path: 'usuario',
        name: 'Usuario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "usuario" */ '../views/Usuario.vue'),
        meta:{
         //auth: true
         Adminsitrador: true,
        },
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Activar cuando haya conexion con la base de datos sini no deja ingresar a los módulos de gestion:

router.beforeEach ((to, from, next) =>{
  if(to.matched.some(record => record.meta.public)){
    next();
  }else if(to.matched.some(record => record.meta.auth)){
    if(store.state.user){     //&& store.state.user.rol === 'Administrador'){   ¿?
      next();
    }else {                   //if(store.state.user && store.state.user.rol === 'Vendedor'){   ¿?
      next({name: 'Login'})
    }
  }else{
    next();
  }
})

export default router
