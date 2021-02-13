<template>
  <q-layout
    view="HHh Lpr fFf"
    class="layout"
  >
    <q-header
      class="header"
      elevated>
      <q-toolbar
        @click="$router.push({path:'/'})"
        class="menu cursor-pointer">

        <q-toolbar-title>
          <q-icon
            name="fab fa-github"
            size="30px"
            class="menu__icon"

          />
          Desafio Técnico
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container
      class="page_container"
    >
      <router-view />
    </q-page-container>

    <q-footer
      class="footer">
      <q-toolbar>
        <q-toolbar-title
          class="text-center text-subtitle1">
          José Eduardo de Azevedo Sousa - 2021
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class MainLayout extends Vue {
}
</script>

<style lang="scss">

.header {
  background-color: #23292E;
}

.menu {
  margin-top: 5px;
  margin-bottom: 5px;
}

.menu__icon {
  margin-right: 5px;
}

.footer {
  background-color: #23292E;
}

.layout {
  background-color: #F6F8FA;
}

.page_container {
  margin: 0 auto;
  max-width: 800px;
}

</style>
