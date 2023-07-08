import { fireEvent, render } from "@testing-library/react";
import { Dropdown } from "./dropdown";

test("Dropdown fires onChange event when an option is selected", () => {
  const onChangeMock = jest.fn();

  const { getByLabelText } = render(
    <Dropdown
      label="Test Dropdown"
      selectId="test-dropdown"
      value=""
      onChange={onChangeMock}
      options={[
        { key: "1", value: "Option 1" },
        { key: "2", value: "Option 2" },
      ]}
    />
  );

  fireEvent.change(getByLabelText("Test Dropdown"), { target: { value: "2" } });

  expect(onChangeMock).toHaveBeenCalled();
});
