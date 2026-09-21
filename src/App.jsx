import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import MedicineCard from "./components/MedicineCard.jsx";
import { searchMedicines } from "./api/medicines.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done

  async function runSearch() {
    setStatus("loading");
    try {
      const medicines = await searchMedicines(query);
      setResults(medicines);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="app">
      <h1>MedSense</h1>
      <p>Search a medicine name to see dosage and side-effect info.</p>

      <SearchBar value={query} onChange={setQuery} onSubmit={runSearch} />

      {status === "loading" && <p>Searching...</p>}
      {status === "error" && <p role="alert">Something went wrong. Try again.</p>}
      {status === "done" && results.length === 0 && <p>No matches found.</p>}

      <div className="results">
        {results.map((med) => (
          <MedicineCard key={med.id} medicine={med} />
        ))}
      </div>
    </main>
  );
}
