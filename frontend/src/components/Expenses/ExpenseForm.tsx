import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useGlobalContext } from "../../context/globalContext";
import { expenseCategoryIcons } from "../../utils/Icons"; 

interface InputState {
  title: string;
  amount: string;
  date: Date | null;
  category: string;
  description: string;
}

function ExpenseForm() {
  const { addExpense, getExpenses, error, setError, clearError } = useGlobalContext();
  const [inputState, setInputState] = useState<InputState>({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput =
    (name: keyof InputState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setInputState({ ...inputState, [name]: e.target.value });
      clearError(); // Clears error when user starts typing
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      setError("Please fill in all required fields!");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Amount must be a positive number!");
      return;
    }

    const payload = {
      title,
      amount: parseFloat(amount), 
      date: date?.toISOString(),
      category,
      description,
    };

    try {
      console.log("Payload:", payload);
  
      await addExpense(payload);
      await getExpenses();
  
      setInputState({
        title: "",
        amount: "",
        date: null,
        category: "",
        description: "",
      });
  
      clearError();
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>} 
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date | null) => setInputState({ ...inputState, date })}
        />
      </div>
      <div className="selects input-control">
  <select required value={category} name="category" id="category" onChange={handleInput('category')}>
    <option value="" disabled>Select Option</option>
    <option value="education">
      {expenseCategoryIcons.education} Education
    </option>
    <option value="groceries">
      {expenseCategoryIcons.groceries} Groceries
    </option>
    <option value="health">
      {expenseCategoryIcons.health} Health
    </option>
    <option value="subscriptions">
      {expenseCategoryIcons.subscriptions} Subscriptions
    </option>
    <option value="takeaways">
      {expenseCategoryIcons.takeaways} Takeaways
    </option>
    <option value="clothing">
      {expenseCategoryIcons.clothing} Clothing
    </option>
    <option value="travelling">
      {expenseCategoryIcons.travelling} Travelling
    </option>
    <option value="other">
      {expenseCategoryIcons.other} Other
    </option>
  </select>
</div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols={30}
          rows={4}
          onChange={handleInput("description")}
        />
      </div>
      <div className="submit-btn">
        <Button
          name="Add Expense"
          icon={"+"}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="blue"
          color="#fff"
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus, &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default ExpenseForm;
