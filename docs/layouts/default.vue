<template>
  <div>
    <nav class="navbar">
      <div class="navbar__start">
        <div class="navbar__brand">
          <router-link to="/" class="navbar__item" exact>Vue A11Y Calendar {{ version }}</router-link>
        </div>
        <div class="navbar__components">
          <router-link v-for="i in nav" :key="i.title" :to="i.to" class="navbar__item">{{ i.title }}</router-link>
        </div>
      </div>

      <div class="navbar__end">
        <select class="navbar__select" v-model="locale">
          <option v-for="l in $store.getters.locales" :key="l" :value="l">
            {{ l.toUpperCase() }}
          </option>
        </select>
        <a target="_github" href="https://github.com/IBM/vue-a11y-calendar" class="navbar__item" rel="noopener noreferrer">
          Github
        </a>
      </div>
    </nav>

    <nuxt/>

  </div>
</template>

<script>

export default {
  mounted() {
    this.$store.dispatch('UPDATE_LOCALE', localStorage.getItem('locale'));
  },
  computed: {
    version: () => process.env.version,
    nav: () => [
      {
        title: 'Calendar',
        to: '/components/calendar',
      },
      {
        title: 'Datepicker',
        to: '/components/datepicker',
      },
    ],
    locale: {
      get() {
        return this.$store.state.locale;
      },
      set(value) {
        this.$store.dispatch('UPDATE_LOCALE', value);
      },
    },
  },
};
</script>
