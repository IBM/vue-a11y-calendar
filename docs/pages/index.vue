<template>
  <div class="container">
    <div v-html="readme" />
  </div>
</template>

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
