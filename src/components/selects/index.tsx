import { CountrySelect } from "./country";
import { MonthSelect } from "./month";
import { YearSelect } from "./year";

const Selects = () => (
  <div className="flex justify-center">
    <div className="flex flex-wrap">
      <CountrySelect />
      <div className="flex-1 flex flex-wrap">
        <MonthSelect />
        <YearSelect />
      </div>
    </div>
  </div>
);

export { Selects };
