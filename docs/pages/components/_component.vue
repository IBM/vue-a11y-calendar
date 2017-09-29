<template>
  <div>
    <div class="hero">
        <div class="hero__container">
          <h1>{{ component.title }} </h1>
          <h2>{{ component.description}}</h2>
        </div>
    </div>
    <div class="container demo">
      <div class="demo__props">
        <h3>Properties</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in component.props" :key="prop.name">
              <td v-html="prop.name" />
              <td v-html="prop.type" />
              <td v-html="prop.default" />
              <td v-html="prop.description" />
            </tr>
          </tbody>
        </table>
        <br>
        <template v-if="component.events.length">
          <h3>Events</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Arguments</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in component.events" :key="event.name">
                <td v-html="event.name" />
                <td v-html="event.args" />
                <td v-html="event.description" />
              </tr>
            </tbody>
          </table>
        </template>
      </div>
      <div class="demo__component">
        <component :is="component.component" ref="component" />
        <br>
        <div v-if="mounted">
          <pre><code v-html="props"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import components from '../../components';

export default {
  head() {
    return {
      title: this.component.title,
    };
  },
  data() {
    return {
      mounted: false,
    };
  },
  mounted() {
    this.mounted = true;
  },
  validate(ctx) {
    return Boolean(components[ctx.params.component]);
  },
  computed: {
    component() {
      return components[this.$route.params.component];
    },
    props() {
      if (!this.$refs.component) {
        return '-';
      }
      return JSON.stringify(this.$refs.component.$props, null, 2);
    },
  },
};
</script>
