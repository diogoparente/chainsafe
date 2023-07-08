// AppProvider.test.tsx

import { render } from "@testing-library/react";
import { AppProvider, AppContext, ContextProps } from "./app-context";

test("AppProvider provides context with the default values", () => {
  const testRender = render(
    <AppProvider>
      <AppContext.Consumer>
        {(value: ContextProps) => (
          <div data-testid="contextValues">
            <div data-testid="year">{value.year}</div>
            <div data-testid="month">{value.month}</div>
          </div>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );

  const yearElement = testRender.getByTestId("year");
  const monthElement = testRender.getByTestId("month");

  const currentDate = new Date();

  expect(yearElement.textContent).toBe(`${currentDate.getFullYear()}`);

  expect(monthElement.textContent).toBe(`${currentDate.getMonth()}`);
});
