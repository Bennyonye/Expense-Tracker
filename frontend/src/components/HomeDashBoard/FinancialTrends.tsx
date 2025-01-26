import React from 'react';
import styled from 'styled-components';

interface Expense {
  amount: number;
  category: string;
  date: string;
}

interface Props {
  expenses: Expense[];
}

const FinancialTrends: React.FC<Props> = ({ expenses = [] }) => {
  if (!expenses.length) {
    return <div>No data available</div>;
  }

  const categoryTotals = expenses.reduce((acc: any, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const mostSpentCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  const totalExpensesLastMonth = 1000; // Replace with real logic
  const totalExpensesCurrentMonth = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthOverMonthChange = ((totalExpensesCurrentMonth - totalExpensesLastMonth) / totalExpensesLastMonth) * 100;

  const topExpense = expenses.length
    ? expenses.reduce(
        (prev, current) => (prev.amount > current.amount ? prev : current),
        { amount: 0, category: '' }
      )
    : { amount: 0, category: 'N/A' };

  return (
    <FinancialTrendsStyled>
      <h3>Financial Trends</h3>
      <div className="trend-item">
        <strong>Most Spent Category:</strong>
        <span>{mostSpentCategory}</span>
      </div>
      <div className="trend-item">
        <strong>Month-over-Month Change:</strong>
        <span>{monthOverMonthChange.toFixed(2)}%</span>
      </div>
      <div className="trend-item">
        <strong>Top Expense:</strong>
        <span>{topExpense.category}: ${topExpense.amount}</span>
      </div>
    </FinancialTrendsStyled>
  );
};

const FinancialTrendsStyled = styled.div`
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .trend-item {
    margin-top: 1rem;
    font-size: 1rem;

    strong {
      font-weight: 700;
    }

    span {
      font-weight: 500;
      color: #333;
    }
  }
`;

export default FinancialTrends;
