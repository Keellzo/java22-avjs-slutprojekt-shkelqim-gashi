import "../../css/Filter.css";

// ProductFilter component that allows users to sort and filter products based on the provided options
export default function ProductFilter({
  sortOptions,
  onSortChange,
  onFilterChange,
}) {
  return (
    <div className="filters">
      <div className="sort-filter">
        <label htmlFor="sort">Sort by:</label>
        <select
          name="sort"
          id="sort"
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="search-filter">
        <label htmlFor="filter">Search:</label>
        <input
          type="text"
          id="filter"
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
}
