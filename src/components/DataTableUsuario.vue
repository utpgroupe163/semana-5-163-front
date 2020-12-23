<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    sort-by="id"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>USUARIOS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    v-if="editedIndex === -1"
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    v-if="editedIndex === -1"
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col> 

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-select
                      v-model="editedItem.Rol"
                      label="Rol"
                      :items="rolItems"
                      return-object
                      single-line
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-switch
                      v-model="switchEstado"
                      v-on:click="deleteItemConfirm()"
                      :label="switchEstado ? 'Activo' : 'Inactivo'"
                    ></v-switch>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <!--v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn-->
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        <template v-if="item.estado">
          toggle-switch
        </template>
        <template v-else>
          mdi-toggle-switch-off
        </template>

        
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="list"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>  
</template>

<script>
import axios from 'axios';

export default {
name: 'DataTableUsuario',
data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true, 
      headers: [
        { text: 'ID', value: 'id'},
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre', //Igual a como se llame en el modelo
        },
        { text: 'Correo', value: 'email' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      rolItems: [
        'Administrador',
        'Vendedor',
        'Almacenero'
      ],
      switchEstado: false,
      usuarios: [],
      categorias: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nombre: '',
        password: '',
        email: '',
        estado: 0,
        Rol:''
      },
      defaultItem: {
        id: '',
        nombre: '',
        password: '',
        email: '',
        estado: 0,
        Rol:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.list();
    },

    methods: {
      
      list(){
        axios.get('http://localhost:3000/api/usuario/list', {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
        .then(
          response => {
            const userData = response.data.map(
              user => user.estado === 1 ? {...user, estado: 'Activo'} : {...user, estado: 'Inactivo'}
            );
            this.usuarios = userData;
            this.cargando = false;
          }
        )
        .catch(error=> {
          return error;
        })
      },

      editItem (item) {
        this.editedIndex = item.id
        this.switchEstado = Boolean(item.estado)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.switchEstado = Boolean(item.estado)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
          this.switchEstado = false;
          axios.put("http://localhost:3000/api/usuario/deactivate", {
            "id": this.editedItem.id,
          }, {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
            .then(response => {
              this.list();
            }).catch(error => {
              return error;
            })
        } 
        else {  
          this.switchEstado = true;
          axios.put("http://localhost:3000/api/usuario/activate", {
            "id": this.editedItem.id,
          }, {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
            .then(response => {
              this.list();
            }).catch(error => {
              return error;
            })
          // this.desserts.push(this.editedItem)
        }
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          axios.put("http://localhost:3000/api/usuario/update", {
            "nombre": this.editedItem.nombre,
            "rol": this.editedItem.Rol,
            "email": this.editedItem.email
          }, {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
            .then(response => {
              this.list();
            }).catch(error => {
              return error;
            })
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
            axios.post("http://localhost:3000/api/usuario/add", {
            "nombre": this.editedItem.nombre,
            "password": this.editedItem.password,
            "email": this.editedItem.email,
            "rol": this.editedItem.Rol
          }, {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
            .then(response => {
              this.list();
            }).catch(error => {
              return error;
            })
          // this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
}
</script>