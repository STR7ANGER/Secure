import React from "react";
import { render, screen } from "@testing-library/react";

import { cleanup, fireEvent } from "@testing-library/react";
import CheckboxWithLabel from "../src/demo";

afterEach(cleanup);
// Enzyme.configure({ adapter: new Adapter() });

// it('CheckboxWithLabel changes the text after click', () => {
//     const { queryByLabelText, getByLabelText } = render(
//         <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//     );

//     expect(queryByLabelText(/off/i)).toBeTruthy();

//     fireEvent.click(getByLabelText(/off/i));

//     expect(queryByLabelText(/on/i)).toBeTruthy();
// });
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
// test('use jsdom in this test file', () => {
//     const element = document.createElement('div');
//     expect(element).not.toBeNull();
//   });
// it('CheckboxWithLabel changes the text after click', () => {
//     // Render a checkbox with label in the document
//     const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

//     expect(checkbox.text()).toBe('Off');

//     checkbox.find('input').simulate('change');

//     expect(checkbox.text()).toBe('On');
// });

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
