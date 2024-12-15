/* eslint-disable @typescript-eslint/no-unused-vars */
import { PencilSimple, TrashSimple } from 'phosphor-react';
import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { UpdateTransactionModal } from '../UpdateTransactionModal';
import * as S from './styles';
import { SearchForm } from '../SearchForm';
import { ExportData } from '../ExportData';
import { Pagination } from '../Pagination';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const { filteredTransactions, handleRemoveTransaction, isLoading } = useTransactions()
  const [isUpdateTransactionModalOpen, setIsUpdateTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction>()
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 15;
  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  const displayedTransactions = filteredTransactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  function handlePageChange(selectedItem: { selected: number }) {
    setCurrentPage(selectedItem.selected);
  }

  function onOpenUpdateTransactionModal(transaction: Transaction) {
    setEditingTransaction(transaction)
    setIsUpdateTransactionModalOpen(true)
  }

  function onCloseUpdateTransactionModal() {
    setIsUpdateTransactionModalOpen(false)
  }

  return (
    <S.Container>
      <SearchForm />
      <table>
        <thead>
          <tr>
            <th>#ID da Transação</th>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>
              <ExportData />
            </th>
          </tr>
        </thead>
        <tbody>

          {displayedTransactions.length ? displayedTransactions.map((transaction: Transaction) => {
            // Como usar o isLoading que está em outro componente aqui para carregar somente apos a api ser carregada?
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
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
                    <PencilSimple
                      size={20}
                      weight="fill"
                      color="#969cb3"
                      onClick={() => onOpenUpdateTransactionModal(transaction)}
                    />
                    <TrashSimple
                      size={20}
                      weight="fill"
                      color="#E52E40"
                      onClick={() => handleRemoveTransaction(transaction.id)}
                    />
                  </div>
                </td>
              </tr>
            )
          }) : <tr><td colSpan={6} align="center">Não há transações cadastradas</td></tr>}
        </tbody>
      </table>

      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />

      <UpdateTransactionModal
        isOpen={isUpdateTransactionModalOpen}
        onRequestClose={onCloseUpdateTransactionModal}
        editingTransaction={editingTransaction}
      />

    </S.Container>
  )
}