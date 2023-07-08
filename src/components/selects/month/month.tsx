import { Dropdown, Option } from "@/components/dropdown/dropdown";
import { useAppContext } from "@/context/app-context";
import React from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const months: Option[] = monthNames.map((month, index) => {
  return { key: index.toString(), value: month };
});

const getMonthIndexByName = (monthName: string) => {
  const index = monthNames.indexOf(monthName);
  return index;
};
const MonthSelect = () => {
  const { month, setMonth } = useAppContext();

  const handleMonthChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = getMonthIndexByName(value);
    setMonth(monthIndex);
  };

  return (
    <div className={"flex-1 min-w-[10rem]"}>
      <Dropdown
        label="Month"
        selectId={"month"}
        value={months[month].value}
        onChange={handleMonthChange}
        options={months}
      />
    </div>
  );
};
export { MonthSelect };
