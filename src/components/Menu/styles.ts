import styled from 'styled-components'

export const Container = styled.div`
  background: var(--blue-light);
  color: var(--shape)
  height: 1rem;
  text-align: right;

  ul {
    max-width: 1120px;
    margin: 0 auto;

    li {
      margin-right: 1rem;
      display: inline-block;

      button {
        color: var(--shape);
        background: var(--blue-light);
        border: none;

        &:hover {
          color: var(--text-body);
        }
      }

      a {
        color: var(--shape);
        text-decoration: none;

        &:hover {
          filter: brightness(0.9);
          color: var(--text-body);
        }
      }
    }
  }
`;