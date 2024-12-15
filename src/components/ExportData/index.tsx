import { Export } from "phosphor-react"
import * as S from "./styles"
import { useTransactions } from "../../hooks/useTransactions";
import * as XLSX from "xlsx";

export function ExportData() {
  const { transactions } = useTransactions();

  function handleExport() {
    const data = transactions.map((transaction, index) => [
      index + 1,
      transaction.id,
      transaction.title,
      transaction.amount,
      transaction.category,
      new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt)),
    ]);
  
    const headers = ["", "ID", "Título", "Valor", "Categoria", "Data"];
  
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transações");
  
    XLSX.writeFile(workbook, "transacoes.xlsx");
  }

  return (
    <S.ExportDataContainer>
      <button type="button" onClick={handleExport}>
        <Export size={23} />
        Exportar dados
      </button>
    </S.ExportDataContainer>
  )
}