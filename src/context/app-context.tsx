import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import VisitorAPI from "visitorapi";

export interface ContextProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
}

const currDate = new Date();

const defaultContext = {
  selectedCountry: "",
  setSelectedCountry: (country: string) => {},
  year: currDate.getFullYear(),
  setYear: (year: number) => {},
  month: currDate.getMonth(),
  setMonth: (month: number) => {},
};

export const AppContext = createContext<ContextProps>(defaultContext);

const VS_PROJECT_ID = process.env.VS_PROJECT_ID;

export const AppProvider = ({
  children,
  selectedCountry: country = "",
  year = currDate.getFullYear(),
  month = currDate.getMonth(),
}: PropsWithChildren<Partial<ContextProps>>) => {
  const [_country, setSelectedCountry] = useState(country);
  const [_year, setYear] = useState(year);
  const [_month, setMonth] = useState(month);

  useEffect(() => {
    VisitorAPI(VS_PROJECT_ID, ({ countryName }: { countryName: string }) =>
      setSelectedCountry(countryName)
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedCountry: _country,
        setSelectedCountry,
        year: _year,
        setYear,
        month: _month,
        setMonth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
