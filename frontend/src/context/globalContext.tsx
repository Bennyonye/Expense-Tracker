import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import axios from "axios";

// Define the base URL for API requests
const BASE_URL = "http://localhost:5001/api/v1/";

// Define the type for context values
interface GlobalContextType {
  incomes: any[];
  expenses: any[];
  error: string | null;
  clearError: () => void; 
  setError: (error: string | null) => void;
  addIncome: (income: any) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  totalIncome: number;
  addExpense: (expense: any) => Promise<void>;
  getExpenses: () => Promise<void>; 
  deleteExpense: (id: string) => Promise<void>;
  totalExpense: number;
  totalBalance: number;
  transactionHistory: any[];
}

// Define the initial context values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define props for the GlobalProvider
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Add income to the database and update state
  const addIncome = async (income: any) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      setIncomes((prevIncomes) => [...prevIncomes, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Get incomes from the API and update state
  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-income`);        console.log("Fetched incomes:", response.data);
      setIncomes(response.data);
    } catch (err: any) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "Something went wrong");      }
  }, []);

  // Delete income from the database and update state
  const deleteIncome = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);  // Assuming the backend expects the income id in the URL
      setIncomes((prevIncomes) => prevIncomes.filter((income) => income._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Calculate total income using useMemo
  const totalIncome = useMemo(() => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  }, [incomes]);  // Recalculate whenever incomes change
    
  // Get expense from the API and update state
  const addExpense = async (expense: any) => {
      try {
        const response = await axios.post(`${BASE_URL}add-expense`, expense);
        setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
    }
  };

    // Get expense from the API and update state
    const getExpenses = useCallback(async () => {
      try {
        const response = await axios.get(`${BASE_URL}get-expense`);
        setExpenses(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
    }
  }, []);

    // Delete expense from the database and update state
    const deleteExpense = async (id: string) => {
      try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Calculate total expense
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    
  // Calculate total balance as the difference between total income and total expenses
  const totalBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

// Combine incomes and expenses into one array
const transactionHistory = useMemo(() => {
  const allTransactions = [
    ...incomes.map((income) => ({ ...income, type: 'income' })),
    ...expenses.map((expense) => ({ ...expense, type: 'expense' })),
  ];

  // Sort transactions by date (assuming you have a 'date' property)
  allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allTransactions.slice(0,5);
}, [incomes, expenses]);  // Recalculate whenever incomes or expenses change

  // Define clearError to reset the error state
  const clearError = () => setError(null);
    
  return (
    <GlobalContext.Provider
      value={{ 
        incomes, 
        addIncome, 
        getIncomes, 
        deleteIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpense,
        error, 
        setError, 
        clearError,
        totalIncome,
        totalExpense,
        transactionHistory,
        totalBalance
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
