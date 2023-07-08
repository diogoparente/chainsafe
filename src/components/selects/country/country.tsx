import React from "react";
import { useAppContext } from "@/context/app-context";
import { Dropdown } from "../../dropdown";
import { useCountries } from "@/hooks/use-countries";

const CountrySelect: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useAppContext();
  const { countries } = useCountries();

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedCountry(event.target.value);

  return (
    <div className={"flex-1"}>
      <Dropdown
        label="Country"
        selectId="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countries}
      />
    </div>
  );
};

export { CountrySelect };
