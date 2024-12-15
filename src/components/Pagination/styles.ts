import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 8px;

    li {
      cursor: pointer;
      padding: 8px 12px;
      border: 1px solid var(--background);
      border-radius: 4px;
      transition: background-color 0.2s;
      color: var(--blue-light);

      &.active {
        background-color: var(--blue-light);
        color: var(--shape);
        font-weight: bold;
      }

      &:hover {
        background-color: var(--blue-light);
        color: var(--shape);
      }

      a {
        &:focus-visible {
          outline: none;
          border-radius: 3px;
        }
      }

    }

    .previous,
    .next {
      font-size: 0.9rem;
      color: var(--blue);
    }

    .break {
      margin: 0 5px;
    }
  }
`;