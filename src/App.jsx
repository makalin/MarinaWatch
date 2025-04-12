import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import PriceChart from './components/PriceChart';
import FilterPanel from './components/FilterPanel';
import data from './data/sample-data.json';

function App() {
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({ country: '', region: '' });

  useEffect(() => {
    setEntries(data);
  }, []);

  const filtered = entries.filter(entry => {
    return (
      (!filters.country || entry.country === filters.country) &&
      (!filters.region || entry.region === filters.region)
    );
  });

  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">MarinaWatch</h1>
        <button
          className="bg-slate-200 px-2 py-1 rounded"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          Toggle Dark Mode
        </button>
      </header>
      <FilterPanel filters={filters} setFilters={setFilters} entries={entries} />
      <MapView entries={filtered} />
      <PriceChart entries={filtered} />
    </div>
  );
}

export default App;