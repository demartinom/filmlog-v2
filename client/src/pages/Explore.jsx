import { AppShellMain } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

/*TODO:
    API call for all film stocks
    Render all Film Stocks
    Compare tool
    Click on stock for more info
*/

export default function Explore() {
  // State for information on all film stocks
  const [filmStockData, setFilmStockData] = useState([]);
  // Loading state while receiving data
  const [loading, setLoading] = useState(true);

  // api call to get all film stock data
  useEffect(() => {
    async function getStocks() {
      try {
        const res = await axios.get("/api/films/all");
        setFilmStockData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      //Set loading to false to display data
    }
    getStocks();
  }, []);

  // Map over all film stocks to display information
  const filmData = filmStockData.map((stock) => (
    <div key={stock.id}>{stock.name}</div>
  ));

  // Renders loading when fetching data
  if (loading) {
    return <AppShellMain>Loading...</AppShellMain>;
  }
  // Render returned data
  return <AppShellMain>{filmData}</AppShellMain>;
}
