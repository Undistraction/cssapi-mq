# Styled MQ

A small library to help with using media queries alongside styled-components.

## Why?

I wasn't really happy with any of the other solutions available. I wanted to write something simple but flexible, well-tested, and written in ES6. I also want to try and enforce best practices and help you avoid common issues with media queries.

## I want to try it quickly:

There is a Codepen [here](https://codepen.io/Pedr/pen/MOmpxr?editors=1111)

### Something doesn't work?

Open an issue and I'll fix it as quickly as I can.

### Want something not included?

Open an issue and I'll do my best to add it.


## Install

```
yarn add styled-mq
```

## Run Tests

```
yarn test
```

## Configuration

Everything starts with a map of breakpoints. The map should consist of a name and a value. The value represents the pixel value, but you can decide whether you want to output `em`, `rem` or `px`. Don't worry about order, the map will be ordered based on the value before it is used. I deliberately haven't included a default breakpoint map because your breakpoints should fit your project like a glove. Each query spans the range to the next query, so in the following example, `medium` runs from `900` to `1100`. However this isn't entirely true. If you use `em` as your output value, the library will make sure that `max-width` queries are `0.01` ems less than the breakpoint value to avoid [overlap](http://tzi.fr/css/prevent-double-breakpoint).

Example map:

```
const breakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};
```

The first thing you need to do is configure `mq` with these breakpoints:
```
import styledMQ from `styled-mq`;

const mq = styledMQ.configure(breakpoints);
```

Now `configuredMQ` is yours to use. If you need different configurations, for example for differnet themes or parts of the app, just configure another object. 

It also supports a few configuration options:

- **baseFontSize** (defaults to `16px`) If you are using a different base font size, pass it in here.
- **defaultMediaType** (defaults to `screen`) All media queries will have a media type added to them. You can pass in a different value here, or an empty string: `` if you don't want a default media type.
- **unit** (defaults to `em`) The unit to output in your media queries. If it is `em`, the pixel values supplied in the breakpoint map will be converted using the `baseFontSize`.
- **separateIfEms** (defaults to `true`) Remove `0.01em` from all `max-width` media queries to avoid overlap. If you are outputting to pixels this does nothing.

## API

You need to know one important thing. The way things work is that you pass in the breakpoint(s) and you will get back a tagged template literal function.

You can use functions in the interpolations.

### aboveWidth
This will give you back a media query with a `min-width` set to the supplied breakpoint:

```
export default styled.div`
  ${mq.aboveWidth('small')`
    background-color: ${props => props.theme.bg};
  `}
`
```

### belowWidth
This will give you back a media query with a `max-width` set to the supplied breakpoint:

```
export default styled.div`
  ${mq.belowWidth('small')`
    background-color: ${props => props.theme.bg};
  `}
`
```

### betweenWidths
This will give you back a media query with its `min-width` set to the lowest value breakpoint and its `max-width` set to the highest value breakpoint.

```
export default styled.div`
  ${mq.betweenWidths('small', 'large')`
    background-color: ${props => props.theme.bg};
  `}
`
```

### atWidth
This will give you back a media query with its `min-width` set to the value of the breakpoint and its `max-width` set to the value of the next highest breakpoint, or not set if there is no higher breakpoint (in which case this is effectively the equivalent of using `aboveWidth`).

```
export default styled.div`
  ${mq.atWidth('medium')`
    background-color: ${props => props.theme.bg};
  `}
`
```


## Maintainance

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