// Calendar.test.tsx

import { render } from "@testing-library/react";
import { Calendar } from "./calendar";
import { useHolidays } from "../../hooks/use-holidays";

jest.mock("../../hooks/use-holidays");

test("Calendar renders holidays returned by useHolidays", () => {
  const mockHolidays = [
    { date: "2023-07-04", name: "Independence Day", type: "Public" },
  ];

  // @ts-ignore
  useHolidays.mockReturnValue({ holidays: mockHolidays, isFetching: false });

  const { getByText } = render(<Calendar />);

  expect(getByText("Independence Day")).toBeInTheDocument();
});
