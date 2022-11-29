import styled from 'styled-components'

export const Container = styled.footer`
  text-align: center;
  padding: 4rem 0 2rem;
  color: var(--text-body);
  opacity: .6;
  z-index: 0;

  a {
    color: var(--text-body);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;