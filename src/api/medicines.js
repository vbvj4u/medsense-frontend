const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function searchMedicines(query) {
  const url = new URL(`${API_BASE_URL}/api/medicines`);
  if (query) url.searchParams.set("search", query);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

export async function getMedicine(id) {
  const res = await fetch(`${API_BASE_URL}/api/medicines/${id}`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}
