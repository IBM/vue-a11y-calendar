<template>
  <div>
    <div class="hero">
        <div class="hero__container">
          <h1>{{ component.title }} </h1>
          <h2>{{ component.description}}</h2>
        </div>
    </div>
    <div class="container demo">
      <figure class="demo__component">
        <component :is="component.component" ref="component" :locale="$store.state.locale" />
        <br>
        <figcaption v-if="mounted">
          <prism language="javascript">{{ props }}</prism>
        </figcaption>
      </figure>
      <div class="demo__props">
        <h3>Properties</h3>
        <div class="demo__wrap">
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
        </div>

        <br>
        <template v-if="component.events.length">
          <h3>Events</h3>
          <div class="demo__wrap">
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
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import 'prismjs';
import Prism from 'vue-prism-component';
import components from '../../components';

export default {
  components: {
    Prism,
  },
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
