A Toolkit For Using Media Queries With Styled Components

[![NPM Version](https://img.shields.io/npm/v/cssapi-mq.svg)](https://www.npmjs.com/package/cssapi-mq)
[![codecov](https://img.shields.io/codecov/c/github/Undistraction/cssapi-mq.svg)](https://codecov.io/gh/Undistraction/cssapi-mq)
[![Build Status](https://img.shields.io/travis/Undistraction/cssapi-mq.svg)](https://travis-ci.org/Undistraction/cssapi-mq)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](./LICENSE.md)

# CSSAPI MQ

Note: This library used to be called Styled MQ, however it is now part of [CSSAPI](https://github.com/Undistraction/cssapi). The API hasn't changed, though the package is now named `cssapi-mq`.

## What?

CSSAPI-MQ is a toolkit for dealing with media queries when using Styled
Components. It offers a broad API for dealing with all widely supported media
query features and can easily be used as is, or as the building blocks for your
own more focused api.

## Why?

I found other existing solutions didn't offer the power and flexibility I wanted
and weren't well tested enough to give me confidence.

## How?

It offers the following features:

* Lots of validation and useful error messages to make it (hopefully) impossible
  to write invalid or non-functioning media queries.
* Full support for all media features that are widely supported, including
  width, height, resolution, orientation and lots more.
* A simple API with convenience methods like aboveResolution(), betweenWidths()
  and atHeight().
* Full support for complex media queries (ands, ors, not) with validation.
* Support for tweakpoints.
* Lots and lots of tests.
* Automatic addition of media-type for not queries to ensure they are valid.
* Work in whatever units you like (rems, ems or px) and choose your preferred
  output unit.
* Use arbitrary values or make things strict, so only predefined, named
  breakpoints can be used.
* Automatic separation of media query values to avoid overlap (if you want it).
* Lots of scope for you to use as a robust base for using media queries however
  you want to - you can easily build out a few predefined queries if that's all
  you need or keep things very flexible.
* Create multiple sets of configuration for different places within the same
  application.

## How big?

[According to Bundle Phobia](https://bundlephobia.com/result?p=cssapi-mq@latest)
it comes in at 38.7KB GZipped.

## But I need …

I've tried to cover everything realistic while ignoring legacy cruft. If there
is anything you need beyond what is currently there please open an issue and
explain what you need.

## Quick Start

```js
import styled from 'styled-components'
import mqAPI from 'cssapi-mq'

// Define your mq object
const mq = mqAPI.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200,
    xLarge: 1400,
  },
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

Media queries can be broken down into two types - those that take a arbitrary
value (which I will refer to as ranged queries), for example `width` or
`resolution` and those that accept only values from a predefined list (which I
will refer to as linear queries), for example `scan` which only accepts the
values `interlace` or `progressive`. In some cases both ranged or linear queries
also support no argument, for example `color` can be used with no argument to
target only color devices.

You can read much more about Media Queries
[here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

## Configuration

You will configure your mq object with a call to `configure()`. Configure takes
a breakpoint map as its first argument and a configuration object as its second.

### breakpoint map

The breakpoint map allows you to define keyed breakpoints for any of the linear
features, with a separate breakpoint set for each feature. If you wanted to
defined breakpoints for `width`, `height` and `resolution`, your breakpoint map
would look like this:

```js
const mq = mqAPI.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200,
    xLarge: 1400,
  },
  height: {
    small: 400,
    large: 800,
  },
  resolution: {
    high: 192,
  },
})
```

### config object

The second argument is a config object that changes the behaviour of the object
that is retured.

```js
const mq = mqAPI.configure({
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
    useNamedBreakpoints: false,
  });
```

* **dimensionsUnit em|rem|px** _(defaults to 'em')_ Define what value should be
  used when outputting dimensions units (`width` or `height`).
* **baseFontSize** _(defaults to 16)_ If you choose to output dimensions in a
  relative unit (rems or ems, which are the default), then this will allow you
  to scale your relative units to match the scale you are using on your
  root-most document element. It is strongly advised you use ems.
* **defaultMediaType all|print|screen|speech** _(defaults to 'screen')_ When
  using `not` in media queries, if a media type is missing the query will not be
  evaluated. CSSAPI-MQ will automatically add a media type to `not` queries if
  you don't define one yourself. This value will also decide the value what will
  be rendered if you call `mediaType()` with no argument.
* **shouldSeparateQueries true|false** _(defaults to 'true')_ Using media
  queries that overlap is potentially problematic - if one media query uses an
  upper limit of 16em and another uses a lower limit of 16em, there is a
  potential conflict there which can be the source of bugs. If
  `shouldSeparateQueries` is set to `true`, CSSAPI-MQ will remove the smallest
  value possible from the upper breakpoints to avoid this collision. In the case
  of rems or ems this will be 0.01 less than the upper value. In the case of
  pixels it will be 1px. For this reason alone it is worth using ems. Note: this
  will only effect breakpoints defined in maps, not arbitrary values you pass in
  if `useNamedBreakpoints` is set ot `false`.
* **useNamedBreakpoints true|false** _(defaults to 'true')_ By default
  StyledMQ will only allow you to pass in defined breakpoint names. If you try
  and pass in anything that isn't a key on the relevant breakpoint set you will
  receive an error. By setting this value to `false` you remove this validation
  and allow any valid value to be passed in.

### Validation

CSSAPI-MQ takes a very strict approach to validations, whilst giving you as much
freedom as possible in defining values. If you pass in an invalid value at any
point it will throw an error and explain what the problem was. Given that you
will be defining your media queries at author time, not runtime, this is of
great benefit in allowing you to catch any issues immediatley. This hold true
for the values you supply in your breakpoint map, or any values you supply to
the methods exposed by CSSAPI-MQ> Principle causes of errors are:

* You use an invalid value in a ranged query.
* You use an invalid unit in a ranged query.
* You use a negative value when only positive values make sense in a ranged
  query.
* You use a decimal when only integers are valid in a ranged query.
* You use a value that isn't in the list of valid values for a linear feature.
* You use a breakpoint name that doesn't exist.
* You defined a query that is invalid (for example through over nesting).

### Usage

One you have defined your `mq` object, you can use it to create queries. The
type of functions available to you depend on whether the feature is linear or
ranged. In both cases you must wrap your features inside a call to query which
will return a template literal function, ready for you to define the styles you
want to apply within the query, for example:

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

If it is called with no arguments, the configuration for `defaultMediaType` will
be used:

```javascript
mq.mediaType()
```

#### Linear

* orientation
* scan
* grid
* update
* overflow-block
* overflow-inline
* color-gamut
* display

Linear features are accessible directly using the name of the feature:

```javascript
mq.orientation('landscape')
```

Both `grid` and `update` support being called with no argument. If any other
linear query is called without an argument it will throw.

```javascript
mq.grid()
mq.update()
```

#### Ranged

* width
* height
* resolution
* color
* color-index
* monochrome

Ranged features each offer their own api using the same naming convention. The
following takes `width` as an example, but the same is true for all ranged
features.

##### `aboveWidth()` (aliased to `minWidth()`)

![aboveWidth() diagram](docs/images/aboveWidth.png?raw=true)

Defines a `min-width` for the supplied breakpoint or value.

```javascript
mq.aboveWidth('medium')
mq.minWidth('medium')
```

##### `belowWidth()` (aliased to `maxWidth()`)

![belowWidth() diagram](docs/images/belowWidth.png?raw=true)

Defines a `min-width` for the supplied breakpoint or value.

```javascript
mq.belowWidth('medium')
mq.maxWidth('medium')
```

#### `atWidth()` (aliased to `width()`)

![atWidth() diagram](docs/images/atWidth.png?raw=true)

Defines an exact width query for the supplied breakpoint or value.

```javascript
mq.atWidth('medium')
```

#### `atBreakpointWidth()`

![atBreakpointWidth() diagram](docs/images/atBreakpointWidth.png?raw=true)

Defines a range of values running from the supplied breakpoint or value to the
next highest breakpoint, or without an upper limit if no higher value breakpoint
exists.

```javascript
mq.atBreakpointWidth('medium')
```

#### `betweenWidths()`

![betweenWidths() diagram](docs/images/betweenWidths.png?raw=true)

Defines a range spanning the the values between the two supplied breakpoints or
values. The order is not important with the lowest value always used for the
lower end of the range.

```javascript
mq.betweenWidth('medium', 'xLarge')
```

### Building A Query

All the previous methods output a string, however to generate a query from these
strings you need to wrap them in a call to `query()`. How you assemble the
values supplied to `query()` will effect how the media query is output.

#### And

Any items wrapped in an array are anded together, meaning all values in the
anded group must be true for the query to succeed for example:

```javascript
mq.query([mq.orientation('horizontal'), mq.aboveWidth('small')])``
```

Query

```css
@media ((orientation: horizontal) and (min-width: 25em)) {
}
```

#### Or

Each argument passed into `query()` is treated as an alternative, meaning any of
the groups that have been ored together must be true for the query to succeed:

```javascript
mq.query(mq.orientation('horizontal'), mq.aboveWidth('small'))``
```

Query

```css
@media ((orientation: horizontal), (min-width: 25em)) {
}
```

#### Not

Using `not()` allows you to negate a feature or set of features. Note that
negated values must have a media type, and CSSAPI-MQ will add a media type if
you don't do so yourself, using the value of the 'defaultMediaType`
configuration.

```javascript
mq.query(mq.not([mq.orientation('horizontal'), mq.aboveWidth('small')])``;
```

Query

```css
@media (not (orientation: horizontal) and (min-width: 25em)) {
}
```

Or

```javascript
mq.query(mq.orientation('horizontal'), mq.aboveWidth('small'))``
```

Query

```css
@media (not screen and (orientation: horizontal), not screen and (min-width: 25em)) {
}
```

### Tweakpoints

CSSAPI-MQ also supports the concept of tweakpoints - breakpoints that are
specific to a component or small subset of components. In this case you can use
the `tweak()` method to pass in additional maps of breakpoints. This will give
you back a new tweaked `mq` obejct with all the same methods available, only now
taking your newly defined tweakpoints into account. Your original `mq` object is
still available via the `untweaked` property of the the tweaked `mq` object.
With this approach you can pass the same original `mq` object to all your
components and create a component-specific tweaked version as needed without
effecting the original.

### Questions

### This is all so complicated. All I want is a few breakpoints.

You can easily achieve what you want. If you are only intending to use a few
clearly defined media queries in your app, just use StyledMQ to define them and
store them as needed. For example lets say all you want is a small, medium and
large breakpoint for your app width, all with the mediaType of screen. Just
configure CSSAPI-MQ and store the query functions that it generated.

```javascript
const mq = mqAPI.configure({
  width: {
    small: 400,
    medium: 900,
    large: 1200,
  },
})

const aboveSmallQuery = mq.query([mq.mediaType(), mq.aboveWidth('small')])
const aboveMediumQuery = mq.query([mq.mediaType(), mq.aboveWidth('medium')])
const abovelargeQuery = mq.query([mq.mediaType(), mq.aboveWidth('large')])

const queries = {
  aboveSmallQuery,
  aboveMediumQuery,
  aboveLargeQuery,
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
const { query, mediaType, aboveWidth } = mq

const aboveSmallQuery = query([mediaType(), aboveWidth('small')])
```

### How should I use this on a real project.

One possiblity is to create an `mq` object and make it available to all your
components through a theme.

### I have two parts of the same app that need different sets of breakpoints.

You can just create different `mq` objects for each part of the app.

## Maintainance

### Test

```sh
yarn test
```

### Build

```sh
yarn run build
```

### Publish

```sh
yarn run publish:patch
yarn run publish:minor
yarn run publish:major
```
