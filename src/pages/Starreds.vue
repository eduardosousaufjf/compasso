<template>
  <q-page class="row content-start">
    <div class="col-10 col-md-12 q-mx-auto">

      <q-breadcrumbs class="q-mt-md text-primary">
        <q-breadcrumbs-el label="Início" icon="home" to="/"></q-breadcrumbs-el>
        <q-breadcrumbs-el label="Favoritos" icon="grade"></q-breadcrumbs-el>
      </q-breadcrumbs>

      <q-card class="repo__card">
        <q-card-section>
          <b class="text-h5">Repositórios favoritos de {{ userLogin }}</b>
        </q-card-section>
        <q-card-section>
          Navegue pelos repositórios favoritos deste usuário.
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

    <q-card
      v-if="!loading && repos.length === 0"
      class="col-10 col-md-12 q-mx-auto">
      <q-card-section>
        {{ userLogin }} não possui repositórios favoritos.
      </q-card-section>
    </q-card>

    <template v-else>
      <q-card
        v-for="repository in repos"
        :key="repository.id"
        class="col-10 col-md-12 q-mx-auto q-mb-md"
      >
        <q-list>
          <q-item clickable @click="navigate(repository.html_url)">
            <q-item-section>
              <div class="row">
                <b>{{ repository.name }}</b>
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
              {{ repository.private ? 'Privado' : 'Público' }}
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="description" />
            </q-item-section>

            <q-item-section
              v-if="repository.description"
              class="item__description"
            >
              {{ repository.description }}
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
              Atualizado em {{ new Date(repository.updated_at).toLocaleDateString() }}
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
export default class Starreds extends Vue {
  storeUser = getModule(UserStoreModule);

  userLogin = '';

  loading = false;

  navigate(url: string): void {
    window.location.href = url;
  }

  mounted() {
    this.loading = true;
    this.userLogin = this.$route.params.username;
    this.storeUser.fetchUserStarred(this.userLogin)
      .catch(() => {
        this.$q.notify({
          message: 'Problema ao recuperar os dados de repositório.',
          type: 'negative'
        });
      })
      .finally(() => {
          this.loading = false;
        }
      );
  }

  get repos(): RepoInterface[] {
    return this.storeUser.userStarred;
  }
};
</script>

<style lang="scss" scoped>
.repo__card {
  background: linear-gradient(
      180deg, hsl(0deg 0% 100% / 0%), #fff), linear-gradient(
      70deg, #f1f8ff 32%, #dcffe4);
  margin: 30px auto;
}
</style>
