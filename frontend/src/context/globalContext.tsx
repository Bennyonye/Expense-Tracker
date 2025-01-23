import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:6000/api/v1/";

interface Income {
  _id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  createdAt: string;
  type: "income" | "expense";
}

interface Expense extends Income {}

interface GlobalContextType {
  incomes: Income[];
  expenses: Expense[];
  error: string | null;
  addIncome: (income: Omit<Income, "_id" | "createdAt" | "type">) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  totalIncome: () => number;
  addExpense: (expense: Omit<Expense, "_id" | "createdAt" | "type">) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  totalExpenses: () => number;
  totalBalance: () => number;
  transactionHistory: () => (Income | Expense)[];
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Calculate Incomes
  const addIncome = async (income: Omit<Income, "_id" | "createdAt" | "type">) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      console.error("Error fetching incomes", err);
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      console.error("Error deleting income", err);
    }
  };

  const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

  // Calculate Expenses
  const addExpense = async (expense: Omit<Expense, "_id" | "createdAt" | "type">) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };

  const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
