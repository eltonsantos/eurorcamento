import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    color: var(--text-body);
    background: var(--shape);
    padding: 1rem;

    &::placeholder {
      color: var(--text-body);
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: var(--green);
    color: var(--shape);
    font-weight: bold;
    border-radius: 6px;

    &:hover {
      background-color: var(--green-300);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;