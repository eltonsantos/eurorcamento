import * as S from "./styles"

export function Menu() {
  return (
    <S.Container>
      <ul>
        <li>
          <button>Alterar Tema</button>
        </li>
        <li>
          <a href="/">Sair</a>
        </li>
      </ul>
    </S.Container>
  )

}