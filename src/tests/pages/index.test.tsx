import { render, waitFor, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
import countries from "../fixtures/countries";
import holidays from "../fixtures/holidays";
import visitorApiData from "../fixtures/visitor";

const restCountriesApiUrl = "https://restcountries.com/v3.1/all";
const visitorApiUrl = "https://api.visitorapi.com/api/";
const apiNinjasUrl = "https://api.api-ninjas.com/v1/holidays";

const server = setupServer(
  rest.get(restCountriesApiUrl, (_req, res, ctx) => {
    return res(ctx.json(countries));
  }),
  rest.get(apiNinjasUrl, (_req, res, ctx) => {
    return res(ctx.json(holidays));
  }),
  rest.get(visitorApiUrl, (req, res, ctx) => {
    return res(ctx.json(visitorApiData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home Page", () => {
  it("renders the selects and calendar", async () => {
    const { getByLabelText } = render(<Home />);

    expect(getByLabelText("Country")).toBeInTheDocument();
    expect(getByLabelText("Month")).toBeInTheDocument();
    expect(getByLabelText("Year")).toBeInTheDocument();
  });

  it("updates the calendar when selects are changed", async () => {
    const { getByLabelText } = render(<Home />);

    await waitFor(() =>
      expect(
        screen.getByRole("combobox", { name: /country/i })
      ).toHaveTextContent("Portugal")
    );

    // Simulate user changing the selects
    act(() => {
      userEvent.selectOptions(getByLabelText("Country"), "Portugal");
      userEvent.selectOptions(getByLabelText("Month"), "July");
      userEvent.selectOptions(getByLabelText("Year"), "2023");
    });

    // Wait for holidays to load
    await waitFor(() =>
      expect(screen.queryByText("Fetching holidays...")).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByText("Madeira Day")).toBeInTheDocument()
    );
  });
});
