function FilterPanel({ filters, setFilters, entries }) {
  const countries = [...new Set(entries.map(e => e.country))];
  const regions = [...new Set(entries.map(e => e.region))];

  return (
    <div className="flex gap-4 mb-4">
      <select
        className="p-2 border rounded"
        value={filters.country}
        onChange={e => setFilters({ ...filters, country: e.target.value })}
      >
        <option value="">All Countries</option>
        {countries.map(c => <option key={c}>{c}</option>)}
      </select>
      <select
        className="p-2 border rounded"
        value={filters.region}
        onChange={e => setFilters({ ...filters, region: e.target.value })}
      >
        <option value="">All Regions</option>
        {regions.map(r => <option key={r}>{r}</option>)}
      </select>
    </div>
  );
}

export default FilterPanel;