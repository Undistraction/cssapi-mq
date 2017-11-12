# Styled MQ

A small library to help with using media queries alongside styled-components.

```
yarn add styled-mq
```

## Configuration

## API

```
import mq from 'styled-mq`;

export default styled.div`
  ${mq.aboveWidth(small)`
    background-color: GhostWhite;
  `}
`
```

## Tests

```
yarn test
```

## Maintainance

### Bump Version
```
npm version patch
npm version minor
npm version major
```

### Publish

```
npm publish
```
