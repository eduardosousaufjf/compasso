<template>
  <q-page class="row content-start q-my-md">
    <div class="col-10 col-md-12 q-mx-auto" id="indexContainer">

      <q-breadcrumbs class="text-primary">
        <q-breadcrumbs-el label="Início" icon="home"></q-breadcrumbs-el>
      </q-breadcrumbs>

      <q-card
        class="main_card">
        <q-card-section>
          <div class="text-h5"> Pesquisa por usuários do Github</div>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          Procure por um usuário do Github pelo seu nome. <br />
          Veja os repositórios que ele possui e os repositórios favoritados.
        </q-card-section>
      </q-card>

      <searchbar />
      <user-view />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Searchbar from 'components/searchbar/Searchbar.vue';
import UserViewProfileComponent from 'components/user/view_profile/UserViewProfileComponent.vue';
import { getModule } from 'vuex-module-decorators';
import UserStoreModule from 'src/store/user';

@Component({
  components: { Searchbar, 'user-view': UserViewProfileComponent }
})
export default class PageIndex extends Vue {

  storeUser = getModule(UserStoreModule);

  mounted() {
    this.storeUser.resetCurrentUserMutation();
  }
};
</script>

<style lang="scss" scoped>
.main_card {
  background: linear-gradient(
      180deg, hsl(0deg 0% 100% / 0%), #fff), linear-gradient(
      70deg, #f1f8ff 32%, #dcffe4);
  margin: 30px auto;
}

#indexContainer > * {
  margin-bottom: 30px;
}
</style>
