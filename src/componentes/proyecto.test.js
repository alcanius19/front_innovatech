import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow } from "enzyme";
import PaginaUsuarios from "./usuario/PaginaUsuarios";

describe("Proyectos", () => {
  it("debe ejecutar", () => {
    const component = shallow(<PaginaUsuarios />);

    expect(component).toMatchSnapshot();
  });
});
