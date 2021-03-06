<template>
  <v-data-table
    :headers="headers"
    :items="categorias"
    sort-by="id"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>CATEGORÍAS</v-toolbar-title>
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
              Agregar categoría
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
                  
                  </v-col>

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
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripción"
                      counter="254"
                      no-resize
                      auto-grow
                    ></v-textarea>
                  </v-col> 

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="editedIndex !== -1"
                  >
                    <v-row
                      align="center"
                      justify="space-around"
                    >
                      <v-btn 
                        @click="enableCategory()" 
                        color="success"
                        :loading="buttonLoading"
                        :disabled="buttonLoading"
                      >
                        Habilitar
                      </v-btn>
                      <v-btn 
                        @click="disableCategory()" 
                        color="error"
                        :loading="buttonLoading"
                        :disabled="buttonLoading"
                      >
                        Deshabilitar
                      </v-btn>
                    </v-row>
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
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
name: 'DataTableCategoria',
data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true, 
      headers: [
        { text: 'ID', value: 'id'},
        {
          text: 'Categoría',
          align: 'start',
          sortable: true,
          value: 'nombre', //Igual a como se llame en el modelo
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      buttonLoading: false,
      categorias: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        descripcion: '',
      },
      defaultItem: {
        nombre: '',
        descripcion: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva categoría' : 'Editar categoría'
      },
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

      list() {
         axios.get('http://localhost:3000/api/categoria/list', {
          headers:{
            'Token': localStorage.getItem('token')
          }
        }) // Consume la appi
        .then(
          response => {
            const userData = response.data.map(
            category => category.estado === 1 ? {...category, estado: 'Activo'} : {...category, estado: 'Inactivo'}
            );
            this.categorias = userData;
            this.cargando = false;
          }
        )
        .catch(error=> {
          return error;
        })
      },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

       enableCategory () {
        this.buttonLoading = true;
        axios.put("http://localhost:3000/api/categoria/activate", {
            "id": this.editedItem.id,
          }, {
            headers: {
              'Token': localStorage.getItem('token')
          }
        })
        .then(response => {
          this.list();
          this.buttonLoading = false;
        }).catch(error => {
          this.buttonLoading = false;
          return error;
        })
      },

      disableCategory () {
        this.buttonLoading = true;
        axios.put("http://localhost:3000/api/categoria/deactivate", {
            "id": this.editedItem.id,
          }, {
            headers: {
              'Token': localStorage.getItem('token')
          }
        })
        .then(response => {
          this.buttonLoading = false;
          this.list();
        }).catch(error => {
          this.buttonLoading = false;
          return error;
        })
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
          axios.put("http://localhost:3000/api/categoria/deactivate", { // Consume la appi
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
        } else {
            axios.put("http://localhost:3000/api/categoria/activate", { // Consume la appi
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
          axios.put("http://localhost:3000/api/categoria/update", { // Consume la appi
            "id": this.editedItem.id,
            "nombre": this.editedItem.nombre,
            "descripcion": this.editedItem.descripcion
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
            axios.post("http://localhost:3000/api/categoria/add", { // Consume la appi
            "nombre": this.editedItem.nombre,
            "descripcion": this.editedItem.descripcion
            
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