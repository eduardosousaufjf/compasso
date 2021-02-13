<template>
  <div>
    <q-card
      class="list"
      @click="onUserClick(currentUser)"
    >
      <q-card-section>
        <div class="row">
          <q-avatar>
            <img :src="currentUser.avatar_url" :alt="currentUser.login" />
          </q-avatar>
          <p class="q-mx-auto q-my-auto">{{ currentUser.login }}</p>
        </div>
      </q-card-section>
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

<style lang="scss" scoped>
.list {
  width: 280px;
  padding-left: 0;
  padding-right: 0;
}

</style>
