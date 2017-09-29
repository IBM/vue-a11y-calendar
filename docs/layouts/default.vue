<template>
  <div>
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" exact>
          Vue A11Y Calendar {{ version }}
        </router-link>
      </div>
      <div class="navbar-start">
        <router-link v-for="i in nav" :key="i.title" :to="i.to" class="navbar-item">
          {{ i.title }}
        </router-link>
      </div>
      <div class="navbar-end">
        <a target="_github" href="https://github.com/IBM/vue-a11y-calendar" class="navbar-item">
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
