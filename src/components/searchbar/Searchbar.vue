<template>
  <div class="searchbar">
    <q-input
      v-model="searchText"
      debounce="500"
      @input="()=> searchUser(searchText)"
      filled
      type="search"
      label="Usuário"
      hint="Digite o nome de um usuário"
      :loading="loading"
      @click="onInputClick"
      @focusout="onInputBlur"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list
      class="searchbar__list"
      v-if="(userList.length > 0) && showUserList === true">
      <q-item
        v-for="user in userList"
        :key="user.id"
        class="searchbar__item"
      >
        <user-view
          @clicked="onUserClicked"
          :current-user="user"
          class="user_view"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import UserStoreModule from 'src/store/user';
import { UserInterface } from 'src/model/User.class';
import UserSearchListViewComponent from 'components/user/search_list_view/UserSearchListViewComponent.vue';

@Component({
  components: {
    'user-view': UserSearchListViewComponent
  }
})
export default class Searchbar extends Vue {

  searchText = '';

  loading = false;

  showUserList = false;

  usersStore = getModule(UserStoreModule);

  currentSelectedUser: Partial<UserInterface> = {};

  searchUser(term: string) {
    this.loading = true;
    this.usersStore.searchUser(term)
      .then(() => this.showUserList = true)
      .catch(() => this.$q.notify({ type: 'negative', message: 'Problema ao recuperar dados de usuários.' }))
      .finally(() => this.loading = false);
  }

  onUserClicked(user: UserInterface) {
    this.usersStore.context.commit('fetchUserMutation', user);
    this.showUserList = false;
  }

  onInputClick() {
    if (!this.showUserList && this.userList.length > 0) this.showUserList = true;
  }

  onInputBlur() {
    setTimeout(() => this.showUserList = false, 200);
  }

  get userList(): UserInterface[] {
    return this.usersStore.searchedUsers;
  }

}
</script>
<style lang="scss" scoped>
.searchbar {

}

.searchbar__list {
  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  position: absolute;
  z-index: 10000;
}

.searchbar__item {
  padding: 5px 0;
}

.user_view {
  margin: 0 auto;
}
</style>
