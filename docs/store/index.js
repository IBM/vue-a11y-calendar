
/* eslint-disable no-param-reassign */

import LOCALES from '../locales';

export default {
  state: () => ({
    locale: 'en-us',
  }),
  getters: {
    locales: () => LOCALES,
  },
  mutations: {
    SET_LOCALE(state, locale) {
      state.locale = locale;
    },
  },
  actions: {
    UPDATE_LOCALE({ commit }, locale) {
      if (!locale || !LOCALES.includes(locale)) {
        return;
      }
      if (localStorage) {
        localStorage.setItem('locale', locale);
      }
      commit('SET_LOCALE', locale);
    },
  },
};
