import ReactPaginate from 'react-paginate';
import * as S from './styles';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <S.PaginationContainer>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={10}
        marginPagesDisplayed={2}
        onPageChange={onPageChange}
        previousLabel="Anterior"
        nextLabel="Próximo"
        breakLabel="..."
        activeClassName="active"
      />
    </S.PaginationContainer>
  );
}