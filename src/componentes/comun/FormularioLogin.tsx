import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { IAUsuario, usarAutenticarContexto } from "../ganchos/useAutenticar";
import { useNavigate } from "react-router-dom";

export interface IPropsFormulario {
  botones: { [index: string]: IPropsBotones };
  cerrarForm: () => void;
  mensaje: string;
  textoOpcion: string;
}

export interface IPropsBotones {
  nombre: string;
  click: (ausuario: IAUsuario) => void;
  claseBoton: string;
}
const FormularioLogin = ({ formulario }: { formulario: IPropsFormulario }) => {
  const [cargando] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { autenticado, usuario, salir, ingresar } = usarAutenticarContexto();
  const navegar = useNavigate();
  const [ausuario, setAusuario] = useState({} as IAUsuario);

  useEffect(() => {
    if (autenticado) {
      navegar("/proyectos");
      formulario.cerrarForm();
    }
  }, [autenticado]);
  useEffect(() => {
    if (usuario) console.log(usuario);
  }, [usuario]);

  const manejarLogin = (ausuario: IAUsuario) => {
    const _ingresar = typeof ingresar === "function" ? ingresar() : null;
    if (_ingresar) {
      _ingresar(ausuario);
    }
  };

  const [identificacion, setIdentificacion] = useState("");
  const [contrasena, setcontrasena] = useState("");

  useEffect(() => {
    if (identificacion !== "") {
      setAusuario({ ...ausuario, identificacion: identificacion });
    }
  }, [identificacion]);

  useEffect(() => {
    if (contrasena !== "") {
      setAusuario({ ...ausuario, contrasena: contrasena });
    }
  }, [contrasena]);
  //const botones: { [index: string]: IPropsBotones } = formulario?.botones;
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>{formulario.mensaje}</Form.Label>
        <div className="clearfix"></div>
        <Form.Text className="text-muted text-dark">
          {formulario.textoOpcion}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ausuario">
        <Form.Label>ausuario:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese el ausuario..."}
          value={identificacion}
          readOnly={cargando}
          onChange={(e) => setIdentificacion(e.target.value)}
        />
        <Form.Text className="text-muted">Ingrese el ausuario.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ausuario">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese el contraseña..."}
          value={contrasena}
          readOnly={cargando}
          onChange={(e) => setcontrasena(e.target.value)}
        />
        <Form.Text className="text-muted">Ingrese la contraseña.</Form.Text>
      </Form.Group>
      {/* {botones &&
        Object.keys(botones).map((llave: string) => {
          const boton: IPropsBotones = botones[llave];
          return (
            <Button
              variant={boton.claseBoton}
              key={v4()}
              onClick={() => boton.click(ausuario)}
            >
              {boton.nombre}
            </Button>
          );
        })} */}
      <Button
        variant={"outline-success"}
        key={v4()}
        onClick={() => manejarLogin(ausuario)}
      >
        Ingresar
      </Button>
    </Form>
  );
};
FormularioLogin.propTypes = {
  formulario: PropTypes.object.isRequired,
};

export default FormularioLogin;
