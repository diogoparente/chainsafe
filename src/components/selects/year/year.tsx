import { Dropdown } from "@/components/dropdown";
import { Option } from "@/components/dropdown/dropdown";
import { useAppContext } from "@/context/app-context";
import React from "react";

const options: Option[] = [];

const currentYear = new Date().getFullYear();

for (let year = 2010; year <= currentYear; year++) {
  options.push({ key: year.toString(), value: year.toString() });
}

const YearSelect = () => {
  const { year, setYear } = useAppContext();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <div className={"flex-1"}>
      <Dropdown
        label="Year"
        selectId={"year"}
        value={String(year)}
        onChange={handleYearChange}
        options={options}
      />
    </div>
  );
};
export { YearSelect };
