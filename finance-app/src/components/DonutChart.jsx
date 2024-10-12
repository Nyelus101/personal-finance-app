// DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend); // Register Chart.js elements

const DonutChart = ({ budgets, transactions }) => {
  // Helper function to get spent and remaining amounts
  const getSpentAndRemaining = (category, maximum) => {
    const spentTransactions = transactions.filter(transaction => transaction.category === category);
    const totalSpent = spentTransactions.reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
    const remaining = maximum - totalSpent;

    return { totalSpent, remaining };
  };

  // Prepare data for the donut chart
  const getDonutChartData = () => {
    const data = budgets.map(budget => {
      const { totalSpent } = getSpentAndRemaining(budget.category, budget.maximum);
      return totalSpent;
    });
    const backgroundColor = budgets.map(budget => budget.theme);

    return {
      datasets: [{
        data,
        backgroundColor,
        hoverOffset: 4,
      }]
    };
  };

  // Helper function to get total spent and maximum
  const getTotalSpentAndMaximum = () => {
    const totalSpent = budgets.reduce((sum, budget) => {
      const spentForCategory = transactions
        .filter(transaction => transaction.category === budget.category)
        .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

      return sum + spentForCategory;
    }, 0);

    const totalMaximum = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

    return { totalSpent, totalMaximum };
  };

  return (
    <div className='donut-pie relative w-full h-64'>
      <Doughnut 
        data={getDonutChartData()} 
        options={{ maintainAspectRatio: false }} 
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='p-2 rounded flex flex-col items-center'>
          <span className='font-bold text-xl'>${getTotalSpentAndMaximum().totalSpent.toFixed(2)}</span>
          <span>of ${getTotalSpentAndMaximum().totalMaximum.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
