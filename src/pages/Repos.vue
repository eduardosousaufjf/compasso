<template>
  <q-page class="row content-start">
    <div class="col-10 col-md-12 q-mx-auto">

      <q-breadcrumbs class="q-mt-md text-primary">
        <q-breadcrumbs-el label="Início" icon="home" to="/"></q-breadcrumbs-el>
        <q-breadcrumbs-el label="Repositórios" icon="fab fa-github"></q-breadcrumbs-el>
      </q-breadcrumbs>

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


    <q-card v-if="!loading && repos.length === 0">
      <q-card-section>
        Este usuário não possui repositórios
      </q-card-section>
    </q-card>

    <template v-else>
      <q-card
        v-for="repositorio in repos"
        :key="repositorio.id"
        class="col-10 col-md-12 q-mx-auto q-mb-md"
      >
        <q-list>
          <q-item clickable @click="navigate(repositorio.html_url)">
            <q-item-section>
              <div class="row">
                <b>{{ repositorio.name }}</b>
                <q-icon
                  name="fas fa-link"
                  color="primary"
                  class="q-ml-sm"
                >
                </q-icon>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="lock" />
            </q-item-section>
            <q-item-section>
              {{ repositorio.private ? 'Privado' : 'Público' }}
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="description" />
            </q-item-section>

            <q-item-section
              v-if="repositorio.description"
              class="item__description"
            >
              {{ repositorio.description }}
            </q-item-section>
            <q-item-section v-else>
              Sem descrição
            </q-item-section>
          </q-item>
          <q-separator />

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="today" />
            </q-item-section>

            <q-item-section>
              Atualizado em {{ new Date(repositorio.updated_at).toLocaleDateString() }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </template>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UserStoreModule from 'src/store/user';
import { RepoInterface } from 'src/model/Repo.class';

@Component({
  components: {}
})
export default class Repos extends Vue {

  storeUser = getModule(UserStoreModule);

  userLogin = '';

  loading = false;

  navigate(url: Location): void {
    window.location = url;
  }

  mounted() {
    this.loading = true;
    this.userLogin = this.$route.params['username'];
    this.storeUser.fetchUserRepos(this.userLogin)
      .then(response => console.log(response))
      .catch(err => console.log(err))
      .finally(() => this.loading = false
      );
  }

  get repos(): RepoInterface[] {
    return this.storeUser.userRepos;
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
