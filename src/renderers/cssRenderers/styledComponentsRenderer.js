import { css } from 'styled-components'

export default (definition, content) => css`
  ${definition} {
    ${content};
  }
`
