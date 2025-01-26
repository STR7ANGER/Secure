import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JSDOM } from "jsdom";

// Configure Enzyme
configure({ adapter: new Adapter() });

// Configure jsdom
const { window } = new JSDOM("<!doctype html><html><body></body></html>");

// Set global variables from jsdom window
// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: "node.js",
// };

// const window = dom.window;
const document = window.document;

// Example usage
const element = document.createElement("div");
element.textContent = "Hello, world!";
document.body.appendChild(element);

console.log(document.body.innerHTML);
