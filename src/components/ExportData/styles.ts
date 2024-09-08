import styled from 'styled-components'

export const ExportDataContainer = styled.form`
  display: flex;
  gap: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.2rem;

    border: 0;
    background: transparent;
    color: var(--text-body);
    font-weight: bold;
    border-radius: 6px;

    &:hover {
      color: var(--text-title);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;