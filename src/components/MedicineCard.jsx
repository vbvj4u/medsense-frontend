export default function MedicineCard({ medicine }) {
  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>
      {medicine.description && <p>{medicine.description}</p>}
      {medicine.dosage_instructions && (
        <p>
          <strong>Dosage:</strong> {medicine.dosage_instructions}
        </p>
      )}
      {medicine.side_effects?.length > 0 && (
        <p>
          <strong>Side effects:</strong> {medicine.side_effects.join(", ")}
        </p>
      )}
    </div>
  );
}
