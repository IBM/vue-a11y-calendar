<template>
  <div>
    <nav class="navbar">
      <div class="navbar__navbar-brand">
        <router-link to="/" class="navbar__navbar-item" exact>
          Vue A11Y Calendar {{ version }}
        </router-link>
      </div>

      <router-link v-for="i in nav" :key="i.title" :to="i.to" class="navbar__navbar-item">
        {{ i.title }}
      </router-link>

      <div class="navbar__navbar-end">
        <a target="_github" href="https://github.com/IBM/vue-a11y-calendar" class="navbar__navbar-item" rel="noopener noreferrer">
          Github
        </a>
      </div>
    </nav>

    <nuxt/>

  </div>
</template>

<script>
export default {
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
  },
};
</script>
