import Store from 'src/store/index';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';
import { GlobalAxios } from 'app/config/GlobalConfig';
import { UserInterface } from 'src/model/User.class';
import { ENDPOINTS } from 'app/utils/AxiosAPI';

@Module({
  dynamic: true,
  name: 'user',
  namespaced: true,
  store: Store
} as ModuleOptions)

export default class UserStoreModule extends VuexModule {

  private currentUserInternal: UserInterface = {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    name: '',
    company: '',
    blog: '',
    location: '',
    email: '',
    hireable: false,
    bio: '',
    twitter_username: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: ''
  };

  searchedUsersInternal: UserInterface[] = [];

  /**
   * Retorna uma promessa de lista de usuários Github
   * @param userID ID do usuário Github
   */
  @Action({ rawError: true })
  public fetchUser(userID: string): Promise<UserInterface> {
    return new Promise<UserInterface>((accept, reject) => {
      void GlobalAxios.getData('users/' + userID)
        .then((response: UserInterface) => {
          this.context.commit('fetchUserMutation', response);
          accept(response);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Altera o estado da Store 'currentUserInternal'
   * para o usuário atual
   * @param payload
   */
  @Mutation
  fetchUserMutation(payload: UserInterface) {
    this.currentUserInternal = payload;
  }

  /**
   * Procura por usuários do Github a partir de um termo
   * @param term Texto a ser procurado
   */
  @Action
  searchUser(term: string): Promise<UserInterface[]> {
    return new Promise<UserInterface[]>((accept, reject) => {
      GlobalAxios.getData(ENDPOINTS.USER.SEARCH + '?q=' + term + '&per_page=5')
        .then(response => {
          this.context.commit('searchUserMutation', response['items']);
          accept(this.searchedUsers);
        })
        .catch(error => reject(error));
    });
  }

  /**
   * Altera o estado da Store 'searchedUsersInternal'
   * @param payload
   * @private
   */
  @Mutation
  private searchUserMutation(payload: UserInterface[]) {
    this.searchedUsersInternal = payload;
  }

  /**
   * Retorna o usuário atualmente selecionado
   */
  get currentUser(): UserInterface {
    return this.currentUserInternal;
  }

  /**
   * Retorna os usuários resultantes da pesquisa
   */
  get searchedUsers(): UserInterface[] {
    return this.searchedUsersInternal;
  }
}
