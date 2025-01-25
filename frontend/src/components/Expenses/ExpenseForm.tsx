// import React, { useState } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useGlobalContext } from '../../context/globalContext';
// import Button from '../Button/Button';
// import { plus } from '../../utils/Icons';

// interface ExpenseInputState {
//   title: string;
//   amount: string;
//   date: Date | null;
//   category: string;
//   description: string;
// }

// function ExpenseForm() {
//   const { addExpense, error, setError } = useGlobalContext();
//   const [inputState, setInputState] = useState<ExpenseInputState>({
//     title: '',
//     amount: '',
//     date: null,
//     category: '',
//     description: '',
//   });

//   const { title, amount, date, category, description } = inputState;

//   const handleInput = (name: keyof ExpenseInputState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setInputState({ ...inputState, [name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !amount || !date || !category || !description) {
//       setError('Please fill out all fields');
//       return;
//     }

//     try {
//       await addExpense(inputState);
//       setInputState({
//         title: '',
//         amount: '',
//         date: null,
//         category: '',
//         description: '',
//       });
//     } catch (err) {
//       console.error('Failed to add expense:', err);
//     }
//   };

//   return (
//     <ExpenseFormStyled onSubmit={handleSubmit}>
//       {error && <p className="error">{error}</p>}
//       <div className="input-control">
//         <label htmlFor="title">Expense Title</label>
//         <input
//           id="title"
//           type="text"
//           value={title}
//           name="title"
//           placeholder="Expense Title"
//           onChange={handleInput('title')}
//         />
//       </div>
//       <div className="input-control">
//         <label htmlFor="amount">Expense Amount</label>
//         <input
//           id="amount"
//           type="text"
//           value={amount}
//           name="amount"
//           placeholder="Expense Amount"
//           onChange={handleInput('amount')}
//         />
//       </div>
//       <div className="input-control">
//         <label htmlFor="date">Date</label>
//         <DatePicker
//           id="date"
//           placeholderText="Enter A Date"
//           selected={date || undefined}
//           dateFormat="dd/MM/yyyy"
//           onChange={(date: Date | null) => setInputState({ ...inputState, date })}
//         />
//       </div>
//       <div className="selects input-control">
//         <label htmlFor="category">Category</label>
//         <select
//           required
//           value={category}
//           name="category"
//           id="category"
//           onChange={handleInput('category')}
//         >
//           <option value="" disabled>
//             Select Option
//           </option>
//           <option value="education">Education</option>
//           <option value="groceries">Groceries</option>
//           <option value="health">Health</option>
//           <option value="subscriptions">Subscriptions</option>
//           <option value="takeaways">Takeaways</option>
//           <option value="clothing">Clothing</option>
//           <option value="travelling">Travelling</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
//       <div className="input-control">
//         <label htmlFor="description">Description</label>
//         <textarea
//           name="description"
//           value={description}
//           placeholder="Add A Reference"
//           id="description"
//           cols={30}
//           rows={4}
//           onChange={handleInput('description')}
//         ></textarea>
//       </div>
//       <div className="submit-btn">
//         <Button
//           name="Add Expense"
//           icon={plus}
//           bPad=".8rem 1.6rem"
//           bRad="30px"
//           bg="blue"
//           color="#fff"
//         />
//       </div>
//     </ExpenseFormStyled>
//   );
// }

// const ExpenseFormStyled = styled.form`
//   display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     input, textarea, select {
//         font-family: inherit;
//         font-size: inherit;
//         outline: none;
//         border: none;
//         padding: 0.5rem 1rem;
//         border-radius: 5px;
//         border: 2px solid #fff;
//         background: transparent;
//         resize: none;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         color: rgba(34, 34, 96, 0.9);
//         &::placeholder {
//             color: rgba(34, 34, 96, 0.4);
//         }
//     }
//     .input-control {
//         input {
//             width: 100%;
//         }
//     }

//     .selects {
//         display: flex;
//         justify-content: flex-end;
//         select {
//             color: rgba(34, 34, 96, 0.4);
//             &:focus, &:active {
//                 color: rgba(34, 34, 96, 1);
//             }
//         }
//     }

//     .submit-btn {
//         button {
//             box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//             &:hover {
//                 background: var(--color-green) !important;
//             }
//         }
//     }
// `;

// export default ExpenseForm;


