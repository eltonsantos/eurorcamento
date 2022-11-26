import { PencilSimple, TrashSimple } from 'phosphor-react';
import { useTransactions } from '../../hooks/useTransactions';
import * as S from './styles';

export function TransactionsTable() {

  const { transactions } = useTransactions()
  
  return (
    <S.Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td>
                  <div className="options">
                    <PencilSimple size={20} weight="fill" />
                    <TrashSimple size={20} weight="fill" color="red" />
                  </div>
                </td>
              </tr>
            )
          }) : <tr><td colSpan={5} align="center">Não há transações cadastradas</td></tr>}
        </tbody>
      </table>
    </S.Container>
  )
}