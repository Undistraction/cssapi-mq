![Styled MQ Logo](docs/images/styled-mq-logo.png?raw=true)

# Styled MQ

## What?

Styled MQ is a toolkit for dealing with media queries when using Styled Components. It offers a broad API for dealing with all widely supported media query features and can easily be used as is, or as the building blocks for your own more focused api.

## Why?

I found other existing solutions didn't offer the power and flexibility I wanted and weren't well tested enough to give me confidence. 

## How?

It offers the following features:

- Allows you to define lists of breakpoints for `width`, `height`, `resolution`, `color`, `color-index` or `monochrome` and offers a convenient API for accessing these breakpoints or ranges of those breakpoints.
- Offers a convenient api for accessing linear breakpoints (those with fixed valid values) and supports: `orientation`, `scan`, `grid`, `update`, `overflow-block` and `overflow-inline`, `color-gamut` and `display` mode.
- Offers strict validation of valid values, with descriptive error messages, with the option to support arbitrary values for defining breakpoints on the fly.
- Supports tweakpoins as a separate entity to breakpoints. 
- Supports complex media queries including negated queries.
- Think in pixels but output in em, rem or pixel values.
- Well tested.
- Numerous other useful features.

## But I need …

I've tried to cover everything realistic while ignoring legacy cruft. If there is anything you need beyond what is currently there please open an issue and explain what you need.

## Quick Start

```
import styled from 'styled-components';
import styledMQ from 'styledMQ';

// Define your mq object
const mq = styledMQ.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200, 
    xLarge: 1400,
  }
})

// Access the mq object

const component = styled.div`
  ${mq.query(mq.betweenWidth('small', 'large'))`
    background-color: GhostWhite;
  `};
`

const component = styled.div`
  ${mq.aboveWidth('large')`
    background-color: WhiteSmoke;
  `};
`
```

Or you can play with a Codepen [here](https://codepen.io/Pedr/pen/MOmpxr)

## A Quick Refresher On Media Queries

Media queries can be broken down into two types - those that take a arbitrary value (which I will refer to as ranged queries), for example `width` or `resolution` and those that accept only values from a predifined list (which I will refer to as linear queries), for example `scan` which only accepts the values `interlace` or `progressive`. In some cases both ranged or linear queries also support no argument, for example `color` can be used with no argument to target only color devices.

You can read much more about Media Queries [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

## Configuration

You will configure your mq object with a call to `configure()`. Configure takes a breakpoint map as its first argument and a configuration object as its second.

### breakpoint map

The breakpoint map allows you to define keyed breakpoints for any of the linear features, with a separate breakpoint set for each feature. If you wanted to defined breakpoints for `width`, `height` and `resolution`, your breakpoint map would look like this:

```
const mq = styledMQ.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200, 
    xLarge: 1400,
  },
  height: {
    small: 400,
    large: 800
  },
  resolution: {
    high: 192,
  }
});
```

### config object

The second argument is a config object that changes the behaviour of the object that is retured. 

```
const mq = styledMQ.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200, 
    xLarge: 1400,
  },
  {
    dimensionsUnit: 'rem',
    baseFontSize: 10,
    defaultMediaType: 'all',
    shouldSeparateQueries: false,
    onlyNamedBreakpoints: false,
  });
```

- **dimensionsUnit em|rem|px** *(defaults to 'em')* Define what value should be used when outputting dimensions units (`width` or `height`).
- **baseFontSize** *(defaults to 16)* If you choose to output dimensions in a relative unit (rems or ems, which are the default), then this will allow you to scale your relative units to match the scale you are using on your root-most document element. It is strongly advised you use ems.
- **defaultMediaType all|print|screen|speech** *(defaults to 'screen')* When using `not` in media queries, if a media type is missing the query will not be evaluated. Styled MQ will automatically add a media type to `not` queries if you don't define one yourself. This value will also decide the value what will be rendered if you call `mediaType()` with no argument.
- **shouldSeparateQueries true|false** *(defaults to 'true')* Using media queries that overlap is potentially problematic - if one media query uses an upper limit of 16em and another uses a lower limit of 16em, there is a potential conflict there which can be the source of bugs. If `shouldSeparateQueries` is set to `true`, Styled MQ will remove the smallest value possible from the upper breakpoints to avoid this collision. In the case of rems or ems this will be 0.01 less than the upper value. In the case of pixels it will be 1px. For this reason alone it is worth using ems. Note: this will only effect breakpoints defined in maps, not arbitrary values you pass in if `onlyNamedBreakpoints` is set ot `false`. 
- **onlyNamedBreakpoints true|false** *(defaults to 'false')* By default StyledMQ will only allow you to pass in defined breakpoint names. If you try and pass in anything that isn't a key on the relevant breakpoint set you will receive an error. By setting this value to `false` you remove this validation and allow any valid value to be passed in. 

### Validation

Styled MQ takes a very strict approach to validations, whilst giving you as much freedom as possible in defining values. If you pass in an invalid value at any point it will throw an error and explain what the problem was. Given that you will be defining your media queries at author time, not runtime, this is of great benefit in allowing you to catch any issues immediatley. This hold true for the values you supply in your breakpoint map, or any values you supply to the methods exposed by Styled MQ> Principle causes of errors are:

- You use an invalid value in a ranged query.
- You use an invalid unit in a ranged query.
- You use a negative value when only positive values make sense in a ranged query.
- You use a decimal when only integers are valid in a ranged query.
- You use a value that isn't in the list of valid values for a linear feature. 
- You use a breakpoint name that doesn't exist.
- You defined a query that is invalid (for example through over nesting).

### Usage

One you have defined your `mq` object, you can use it to create queries. The type of functions available to you depend on whether the feature is linear or ranged. In both cases you must wrap your features inside a call to query which will return a template literal function, ready for you to define the styles you want to apply within the query, for example:

```javascript
mq.query(mq.mediaType('all'), mq.aboveWidth('medium'), mq.orientation('horizontal')`
  background-color: GhostWhite;
`;
```

#### Media Type

You can define the media type of a query or part of a query using `mediaType`:
```javascript
mq.mediaType('print')
```

If it is called with no arguments, the configuration for `defaultMediaType` will be used:
```javascript
mq.mediaType()
```

#### Linear

- orientation
- scan
- grid
- update
- overflow-block
- overflow-inline
- color-gamut
- display

Linear features are accessible directly using the name of the feature:

```javascript
mq.orientation('landscape');
```

Both `grid` and `update` support being called with no argument. If any other linear query is called without an argument it will throw.

```javascript
mq.grid();
mq.update();
```

#### Ranged

- width
- height
- resolution
- color
- color-index
- monochrome

Ranged features each offer their own api using the same naming convention. The following takes `width` as an example, but the same is true for all ranged features.

##### `aboveWidth()` (aliased to `minWidth()`)

![Styled MQ Logo](docs/images/aboveWidth.png?raw=true)

Defines a `min-width` for the supplied breakpoint or value.

```javascript
mq.aboveWidth('medium');
mq.minWidth('medium');
```

##### `belowWidth()` (aliased to `maxWidth()`)

![Styled MQ Logo](docs/images/belowWidth.png?raw=true)

Defines a `min-width` for the supplied breakpoint or value.

```javascript
mq.belowWidth('medium');
mq.maxWidth('medium');
```

#### `atWidth()` (aliased to `width()`)

![Styled MQ Logo](docs/images/atWidth.png?raw=true)

Defines an exact width query for the supplied breakpoint or value.

```javascript
mq.atWidth('medium');
```

#### `atBreakpointWidth()` 

![Styled MQ Logo](docs/images/atBreakpointWidth.png?raw=true)

Defines a range of values running from the supplied breakpoint or value to the next highest breakpoint, or without an upper limit if no higher value breakpoint exists.

```javascript
mq.atBreakpointWidth('medium')
```

#### `betweenWidths()`

![Styled MQ Logo](docs/images/betweenWidths.png?raw=true)

Defines a range spanning the the values between the two supplied breakpoints or values. The order is not important with the lowest value always used for the lower end of the range. 

```javascript
mq.betweenWidth('medium', 'xLarge');
```

### Building A Query

All the previous methods output a string, however to generate a query from these strings you need to wrap them in a call to `query()`. How you assemble the values supplied to `query()` will effect how the media query is output.

#### And

Any items wrapped in an array are anded together, meaning all values in the anded group must be true for the query to succeed for example:

```javascript
mq.query([mq.orientation('horizontal'), mq.aboveWidth('small')])``;
```

Query
```css
@media((orientation:horizontal) and (min-width: 25em)) {}
```

#### Or

Each argument passed into `query()` is treated as an alternative, meaning any of the groups that have been ored together must be true for the query to succeed:

```javascript
mq.query(mq.orientation('horizontal'), mq.aboveWidth('small'))``;
```

Query
```css
@media((orientation:horizontal), (min-width: 25em)) {}
```

#### Not

Using `not()` allows you to negate a feature or set of features. Note that negated values must have a media type, and Styled MQ will add a media type if you don't do so yourself, using the value of the 'defaultMediaType` configuration.

```javascript
mq.query(mq.not([mq.orientation('horizontal'), mq.aboveWidth('small')])``;
```

Query
```css
@media(not (orientation:horizontal) and (min-width: 25em)) {}
```

Or

```javascript
mq.query(mq.orientation('horizontal'), mq.aboveWidth('small'))``;
```

Query
```css
@media(not screen and (orientation:horizontal), not screen and (min-width: 25em)) {}
```

### Tweakpoints

Styled MQ also supports the concept of tweakpoints - breakpoints that are specific to a component or small subset of components. In this case you can use the `tweak()` method to pass in additional maps of breakpoints. This will give you back a new tweaked `mq` obejct with all the same methods available, only now taking your newly defined tweakpoints into account. Your original `mq` object is still available via the `untweaked` property of the the tweaked `mq` object. With this approach you can pass the same original `mq` object to all your components and create a component-specific tweaked version as needed without effecting the original. 

### Questions

### This is all so complicated. All I want is a few breakpoints.

You can easily achieve what you want. If you are only intending to use a few clearly defined media queries in your app, just use StyledMQ to define them and store them as needed. For example lets say all you want is a small, medium and large breakpoint for your app width, all with the mediaType of screen. Just configure Styled MQ and store the query functions that it generated.

```javascript

const mq = styledMQ.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200, 
  }
})

const aboveSmallQuery = mq.query([mq.mediaType(), mq.aboveWidth('small')]);
const aboveMediumQuery = mq.query([mq.mediaType(), mq.aboveWidth('medium')]);
const abovelargeQuery = mq.query([mq.mediaType(), mq.aboveWidth('large')]);

const queries = {
  aboveSmallQuery,
  aboveMediumQuery,
  aboveLargeQuery
}

const component = styled.div`
  ${queries.aboveSmallQuery`
    background-color: GhostWhite;
  `};
`
```

### I don't like all this namespacing in the query definitions.

You can just expand the `mq` object to a set of consts:

```javascript
const { query, mediaType, aboveWidth } = mq;

const aboveSmallQuery = query([mediaType(), aboveWidth('small')]);
```

### How should I use this on a real project.

One possiblity is to create an `mq` object and make it available to all your components through a theme. 

### I have two parts of the same app that need different sets of breakpoints.

You can just create different `mq` objects for each part of the app.


## Maintainance

### Test
```
yarn test
```

### Build
```
yarn run build
```

### Publish
```
yarn run publish:patch
yarn run publish:minor
yarn run publish:major
```