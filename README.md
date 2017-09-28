# Vue A11Y Calendar

Localized, accessible calendar and datepicker for Vue with no external dependencies.

## Installation

```bash
$ npm install vue-a11y-calendar
```

### Peer Dependencies

Vue A11Y Calendar depends on [Vue](https://www.npmjs.com/package/vue) 2.4+ and if using [webpack](https://webpack.github.io/), [Sass Loader](https://www.npmjs.com/package/sass-loader) 6.0+. Make sure they (and their peer dependencies) are installed and correctly configured in order to effectively use Vue A11Y Calendar. While this has been tested with [webpack](https://webpack.github.io/), it should work with any module bundler.

### Recommended Webpack Configuration Additions

In addition to the required configuration for Sass Loader, the following configuration is recommended to be included:

```js
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir) // Change this to resolve to the root of your project
}

const config = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFiles: ['index', 'index.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), // Replace `src` with the path to your source files from the root of your project
      '~': resolve('node_modules'),
    },
  },
};

```

The above configuration will allow `.js`, `.vue`, and `.json` files to be imported/required without including their extensions, allow `index.js` and `index.vue` files to be found as files to be imported when importing/requiring a folder (so `calendar/index.vue` can just be included/requires as `calendar`), and will resolve Vue to the correct version, and allow shortcut imports `@` for source files and `~` for Node modules. This will allow for code like `import foo from '@/foo';` and `import calendar from '~/vue-a11y-calendar/calendar';`.

## Components

### Calendar

The Calendar component provides a responsive, dynamic, accessible, localized (using [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)) month-based calendar.

**Props**
- `{string} locale` - Any valid single locale for [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
- `{object} microcopy` - Translatable strings for the microcopy for the calendar. All properties must be present to be valid.
  - `{string} microcopy.today` - String representation of `Today: {date}`. Must include `{date}`, which will be replaced with the localized date.
  - `{string} microcopy.next` - String representation of `Next Month`.
  - `{string} microcopy.previous` - String representation of `Previous Month`.

**Events**
- `dateSelected(target)` - When a click event is fired on a date, this event will fire and pass the relevant target of the event.

### Datepicker

The Datepicker component provides a dynamic, accessible, localized (using [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)) month-based datepicker.

**Props**
- `{string} locale` - Any valid single locale for [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
- `{string} label` - A string for the label of the input field. Defaults to `Choose a date`.
- `{object} microcopy` - Translatable strings for the microcopy for the calendar. All properties must be present to be valid.
  - `{string} microcopy.today` - String representation of `Today: {date}`. Must include `{date}`, which will be replaced with the localized date.
  - `{string} microcopy.next` - String representation of `Next Month`.
  - `{string} microcopy.previous` - String representation of `Previous Month`.
  - `{string} microcopy.open` - String representation of `Open Calendar`.
  - `{string} microcopy.cancel` - String representation of `Cancel`.
- `{object} inputs` - Input names (so multiple datepickers can be used in the same form).
  - `{string} inputs.local` - Input name and ID for the visible, read-only input field. Defaults to `date-local`.
  - `{string} inputs.month` - Input name for the hidden numeric _day_ input. Defaults to `date-day`.
  - `{string} inputs.month` - Input name for the hidden numeric _month_ input. Defaults to `date-month`.
  - `{string} inputs.year` - Input name for the hidden numeric _year_ input. Defaults to `date-year`.

## Customization

Neither the Calendar component nor the Datepicker component use `scoped` styles or CSS modules. While this isn't ideal from a performance perspective, it is the only reasonable way to allow users to write custom CSS to style these components from within their own components. A downside to this is that implementing components can't have their styles `scoped` or use CSS modules either, or styling won't cascade properly. To change styling of one of these components, it is recommended to wrap it in a single component and mirror the props down.

Classes are styled using [BEM](http://getbem.com/) to, as best as possible, target the exact elements to be styled.

**Alternatively**, the HTML, JS, and Sass for each component has been split out in to separate files that can be imported individually. The HTML and JS can used to rebuild the components piecemeal with custom styling (even allowing for `scoped` styling if desired).

## TODO

- Display per-day items on calendar (including ranges)
- Fire event when per-day item is selected
- Allow for date ranges in datepicker
- Tests

## External Licenses

The Calendar icon is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/) by [International Business Machines Corporation](http://www.ibm.com/us/en/). It is from [IBM Design Icons](https://github.com/IBM-Design/icons).
