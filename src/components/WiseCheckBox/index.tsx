import { useState } from 'react'
import { useWiseTransactions } from '../../hooks/useWiseTransactions'

import * as S from "./styles"

interface WiseCheckBoxProps {
  total: number;
  onUpdateTotal: (total: number) => void;
}

export default function WiseCheckBox({ total, onUpdateTotal }: WiseCheckBoxProps) {
  const { wiseBalance } = useWiseTransactions();
  const [sumWithWise, setSumWithWise] = useState(false);

  const handleCheckboxChange = () => {
    const newSumWithWise = !sumWithWise;
    setSumWithWise(newSumWithWise);
    onUpdateTotal(newSumWithWise ? total + wiseBalance : total);
  };

  return (
    <S.Label>
      <input
        type="checkbox"
        checked={sumWithWise}
        onChange={handleCheckboxChange}
      />
      Somar com saldo da Wise
    </S.Label>
  );
}