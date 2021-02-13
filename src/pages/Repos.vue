<template>
  <q-page class="row content-start">
    <div class="col-10 col-md-12 q-mx-auto">
      <q-card class="repo__card">
        <q-card-section>
          <b>Veja os repositórios</b>
        </q-card-section>
        <q-card-section>
          Procure por um usuário do Github pelo seu nome. <br />
          Veja os repositórios que ele possui e os repositórios favoritados.
        </q-card-section>
      </q-card>
    </div>
    <q-card class="col-10 col-md-12 q-mx-auto" v-if="loading">
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card v-if="!loading">

    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Repos extends Vue {

  userLogin = '';

  loading = false;

  mounted() {
    this.loading = true;
    this.userLogin = this.$route.params['username'];
  }
};
</script>

<style lang="scss">
.repo__card {
  background: linear-gradient(
      180deg, hsl(0deg 0% 100% / 0%), #fff), linear-gradient(
      70deg, #f1f8ff 32%, #dcffe4);
  margin: 30px auto;
}
</style>
