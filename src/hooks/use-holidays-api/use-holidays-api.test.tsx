import { render, waitFor } from "@testing-library/react";
import { useHolidaysApi } from "./use-holidays-api";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { AppProvider } from "@/context/app-context";
import { selectedCountry } from "@/tests/fixtures/countries";
import holidays from "@/tests/fixtures/holidays";
import visitorApiData from "@/tests/fixtures/visitor";

const visitorApiUrl = "https://api.visitorapi.com/api/";
const apiNinjasUrl = "https://api.api-ninjas.com/v1/holidays";

const testDate = "2023-07-01";

const mockCtx = {
  selectedCountry,
  year: 2023,
  month: new Date(testDate).getUTCMonth(),
};

const server = setupServer(
  rest.get(apiNinjasUrl, (_req, res, ctx) => {
    return res(ctx.json(holidays));
  }),
  rest.get(visitorApiUrl, (_req, res, ctx) => {
    return res(ctx.json(visitorApiData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("useHolidaysApi hook", () => {
  it("should fetch holidays for given country, year, and month", async () => {
    let hook;

    const TestComponent = () => {
      hook = useHolidaysApi();
      return null;
    };

    render(
      <AppProvider {...mockCtx}>
        <TestComponent />
      </AppProvider>
    );

    await waitFor(() => expect(hook!.isFetching).toBe(false));

    expect(hook!.isFetching).toBe(false);
    expect(hook!.holidays).toEqual([holidays[0]]);
  });
});
