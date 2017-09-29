<template>
  <div class="container">
    <div v-html="readme" />
  </div>
</template>

<style>
h1,
h2 {
  font-size: xx-large;
  padding: 10px 0;
}

h3,
h4 {
  font-size: 120%;
  padding: 10px 0;
}
</style>

<script>
import readme from '~~/readme.md';

export default {
  head: {
    title: 'Docs',
  },
  computed: {
    readme: () => readme,
  },
};
</script>
