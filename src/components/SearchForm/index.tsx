import { MagnifyingGlass } from "phosphor-react"
import * as S from "./styles"
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filterTransactions } = useTransactions();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    filterTransactions(searchTerm);
  }

  return (
    <S.SearchFormContainer onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Busque por transações"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}