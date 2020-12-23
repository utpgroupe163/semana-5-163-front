<template>
  <v-data-table
    :headers="headers"
    :items="articulos"
    sort-by="id"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>ARTÍCULOS</v-toolbar-title>
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
              Agregar artículo
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
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
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
                  >
                    <v-select
                      v-model="categoria"
                      label="Categoría"
                      :items="categorias"
                      item-text="nombre"
                      item-value="id"
                      return-object
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.codigo"
                      label="Código"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.estado"
                      label="Estado"
                    ></v-text-field>
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
name: 'DataTableArticulo',
data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true, 
      headers: [
        { text: 'ID', value: 'id'},
        {
          text: 'Artículo',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Categoría', value: 'categoria.nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Código', value: 'codigo' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      articulos: [],
      categoria: [],
      categorias: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        nombre: '',
        descripcion: '',
        codigo: '',
        categoria: {
          id: 0,
          nombre:''
        },
        estado: 0,
      },
      defaultItem: {
        id: 0,
        nombre: '',
        descripcion: '',
        codigo: '',
       categoria: {
          id: 0,
          nombre:''
        },
        estado: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo artículo' : 'Editar artículo'
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
      this.listCategorias();
    },

    methods: {

      list(){
        axios.get('http://localhost:3000/api/articulo/list',  {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
        .then(
          response => {
            this.articulos = response.data;
            this.cargando = false;
          }
        )
        .catch(error=> {
          return error;
        })
      },

      listCategorias(){
        axios.get('http://localhost:3000/api/categoria/list', {
          headers:{
            'Token': localStorage.getItem('token')
          }
        })
        .then(
          response => {
            this.categorias = response.data;
          }
        )
        .catch(error=> {
          return error;
        })
      },

      editItem (item) {
        this.editedIndex = item.id;
        this.categoria = item? item.categoria : '';
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
          axios.put("http://localhost:3000/api/articulo/deactivate", { // Consume la appi
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
            axios.put("http://localhost:3000/api/articulo/activate", { // Consume la appi
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
          this.editedItem = Object.assign({}, this.defaultItem);
          this.categoria = '';
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.categoria = ''
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          axios.put("http://localhost:3000/api/articulo/update", { // Consume la appi
            "id": this.editedItem.id,
            "nombre": this.editedItem.nombre,
            "descripcion": this.editedItem.descripcion,
            "codigo": this.editedItem.codigo,
            "categoria": this.categoria.id, // verificar nombre en back
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
            axios.post("http://localhost:3000/api/articulo/add", { // Consume la appi
            "nombre": this.editedItem.nombre,
            "descripcion": this.editedItem.descripcion,
            "codigo": this.editedItem.codigo
            //"categoriaId": this.categoria.id, // verificar nombre en back
            //"estado": 1
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