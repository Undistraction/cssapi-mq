# Styled MQ

A small library to help with using media queries alongside styled-components.

```
yarn add styled-mq
```

## Basic Usage

```
import mq from 'styled-mq`;

export default styled.div`
  ${mq.aboveWidth(small)`
    background-color: GhostWhite;
  `}
`
```
