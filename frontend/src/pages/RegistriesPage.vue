<template>
    <q-page class="flex flex-center column">
      <q-form
        @submit="addRegistry"
        style="width: 85%; margin: 2rem; display: flex; flex-direction: row; justify-content: space-between"
      >
        <q-input standout="bg-primary text-white" style="flex: 1" v-model="registry.name" label="Name*" clearable clear-icon="close" />
        <q-input standout="bg-primary text-white" style="flex: 1.5; margin-left: 1rem" v-model="registry.ip" label="IP address or DNS" clearable clear-icon="close" :prefix="registry.secure ? 'https://' : 'http://'" />
        <q-input standout="bg-primary text-white" style="flex: .5; margin-left: 1rem;" v-model="registry.port" label="Port" clearable clear-icon="close"  />
        <q-checkbox v-model="registry.secure" style="margin-left: 1rem" />
        <q-input standout="bg-primary text-white" style="flex: 1; margin-left: 1rem" v-model="registry.username" label="Username" clearable clear-icon="close" />
        <q-input standout="bg-primary text-white" style="flex: 1; margin-left: 1rem" v-model="registry.password" label="Password" clearable clear-icon="close" type="password" />
        <q-btn label="Add registry" type="submit" style="margin-left: 1rem;" color="primary" />
      </q-form>
      <q-table
        title="Container registries"
        :rows="registries"
        :columns="columns"
        row-key="name"
        no-data-label="Didn't find any container registries. Add one with the form above!"
        style="width: 85%; margin: 2rem"
      >
        <template v-slot:body-cell-enabled="props">
          <q-td :props="props">
            <div>
              <q-toggle v-model="props.row.enabled" color="primary" />
            </div>
          </q-td>
        </template>
  
        <template v-slot:body-cell-remove="props">
          <q-td :props="props">
            <div>
              <q-btn
                @click="removeRegistry(props.row.name)"
                color="negative"
                icon="delete_outline"
                round
                dense
                flat
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-page>
  </template>
  
  <script setup>
  defineOptions({
    name: "IndexPage",
    data() {
      return {
        columns: [{
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        }, {
          name: 'ip',
          required: true,
          label: 'IP Address or DNS',
          align: 'center',
          field: 'ip',
          sortable: true,
        }, {
          name: 'port',
          required: true,
          label: 'Port',
          align: 'center',
          field: 'port',
          sortable: true,
        }, {
          name: 'username',
          required: true,
          label: 'Username',
          align: 'center',
          field: row => row.username || 'anonymous',
          sortable: true,
        }, {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'center',
          field: 'status',
          sortable: true,
        }, {
          name: 'default',
          required: true,
          label: 'Default',
          align: 'center',
          field: 'default',
          sortable: true,
        }, {
          name: 'remove',
          label: 'Remove',
          align: 'right',
        }],
        registries: [],
        registry: {
          name: "docker",
          ip: "registry.hub.docker.com",
          port: "80",
          secure: true,
          username: null,
          password: null,
        }
      }
    },
    methods: {
      addRegistry: function () {
        this.$api.post("/registries/add", this.registry).then((res) => {
          this.getRegistries()
        }).catch((e) => { 
          console.log(e) 
          this.$q.notify({ type: 'negative', message: e.response.data.error })
        })
      },
      getRegistries: function () {
        this.$api.get("/registries").then((res) => {
          this.registries = res.data
        }).catch((e) => { 
          console.log(e)
          this.$q.notify({ type: 'negative', message: 'Failed to retrive container registries list' })
        })
      },
      removeRegistry: function (name) {
        this.$api.post("/registries/remove", { name }).then((res) => {
          this.getServers()
        }).catch((e) => { 
          console.log(e)
          this.$q.notify({ type: 'negative', message: 'Failed to remove the container registry' })
        })
      }
    },
    mounted() {
      this.getRegistries()
    }
  })
  </script>
  