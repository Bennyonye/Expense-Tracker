import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import axios from "axios";

// Define the base URL for API requests
const BASE_URL = "http://localhost:5001/api/v1/";

// Define the type for context values
interface GlobalContextType {
  incomes: any[];
  expenses: any[];
  error: string | null;
  setError: (error: string | null) => void;
  addIncome: (income: any) => Promise<void>;
  getIncomes: () => Promise<void>;
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
        const response = await axios.get(`${BASE_URL}get-income`);
        console.log("Fetched incomes:", response.data);
        setIncomes(response.data);
      } catch (err: any) {
        console.error("Error fetching incomes:", err);
        setError(err.response?.data?.message || "Something went wrong");
      }
    }, []);
    
  return (
    <GlobalContext.Provider value={{ incomes, addIncome, getIncomes, expenses, error, setError }}>
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
