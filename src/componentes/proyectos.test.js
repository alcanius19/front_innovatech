import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow } from "enzyme";
import ;

describe("Mi App", () => {
  it("debe ejecutar", () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });
});
