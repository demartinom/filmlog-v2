import axios from "axios";

export const fetchUserRolls = async (userID, setState) => {
  try {
    const res = await axios.get(
      `https://filmlogapi.vercel.app/api/rolls/${userID}`
    );
    setState(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchUserStats = async (userID, setState) => {
  try {
    const res = await axios.get(
      `https://filmlogapi.vercel.app/api/stats/${userID}`
    );
    setState(res.data);
  } catch (error) {
    console.error("Erorr fetching data: ", error);
  }
};
