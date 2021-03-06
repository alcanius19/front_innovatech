import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow } from "enzyme";
import PaginaProyectos from "./proyectos/PaginaProyectos";
import CustomApolloProvider from "../graphql/cliente_apollo";
describe("Proyectos", () => {
  it("debe ejecutar", () => {
    const component = shallow(
      <CustomApolloProvider>
        <PaginaProyectos />
      </CustomApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
