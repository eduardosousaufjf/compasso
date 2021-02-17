<template>
  <div class="col-12">
    <q-card
      @click="onUserClick(currentUser)"
    >
      <q-item clickable>
        <div class="row">
          <q-avatar class="q-mr-md">
            <img :src="currentUser.avatar_url" :alt="currentUser.login" />
          </q-avatar>
          <p class="q-mr-auto q-my-auto">{{ currentUser.login }}</p>
        </div>
      </q-item>
    </q-card>
  </div>
</template>
<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { UserInterface } from 'src/model/User.class';

@Component
export default class UserSearchListViewComponent extends Vue {
  @Prop({
    required: true
  })
  currentUser!: UserInterface;

  onUserClick(user: UserInterface) {
    this.$emit('clicked', user);
  }

}
</script>
