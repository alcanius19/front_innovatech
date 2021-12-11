import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Modal, { RenderModalBackdropProps } from "react-overlays/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import useAutenticarContexto from "../ganchos/useAutenticar";
import {
  IAUsuario,
  IEstadoAutenticacion,
  IPropsFormulario,
} from "../Interfaces/Interfaces";
import { EAutenticacion } from "../Enumeraciones/Enumeraciones";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
  email: yup
    .string()
    .email("Ingresa un correo valido.")
    .required("Debes ingresar un correo."),
  password: yup
    .string()
    .password()
    .required("Debes ingresar una contraseña.")
    .minLowercase(
      2,
      "La contraseña debe contener al menos 2 caracteres en minúscula."
    )
    .minUppercase(
      1,
      "La contraseña debe contener al menos 1 caracter en mayúscula."
    )
    .minNumbers(2, "La contraseña debe contener al menos 2 números.")
    .minSymbols(1, "La contraseña debe contener al menos 1 símbolo.")
    .min(6, "La contraseña mínimo debe contener 6 caracteres.")
    .max(14, "La contraseña debe contener máximo 14 caracteres."),
});
const Backdrop = styled("div")`
  position: absolute;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #0edc8d;
  opacity: 0.3;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OverlayCargando = styled(Modal)`
  position: absolute;
  z-index: 2020;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  opacity: 1;
`;

const renderBackdrop = (props: RenderModalBackdropProps) => (
  <Backdrop {...props} />
);
const FormularioLogin = ({ formulario }: { formulario: IPropsFormulario }) => {
  const [cargando, setCargando] = useState(false);
  const [infoLogin, setInfoLogin] = useState("");
  const contenedor = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { estadoAutenticacion, ingresar } = useAutenticarContexto();
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<IAUsuario>({
    resolver: yupResolver(schema),
  });

  const navegar = useNavigate();
  const [ausuario, setAusuario] = useState({} as IAUsuario);

  const manejarLogin = async (ausuario: IAUsuario) => {
    const result = await trigger();
    if (result) {
      const _ingresar = typeof ingresar === "function" ? ingresar() : null;
      if (_ingresar) {
        setCargando(true);
        setTimeout(() => {
          _ingresar(ausuario).then(
            (estadoAutenticacion: void | IEstadoAutenticacion) => {
              if (estadoAutenticacion?.autenticado) {
                formulario.cerrarForm();
                navegar("/proyectos");
              } else {
                switch (estadoAutenticacion?.estado) {
                  case EAutenticacion.NOAUTENTICADO:
                    setInfoLogin("Revise su usuario y su contraseña.");
                    break;
                  case EAutenticacion.SINDATOS:
                    setInfoLogin("Datos incorrectos.");
                    break;
                  case EAutenticacion.ERROR:
                    setInfoLogin("Error en el login");
                    break;
                  default:
                    setInfoLogin("");
                    break;
                }
              }
              setCargando(false);
            }
          );
        }, 2000);
      }
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email !== "") {
      setAusuario({ ...ausuario, email: email });
    }
  }, [email]);

  useEffect(() => {
    if (password !== "") {
      setAusuario({ ...ausuario, password: password });
    }
  }, [password]);

  useEffect(() => {
    if (infoLogin !== "") {
      const id: NodeJS.Timeout = setTimeout(() => {
        setInfoLogin("");
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [infoLogin]);
  return (
    <Form className="login" ref={contenedor}>
      <Form.Group className="mb-1" controlId="formLogin">
        <Form.Label>{formulario.mensaje}</Form.Label>
        {formulario?.textoOpcion && (
          <>
            <div className="clearfix"></div>
            <Form.Text className="text-muted text-dark">
              {formulario.textoOpcion}
            </Form.Text>
          </>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="ausuario-email">
        <Form.Label>Correo:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese el correo..."}
          value={email}
          readOnly={cargando}
          {...register("email")}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email?.message ? (
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="ausuario-password">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
          type="password"
          placeholder={"Ingrese la contraseña..."}
          value={password}
          readOnly={cargando}
          {...register("password")}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password?.message ? (
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      {infoLogin && (
        <div className={"d-flex justify-content-center mb-2"}>
          <Form.Text className="text-danger">{infoLogin}</Form.Text>
        </div>
      )}
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
      <div className={"d-flex justify-content-center mt-3"}>
        <Button
          variant={"outline-success"}
          key={v4()}
          onClick={() => manejarLogin(ausuario)}
        >
          Ingresar
        </Button>
      </div>
      <OverlayCargando
        show={cargando}
        onHide={() => setCargando(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="overlayLogin"
        container={contenedor.current}
      >
        <Spinner animation="grow" variant="dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </OverlayCargando>
    </Form>
  );
};
FormularioLogin.propTypes = {
  formulario: PropTypes.object.isRequired,
};

export default FormularioLogin;
