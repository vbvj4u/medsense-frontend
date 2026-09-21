export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a medicine, e.g. Ibuprofen"
        aria-label="Search medicines"
      />
      <button type="submit">Search</button>
    </form>
  );
}
