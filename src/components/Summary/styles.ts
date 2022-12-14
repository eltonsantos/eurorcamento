import styled from "styled-components";

export const Container = styled.section`
  display: grid;
  gap: 2rem;
  margin-top: -10rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    boorder-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    .incomeAmount {
      color: var(--green);
    }
    
    .outcomeAmount {
      color: var(--red);
    }

    &.highlight-background {
      background: var(--green);
      color: var(--shape);
    }

    &.highlight-background-negative {
      background: var(--red);
      color: var(--shape)
    }
  }
`;