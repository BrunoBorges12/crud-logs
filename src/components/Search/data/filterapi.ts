/* eslint-disable @typescript-eslint/no-explicit-any */
import { URLAPI } from "../../../config/config";

export const fetchDataFromAPI = async (
  nivel: any,
  dataini: any,
  datafim: any,
  relatorio: any
) => {
  const response = await fetch(`${URLAPI}/api/logs/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nivel: nivel.toUpperCase(),
      start_date: dataini ? dataini : "",
      end_date: datafim ? datafim : "",
      text: relatorio.value,
    }),
  });
  return response;
};
