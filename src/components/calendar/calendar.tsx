import React from "react";
import { useHolidaysApi } from "@/hooks/use-holidays-api";

function toSentenceCase(value: string) {
  const result = value.replace(/_/g, " ").toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const Calendar: React.FC = () => {
  const { holidays, isFetching } = useHolidaysApi();

  return (
    <div className="flex justify-center mt-8">
      {isFetching ? (
        <div>Fetching holidays...</div>
      ) : holidays && holidays.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light divide-y divide-gray-200 sm:table">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4 sm:table-cell">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4 sm:table-cell">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-4 sm:table-cell">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidays.map((holiday: any) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={holiday.date}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium block sm:table-cell">
                          {holiday.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium block sm:table-cell">
                          {holiday.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium block sm:table-cell">
                          {toSentenceCase(holiday.type)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : !isFetching && holidays?.length === 0 ? (
        <div>No holidays this month</div>
      ) : null}
    </div>
  );
};

export { Calendar };
