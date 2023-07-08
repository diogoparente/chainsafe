import { render, act } from "@testing-library/react";
import axios from "axios";
import { useCountries } from "./use-countries";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { AppProvider } from "@/context/app-context";
import countries, { selectedCountry } from "@/tests/fixtures/countries";
import visitorApiData from "@/tests/fixtures/visitor";

const restCountriesApiUrl = "https://restcountries.com/v3.1/all";
const visitorApiUrl = "https://api.visitorapi.com/api/";

const mockCtx = { selectedCountry };

const server = setupServer(
  rest.get(restCountriesApiUrl, (_req, res, ctx) => {
    return res(ctx.json(countries));
  }),
  rest.get(visitorApiUrl, (_req, res, ctx) => {
    return res(ctx.json(visitorApiData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useCountries hook", () => {
  it("should fetch all countries", async () => {
    let hook;

    const TestComponent = () => {
      hook = useCountries();
      return null;
    };

    render(
      <AppProvider {...mockCtx}>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      await axios.get(restCountriesApiUrl);
    });

    const expectedResult = [
      { key: "JO", value: "Jordan" },
      { key: "PT", value: "Portugal" },
    ];

    expect(hook!.countries).toEqual(expectedResult);
  });
});
