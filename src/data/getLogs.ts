async function getLogs() {
  const data = await fetch("http://localhost:5001/api/logs");
  const response = data.json();
  return response;
}

export default getLogs;
