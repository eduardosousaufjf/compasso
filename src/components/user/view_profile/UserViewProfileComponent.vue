<template>
  <div>
    <q-card v-show="currentUser.id !== 0">
      <q-card-section>
        <div class="row">
          <q-avatar>
            <img :src="currentUser.avatar_url" :alt="currentUser.login" />
          </q-avatar>
          <p class="q-mx-auto q-my-auto">{{ currentUser.login }}</p>
        </div>
      </q-card-section>
      <q-separator />
      <q-item
        :to="currentUser.login + '/repo/'"
        clickable>
        <q-icon
          name="fab fa-github"
          size="30px"
          class="q-mr-md"
        />
        <p>Repositórios</p>
      </q-item>
      <q-item
        clickable
        :to="currentUser.login + '/starred/'"
      >
        <q-icon
          name="star"
          size="30px"
          class="q-mr-md" />
        <p>Favoritos</p>
      </q-item>
    </q-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { UserInterface } from 'src/model/User.class';
import { getModule } from 'vuex-module-decorators';
import UserStoreModule from '../../../store/user';

@Component
export default class UserViewProfileComponent extends Vue {

  storeUser = getModule(UserStoreModule);

  get currentUser(): UserInterface {
    return this.storeUser.currentUser;
  }
}
</script>
<style>
p {
  margin: auto 0;
}
</style>
