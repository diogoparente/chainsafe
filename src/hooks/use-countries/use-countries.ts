import { Option } from "@/components/dropdown/dropdown";
import axios from "axios";
import { useState, useEffect } from "react";

type RawCountry = { cca2: string; name: { common: string } };
type Country = { key: string; value: string };

const API_COUNTRIES = process.env.API_COUNTRIES!;

const rawCountriesToCountries = (data: RawCountry[]): Country[] => {
  return data
    .map((c) => {
      return {
        key: c.cca2,
        value: c.name.common,
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));
};

const useCountries = () => {
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState<Option[]>([]);

  useEffect(() => {
    if (error) {
      setError(false);
    }
    axios
      .get(API_COUNTRIES)
      .then(({ data: rawCountries }) => {
        const countries = rawCountriesToCountries(rawCountries);
        setCountries(countries);
      })
      .catch(() => {
        setError(true);
      });
  }, [error]);

  return { countries };
};

export { useCountries };
