import { PencilSimple, TrashSimple } from 'phosphor-react';
import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { UpdateTransactionModal } from '../UpdateTransactionModal';
import * as S from './styles';

export function TransactionsTable() {

  const { transactions, removeTransaction, isLoading } = useTransactions()

  const [isUpdateTransactionModalOpen, setIsUpdateTransactionModalOpen] = useState(false);

  function onOpenUpdateTransactionModal(id: string) {
    setIsUpdateTransactionModalOpen(true)
  }

  function onCloseUpdateTransactionModal() {
    setIsUpdateTransactionModalOpen(false)
  }

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

          {transactions.length ? transactions.map((transaction: any) => {
            // Como usar o isLoading que está em outro componente aqui para carregar somente apos a api ser carregada?
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction?.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td>
                  <div className="options">
                    <PencilSimple
                      size={20}
                      weight="fill"
                      onClick={() => onOpenUpdateTransactionModal(transaction.id)}
                    />
                    <TrashSimple
                      size={20}
                      weight="fill"
                      color="red"
                      onClick={() => removeTransaction(transaction.id)}
                    />
                  </div>
                </td>
              </tr>
            )
          }) : <tr><td colSpan={5} align="center">Não há transações cadastradas</td></tr>}
        </tbody>
      </table>

      <UpdateTransactionModal
        isOpen={isUpdateTransactionModalOpen}
        onRequestClose={onCloseUpdateTransactionModal}
      />

    </S.Container>

  )
}