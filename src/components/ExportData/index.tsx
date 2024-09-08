import { Export } from "phosphor-react"
import * as S from "./styles"
import { useTransactions } from "../../hooks/useTransactions";
import * as XLSX from "xlsx";

export function ExportData() {
  const { transactions } = useTransactions();

  function handleExport() {
    const data = transactions.map((transaction) => ({
      ID: transaction.id,
      Título: transaction.title,
      Valor: transaction.amount,
      Categoria: transaction.category,
      Data: new Intl.DateTimeFormat("pt-BR").format(
        new Date(transaction.createdAt)
      ),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
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