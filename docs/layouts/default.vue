<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" exact>
          Vue A11Y Calendar {{ version }}
        </router-link>
      </div>

      <router-link v-for="i in nav" :key="i.title" :to="i.to" class="navbar-item">
        {{ i.title }}
      </router-link>

      <a target="_github" href="https://github.com/IBM/vue-a11y-calendar" class="navbar-item" rel="noopener noreferrer">
        Github
      </a>

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
