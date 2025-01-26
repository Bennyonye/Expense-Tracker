import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  
  import { Line } from "react-chartjs-2";
  import styled from "styled-components";
  import { useGlobalContext } from "../../context/globalContext";
  import { dateFormat } from "../../utils/dateFormat";
  import { ChartOptions } from "chart.js";
  
  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  
  function Chart() {
    const { incomes, expenses } = useGlobalContext();
  
    // Check if data is still loading or empty
    const isDataLoading = incomes.length === 0 && expenses.length === 0;
  
    const data = {
      labels: incomes.map((inc) => {
        const { date } = inc;
        return dateFormat(date);
      }),
      datasets: [
        {
          label: "Income",
          data: incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.3,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverRadius: 6,
          fill: true,
        },
        {
          label: "Expenses",
          data: expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.3,
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverRadius: 6,
          fill: true,
        },
      ],
    };
  
    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Income vs Expenses Chart",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            color: "rgba(200, 200, 200, 0.2)",
          },
          beginAtZero: true,
        },
      },
    };
  
    // Show loading or no-data state if data is not ready
    if (isDataLoading) {
      return (
        <ChartStyled>
          <p>Loading chart data...</p>
        </ChartStyled>
      );
    }
  
    // Check if there is no data after loading
    if (incomes.length === 0 && expenses.length === 0) {
      return (
        <ChartStyled>
          <p>No data available for the chart.</p>
        </ChartStyled>
      );
    }
  
    return (
      <ChartStyled>
        <Line data={data} options={options} />
      </ChartStyled>
    );
  }
  
  const ChartStyled = styled.div`
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
  
    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  
    p {
      text-align: center;
      color: rgba(34, 34, 96, 0.7);
      font-size: 1.2rem;
    }
  `;
  
  export default Chart;
  