import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
}

const CategoryBreakdown: React.FC<Props> = ({ expenses }) => {
  const categories = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFC300'],
        hoverOffset: 4,
      },
    ],
  };

  // Explicitly type categorySummary
  const categorySummary: { category: string; amount: number }[] = Object.entries(categories).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <CategoryBreakdownStyled>
      <Pie data={chartData} />
      <div className="category-summary">
        <h3>Category Summary</h3>
        <ul>
          {categorySummary.map((item, index) => (
            <li key={index}>
              <span className="category-name">{item.category}</span>
              <span className="category-amount">${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </CategoryBreakdownStyled>
  );
};

const CategoryBreakdownStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .category-summary {
    margin-top: 1rem;
    width: 100%;
    background: #f9f9f9;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #333;

        .category-name {
          font-weight: 600;
        }

        .category-amount {
          color: #007bff;
        }
      }
    }
  }
`;

export default CategoryBreakdown;
