import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ entries }) {
  const years = [...new Set(entries.map(e => e.year))].sort();
  const data = {
    labels: years,
    datasets: [
      {
        label: 'Average Price (EUR)',
        data: years.map(y => {
          const prices = entries.filter(e => e.year === y).map(e => e.price);
          return prices.reduce((a, b) => a + b, 0) / prices.length;
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return <Line data={data} />;
}

export default PriceChart;