<template>
  <q-page class="flex flex-center column">
    <q-card
      style="width: 85%; margin: 2rem"
      v-for="container in containers"
      :key="container.id"
    >
      <q-card-section>
        <span class="text-h6">Container <b>{{ container.name }}</b> </span>
        <q-chip
          outline
          color="orange"
          icon="error_outline"
          style="float: right"
          v-if="isUpdateAvailable(container)"
        >
          {{ container.updaterConfig.availableImage }} ({{
            container.updaterConfig.availableImageId
          }})
        </q-chip>

        <q-chip
          outline
          color="primary"
          icon="storage"
          style="float: right"
        >
          {{ container.server }}
        </q-chip>

        <q-chip
          outline
          color="green"
          icon="check_circle_outline"
          style="margin-right: 1rem; float: right"
          v-if="container.state === 'running'"
        >
          {{ container.state }}
        </q-chip>

        <p>
          Container ID: <span class="text-subtitle2">{{ container.id }}</span>
          <br />
          State:
          <span class="text-subtitle2">
            {{ container.state }} ({{ container.status }})
          </span>
          <br />
          Image: <span class="text-subtitle2">{{ container.image }}</span>
          <br />
          Image ID:
          <span class="text-subtitle2">{{ container.imageId }}</span>
        </p>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat><q-icon name="upgrade"></q-icon> Upgrade now</q-btn>
        <q-btn
          flat
          v-if="!container.updaterConfig.auto"
          @click="container.updaterConfig.auto = !container.updaterConfig.auto"
          ><q-icon name="update"></q-icon> Enable auto upgrade</q-btn
        >
        <q-btn
          flat
          v-if="container.updaterConfig.auto"
          @click="container.updaterConfig.auto = !container.updaterConfig.auto"
          ><q-icon name="update_disabled"></q-icon> Disable auto upgrade</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>

defineOptions({
  name: "IndexPage",
  data() {
    return {
      containers: [
        {
          name: "xxxx",
          server: 'localhost',
          id: "ee4t5b7bdbijwe",
          state: "running",
          status: "4 hours",
          image: "docker.io/xxx/xxx:v1.23",
          imageId: "sha256:2r3u2990c9ruc4cru9uwa908j923m90809i3",
          updaterConfig: {
            auto: true,
            rule: "",
            availableImage: 1.24,
            availableImageId: "sha256:f489udvoowjef8498r2u39f23098r098uee",
            readyForUpdate: false,
          },
        },
      ],
    };
  },
  methods: {
    isUpdateAvailable: (container) => {
      if (!container.updaterConfig.availableImageId) return false
      console.log("hi")
      return container.imageId == container.updaterConfig.availableImageId;
    },
  },
  mounted() {
    this.$api.get("/containers").then((res) => { 
      this.containers = res.data
    }).catch((e) => { console.log(e) })
  }
})
</script>
