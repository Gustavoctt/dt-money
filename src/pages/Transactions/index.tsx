import { useContext } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import * as S from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);
  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighlight variant={transaction.type}>
                    {priceFormatter.format(transaction.price)}
                  </S.PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dataFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
