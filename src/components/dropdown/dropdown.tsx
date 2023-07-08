export type Option = { key: string; value: string };

interface DropdownProps {
  label: string;
  selectId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectId,
  onChange,
  value,
  options,
}) => {
  return (
    <div className={"m-2 flex-1 min-w-[8rem]"}>
      <label
        htmlFor={selectId}
        className="block mb-2 text-sm font-medium text-slate-600"
      >
        {label}
      </label>
      <select
        onChange={onChange}
        id={selectId}
        value={value}
        className="bg-gray-50 border hover:shadow-lg hover:cursor-pointer hover:shadow-slate-800  text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map(({ key, value }: Option) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Dropdown };
