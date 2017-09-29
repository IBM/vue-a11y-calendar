<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{ component.title }} </h1>
                    <h2 class="subtitle">{{ component.description}}</h2>
                </div>
            </div>
        </div>
        <div class="container demo">
            <br>
            <component :is="component.component" />
            <br>
        </div>
    </div>
</template>

<style scoped>
.demo {
    text-align: center;
}
</style>

<script>
import components from '~/components';

export default {
  head() {
    return {
      title: this.component.title,
    };
  },
  validate({ params }) {
    return Boolean(components[params.component]);
  },
  computed: {
    component() {
      return components[this.$route.params.component];
    },
  },
};
</script>
