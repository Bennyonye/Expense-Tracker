import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import RecentTransactions from './RecentTransactions';
import CategoryBreakdown from './CategoryBreakdown';
import FinancialTrends from './FinancialTrends';

const HomeDashboard: React.FC = () => {
  const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  useEffect(() => {
    // Get recent transactions (e.g., last 5 transactions)
    const transactions = [...incomes, ...expenses];
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by latest
    setRecentTransactions(transactions.slice(0, 5)); // Show last 5 transactions
  }, [incomes, expenses]);

  return (
    <HomeDashboardStyled>
      <InnerLayout>
        <h1>Welcome to Your Dashboard</h1>
        <div className="stats-con">
          <div className="recent-transactions-con">
            <h2>Recent Transactions</h2>
            <RecentTransactions transactions={recentTransactions} />
          </div>
          <div className="category-breakdown-con">
            <h2>Expense Breakdown by Category</h2>
            <CategoryBreakdown expenses={expenses} />
          </div>
        </div>
        <div className="financial-tred">
            < FinancialTrends expenses={expenses} />
        </div>
      </InnerLayout>
    </HomeDashboardStyled>
  );
}

const HomeDashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    .recent-transactions-con,
    .category-breakdown-con {
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
    }
  }
`;

export default HomeDashboard;
