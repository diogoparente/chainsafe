import { useAppContext } from "@/context/app-context";
import axios from "axios";
import { useEffect, useState } from "react";

type Holiday = {
  country: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
};

const API_NINJAS_KEY = process.env.API_NINJAS_KEY;
const API_NINJAS_URL = process.env.API_NINJAS_URL;
function filterByMonth({
  month,
  holidays,
}: {
  month: number;
  holidays: Holiday[];
}) {
  const filteredHolidays = holidays
    .filter((holiday) => {
      const holidayDate = new Date(holiday.date);
      const dateMonth = holidayDate.getUTCMonth();
      return dateMonth === month;
    })
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  return filteredHolidays;
}

const useHolidaysApi = () => {
  const [_error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [holidays, setHolidays] = useState<Holiday[] | null>(null);
  const { selectedCountry, year, month } = useAppContext();

  useEffect(() => {
    const getHolidays = async () => {
      if (selectedCountry) {
        setError(false);
        setIsFetching(true);
        return axios
          .get(`${API_NINJAS_URL}?country=${selectedCountry}&year=${year}`, {
            headers: {
              "X-Api-Key": API_NINJAS_KEY,
            },
          })
          .then((response) => {
            const holidays: Holiday[] = filterByMonth({
              month,
              holidays: response.data,
            });
            setIsFetching(false);
            setHolidays(holidays);
          })
          .catch(() => {
            setIsFetching(false);
            setError(true);
          });
      }
    };

    getHolidays();
  }, [month, selectedCountry, year]);

  return { holidays, isFetching };
};

export { useHolidaysApi };
