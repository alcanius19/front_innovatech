import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow } from "enzyme";
import PaginaUsuarios from "./usuario/PaginaUsuarios";
import CustomApolloProvider from "../graphql/cliente_apollo";
describe("Proyectos", () => {
  it("debe ejecutar", () => {
    const component = shallow(
      <CustomApolloProvider>
        <PaginaUsuarios />
      </CustomApolloProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
