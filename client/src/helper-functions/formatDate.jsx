// Format date found in dateStarted and dateFinished to dd/mm/yy format
export function formatDate(rollDate) {
  let dateStarted = new Date(rollDate);
  let formattedDateStarted = `${dateStarted.getMonth() + 1}/${dateStarted.getDate()}/${dateStarted.getFullYear().toString().slice(-2)}`;
  return formattedDateStarted;
}
