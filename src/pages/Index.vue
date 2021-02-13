<template>
  <q-page class="row content-start">
    <div class="col-10 col-md-12 q-mx-auto">
      <q-card
        class="main_card">
        <q-card-section>
          <h4>Pesquisa por usuários do Github</h4>
        </q-card-section>
        <q-card-section class="text-subtitle1">
          Procure por um usuário do Github pelo seu nome. <br />
          Veja os repositórios que ele possui e os repositórios favoritados.
        </q-card-section>
      </q-card>
    </div>
    <div class="col-10 col-md-12 q-mx-auto">
      <searchbar
        class="searchbar" />
    </div>
    <user-view
      class="col-10 col-md-12 q-mx-auto"
    />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Searchbar from 'components/searchbar/Searchbar.vue';
import UserViewProfileComponent from 'components/user/view_profile/UserViewProfileComponent.vue';

@Component({
  components: { Searchbar, 'user-view': UserViewProfileComponent }
})
export default class PageIndex extends Vue {

};
</script>

<style lang="scss">
.main_card {
  background: linear-gradient(
      180deg, hsl(0deg 0% 100% / 0%), #fff), linear-gradient(
      70deg, #f1f8ff 32%, #dcffe4);
  margin: 30px auto;
}

.searchbar {
  max-width: 300px;
  margin: 30px 0;
}
</style>
