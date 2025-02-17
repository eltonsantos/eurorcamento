import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import WiseCheckBox from '../WiseCheckBox'

import * as S from "./styles"

export function Summary() {

  const { transactions } = useTransactions()
  const [totalWithWise, setTotalWithWise] = useState(0);
  
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraw += transaction.amount
      acc.total -= transaction.amount
    }

    return acc
  }, {
    deposits: 0,
    withdraw: 0,
    total: 0
  })

  return(
    <S.Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong className="incomeAmount">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong className="outcomeAmount">
          - {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR'
          }).format(summary.withdraw)}
        </strong>
      </div>
      <div className={`${(totalWithWise || summary.total) >= 0 ? "highlight-background" : "highlight-background-negative"}`}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR'
          }).format(totalWithWise || summary.total)}
        </strong>
        
        <WiseCheckBox total={summary.total} onUpdateTotal={setTotalWithWise} />
      
      </div>

    </S.Container>
  )
}