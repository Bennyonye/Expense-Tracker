import React from 'react';
import styled from 'styled-components';
import { financialIcons } from '../../utils/Icons';

interface Transaction {
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface Props {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<Props> = ({ transactions }) => {
  return (
    <RecentTransactionsStyled>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <div className="transaction-info">
              <h3>{transaction.title}</h3>
              <p className="category">{transaction.category}</p>
              <div className="amount">
                <span>{financialIcons.dollar}</span> {/* Dollar Icon */}
                {transaction.amount}
              </div>
              <p className="date">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </RecentTransactionsStyled>
  );
}

const RecentTransactionsStyled = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .transaction-item {
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    .transaction-info {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 1.4rem;
        font-weight: 700;
      }

      .category {
        font-size: 1.2rem;
        color: gray;
      }

      .amount {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--color-green);

        span {
          margin-right: 0.5rem;  // Add space between icon and amount
        }
      }

      .date {
        font-size: 1rem;
        color: gray;
      }
    }
  }

  .add-transaction {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    span {
      font-size: 2rem;
      cursor: pointer;
      color: var(--color-green);
    }
  }
`;

export default RecentTransactions;
