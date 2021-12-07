import accountService from '@/services/account';

export const birthdayVisibilityType = {
  NONE: 0,
  FULL: 1,
  PARTIAL: 2,
};

export const sexType = {
  NONE: 0,
  WOMAN: 1,
  MAN: 2,
};

export default {
  namespaced: true,

  state: {
    account: null,
    users: [],
  },

  getters: {
    account: (state) => {
      if (!state.account) {
        return null;
      }

      return {
        ...state.account,
        user: state.users.find((o) => o.id === state.account.id),
      };
    },
    userName: (state) => `${state.account.first_name} ${state.account.last_name}`,
    users: (state) => state.users,
    partnerName: (state) => {
      if (!state.account.relation_partner) {
        return null;
      }

      const partner = state.users.find((o) => o.id === state.account.relation_partner.id);
      if (!partner) {
        return null;
      }

      return state.account.sex === sexType.MAN
        ? `${partner.first_name_abl} ${partner.last_name_abl}`
        : `${partner.first_name_ins} ${partner.last_name_ins}`;
    },
  },

  actions: {
    async init({ commit }) {
      const account = await accountService.getProfileInfo();
      commit('setAccount', account);

      {
        const user = await accountService.getUsers();
        commit('setUser', user);
      }

      if (account.relation_partner) {
        const user = await accountService.getUsers(account.relation_partner.id);
        commit('setUser', user);
      }
    },
  },

  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },

    setUser(state, payload) {
      if (!state.users.find((o) => o.id === payload.id)) {
        state.users.push(payload);
      }
    },

    setUsers(state, payload) {
      for (let i = 0; i < payload.length; i += 1) {
        if (!state.users.find((o) => o.id === payload[i].id)) {
          state.users.push(payload[i]);
        }
      }
    },
  },
};
