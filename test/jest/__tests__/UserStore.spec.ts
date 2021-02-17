import UserStoreModule from 'src/store/user';

describe('User store test', () => {
  // DUMMY test, you should remove this and add your own tests
  test('state is properly started', () => {
    // const wrapper = factory(); // <= when no props are needed
    // const wrapper = factory({ propName: propValue }); <= when props are needed
    // expect(wrapper).toBeTruthy();
    expect(UserStoreModule.state['currentUserInternal']).toEqual(
      {
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
      }
    );

    expect(UserStoreModule.state['searchedUsersInternal']).toEqual([]);
    expect(UserStoreModule.state['userReposInternal']).toEqual([]);
    expect(UserStoreModule.state['userStarredInternal']).toEqual([]);

  });

  test('mutation fetchUserMutation properly change the state', () => {

    const state = { ...UserStoreModule.state };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { fetchUserMutation } = UserStoreModule.mutations;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetchUserMutation(state, { login: 'foo' });

    expect(state.currentUserInternal['login']).toEqual('foo');
  });

  test('mutation searchUserMutation properly change the state', () => {

    const state = { ...UserStoreModule.state };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { searchUserMutation } = UserStoreModule.mutations;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    searchUserMutation(state, [{ login: 'foo' }]);

    expect(state.searchedUsersInternal.length).toBe(1);
    expect(state.searchedUsersInternal[0]['login']).toEqual('foo');
  });

  test('mutation fetchUserReposMutation properly change the state', () => {

    const state = { ...UserStoreModule.state };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { fetchUserReposMutation } = UserStoreModule.mutations;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetchUserReposMutation(state, [{ name: 'bar' }]);

    expect(state.userReposInternal.length).toBe(1);
    expect(state.userReposInternal[0]['name']).toEqual('bar');
  });

  test('mutation fetchUserStarredMutation properly change the state', () => {

    const state = { ...UserStoreModule.state };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { fetchUserStarredMutation } = UserStoreModule.mutations;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetchUserStarredMutation(state, [{ name: 'bar' }]);

    expect(state.userStarredInternal.length).toBe(1);
    expect(state.userStarredInternal[0]['name']).toEqual('bar');
  });

  test('mutation resetCurrentUserMutation properly change the state', () => {

    const state = { ...UserStoreModule.state };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { resetCurrentUserMutation } = UserStoreModule.mutations;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { fetchUserMutation } = UserStoreModule.mutations;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetchUserMutation(state, { login: 'foo' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    resetCurrentUserMutation(state);

    expect(state.currentUserInternal['login']).toBe('');
  });


});
