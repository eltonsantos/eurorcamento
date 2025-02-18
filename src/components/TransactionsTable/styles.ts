import styled from "styled-components";

export const Container = styled.section`
  margin-top: 2rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    @media (max-width: 768px) {
      display: block;
      overflow-x: auto;
    }
    
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-body);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }

    .options {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .options svg {
      cursor: pointer;

      :hover {
        filter: brightness(0.8);
      }
    }
  }
`;