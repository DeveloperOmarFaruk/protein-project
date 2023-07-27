import axios from "axios";
import { BASE_URL, proteinEndpoints } from "../constant/apiConstant";

export const getProteinRanges = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/protien-position-range`);
    return response.data;
  } catch (error) {
    console.log("Range error:", error);
    return null;
  }
};

export const sendRequest = async (protein, data) => {
  const proteinEndpoint = proteinEndpoints[protein];
  if (!proteinEndpoint) return;

  const url = `${BASE_URL}/${proteinEndpoint}`;

  try {
    const response = await axios.post(url, data);
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Protein error:", error);
    return null;
  }
};
