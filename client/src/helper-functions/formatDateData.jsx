export function formatDateData(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getUTCFullYear(); // Using UTC methods
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObject.getUTCDate()).padStart(2, "0");

  return new Date(`${year},${month},${day}`);
}
