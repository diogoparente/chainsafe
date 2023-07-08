// Calendar.test.tsx

import { render } from "@testing-library/react";
import { Calendar } from "./calendar";
import { useHolidaysApi } from "../../hooks/use-holidays-api";

jest.mock("../../hooks/use-holidays-api");

test("Calendar renders holidays returned by useHolidaysApi", () => {
  const mockHolidays = [
    { date: "2023-07-04", name: "Independence Day", type: "Public" },
  ];

  // @ts-ignore
  useHolidaysApi.mockReturnValue({ holidays: mockHolidays, isFetching: false });

  const { getByText } = render(<Calendar />);

  expect(getByText("Independence Day")).toBeInTheDocument();
});
