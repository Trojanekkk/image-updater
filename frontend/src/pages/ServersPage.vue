<template>
  <q-page class="flex flex-center column">
    <q-form
      @submit="addServer"
      style="width: 85%; margin: 2rem; display: flex; flex-direction: row; justify-content: space-between"
    >
      <q-input standout="bg-primary text-white" style="flex: 1" v-model="server.name" label="Name*" clearable clear-icon="close" />
      <q-input standout="bg-primary text-white" style="flex: 1; margin-left: 1rem" v-model="server.ip" label="IP address or DNS" clearable clear-icon="close"  />
      <q-input standout="bg-primary text-white" style="flex: .5; margin-left: 1rem;" v-model="server.port" label="Port" clearable clear-icon="close"  />
      <q-btn label="Add server" type="submit" style="flex: .5; margin-left: 1rem;" color="primary" />
    </q-form>
    <q-table
      title="Servers"
      :rows="servers"
      :columns="columns"
      row-key="name"
      no-data-label="Didn't find any servers. Add one with the form above!"
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
              @click="removeServer(props.row.name)"
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
        name: 'enabled',
        required: true,
        label: 'Enabled',
        align: 'center',
        field: 'enabled',
        sortable: true,
      }, {
        name: 'remove',
        label: 'Remove',
        align: 'right',
      }],
      servers: [],
      server: {
        name: "",
        ip: "",
        port: "2375",
      }
    }
  },
  methods: {
    addServer: function () {
      this.$api.post("/servers/add", this.server).then((res) => {
        this.getServers()
      }).catch((e) => { 
        console.log(e) 
        this.$q.notify({ type: 'negative', message: e.response.data.error })
      })
    },
    getServers: function () {
      this.$api.get("/servers").then((res) => {
        this.servers = res.data
      }).catch((e) => { 
        console.log(e)
        this.$q.notify({ type: 'negative', message: 'Failed to retrive servers list' })
      })
    },
    removeServer: function (name) {
      this.$api.post("/servers/remove", { name }).then((res) => {
        this.getServers()
      }).catch((e) => { 
        console.log(e)
        this.$q.notify({ type: 'negative', message: 'Failed to remove the server' })
      })
    }
  },
  mounted() {
    this.getServers()
  }
})
</script>
