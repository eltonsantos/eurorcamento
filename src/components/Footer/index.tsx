import * as S from "./styles"

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <S.Container>
      <p>{currentYear} &copy; €urorçamento - <a href="https://github.com/eltonsantos" target="_blank" rel="noreferrer">Elton Santos</a></p>
    </S.Container>
  )
}