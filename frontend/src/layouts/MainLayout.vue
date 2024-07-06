<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Container image updater </q-toolbar-title>

        <q-btn outline flat rounded><q-avatar icon="refresh" /> Refresh</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Main menu </q-item-label>
        <router-link
          :to="item.path"
          style="color: black; text-decoration: none"
          v-for="item in nav"
          :key="item"
          :v-bind="nav"
        >
          <q-item clickable>
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle2">{{
                item.title
              }}</q-item-label>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "MainLayout",
});

const nav = [
  {
    title: "Containers",
    caption: "Manage containers",
    icon: "view_in_ar",
    path: "/",
  },
  {
    title: "Images",
    caption: "Image details",
    icon: "album",
    path: "/images",
  },
  {
    title: "Registries",
    caption: "Registry settings",
    icon: "anchor",
    path: "/registires",
  },
  {
    title: "Servers",
    caption: "Managed docker instances",
    icon: "storage",
    path: "/servers",
  },
  {
    title: "Settings",
    caption: "General settings",
    icon: "settings",
    path: "/settings",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
