import ReactLoading from 'react-loading';
import * as S from './styles';

export function Loading() {

  return (
    <S.Container>
      <S.Icon>
        <ReactLoading type="spokes" color="#5428cc" height={100} width={100} />
      </S.Icon>
      <S.GlobalStyle />
    </S.Container>
  )
}