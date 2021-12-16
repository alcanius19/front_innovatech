import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Modal, { RenderModalBackdropProps } from "react-overlays/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import useAutenticarContexto from "../../ganchos/useAutenticar";
//import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);
import moment from "moment";
import { IPropsFormulario, IUsuario } from "../Interfaces/Interfaces";
import { EEstados, ETipos } from "../../Enumeraciones/Enumeraciones";
import { crearUsuario } from "../../../graphql/consulta_usuarios";
import { useMutation } from "@apollo/client";
import useMensajes from "../../ganchos/useMensajes";
import ContenedorMensajes from "../../../utilidades/contenedor_mensajes";

const estados = [
  EEstados.AUTORIZADO,
  EEstados.NO_AUTORIZADO,
  EEstados.PENDIENTE,
];

const tipos = [ETipos.ADMINISTRADOR, ETipos.ESTUDIANTE, ETipos.LIDER];

const schema = yup.object({
  nombre_completo: yup.string().required("Debe ingresar el nombre."),
  identificacion: yup
    .number()
    .positive()
    .integer()
    .required("Ingrese la identificación.")
    .min(1000000, "La identificación debe contener mínimo 8 números.")
    .max(9999999999, "La identificación debe contener máximo 10 números.")
    .typeError("La identificación debe ser un número entre 8 y 10 dígitos."),
  estado: yup
    .string()
    .required("Debe seleccionar un estado.")
    .oneOf(
      estados,
      "El estado debe ser autorizado, no autorizado o pendiente."
    ),
  tipo_usuario: yup
    .string()
    .required("Debe seleccionar un tipo.")
    .oneOf(tipos, "El tipo debe ser estudiante, líder o administrador."),
  // fecha_ingreso: yup
  //   .date()
  //   .required("Debe ingresar la fecha de ingreso.")
  //   .typeError("Debe ingresar una fecha valida."),
  // fecha_egreso: yup
  //   .date()
  //   .required("Debe ingresar la fecha de egreso.")
  //   .typeError("Debe ingresar una fecha valida."),
  email: yup
    .string()
    .email("Ingresa un correo valido.")
    .required("Debe ingresar un correo."),
  password: yup
    .string()
    .password()
    .required("Debe ingresar una contraseña.")
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
  background-color: #0e79dc;
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
const FormularioNuevoUsuario = ({
  formulario,
}: {
  formulario: IPropsFormulario;
}) => {
  const [alerta, pila, setPila] = useMensajes();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<IUsuario>({
    resolver: yupResolver(schema),
  });

  //const navegar = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { estadoAutenticacion } = useAutenticarContexto();
  const [cargando, setCargando] = useState(false);
  const contenedor = useRef(null);
  const [usuario, setUsuario] = useState<IUsuario>({} as IUsuario);
  const [email, setEmail] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [password, setPassword] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  const [fechaEgreso, setFechaEgreso] = useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [crearNuevoUsuario, { loading, error, data }] = useMutation(
    crearUsuario,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (nombreCompleto !== "") {
      setUsuario({ ...usuario, nombre_completo: nombreCompleto });
    }
  }, [nombreCompleto]);
  useEffect(() => {
    if (parseInt(identificacion) > 0) {
      setUsuario({ ...usuario, identificacion: parseInt(identificacion) });
    }
  }, [identificacion]);
  useEffect(() => {
    if (tipoUsuario !== "") {
      setUsuario({ ...usuario, tipo_usuario: tipoUsuario });
    }
  }, [tipoUsuario]);
  useEffect(() => {
    if (estado !== "") {
      setUsuario({ ...usuario, estado });
    }
  }, [estado]);
  useEffect(() => {
    // if (fechaIngreso !== "") {
    moment.locale("en");
    setUsuario((pv: IUsuario) => {
      return {
        ...pv,
        fecha_ingreso: new Date(moment(fechaIngreso, "YYYY-MM-DD").format("L")),
      };
    });
    // }
  }, [fechaIngreso]);
  useEffect(() => {
    // if (fechaEgreso !== "") {
    moment.locale("en");
    setUsuario((pv) => {
      return {
        ...pv,
        fecha_egreso: new Date(moment(fechaEgreso, "YYYY-MM-DD").format("L")),
      };
    });
    // }
  }, [fechaEgreso]);
  useEffect(() => {
    if (email !== "") {
      setUsuario({ ...usuario, email });
    }
  }, [email]);
  useEffect(() => {
    if (password !== "") {
      setUsuario({ ...usuario, password });
    }
  }, [password]);

  const manejarNuevoUsuario = async () => {
    const result = await trigger();
    if (result) {
      setCargando(true);
      setTimeout(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _usuario = await crearNuevoUsuario({
          variables: {
            usuario: usuario,
            id_usuario: estadoAutenticacion?.usuario?._id,
          },
        });
        if (_usuario.data.crearUsuario._id === "") {
          alerta({
            titulo: "Error.",
            mensaje: "El email ya existe.",
            tiempo: 0,
          });
        } else if (_usuario) {
          formulario.cerrarForm();
        } else {
          alerta({
            titulo: "Error.",
            mensaje: "Error desconocido.",
            tiempo: 0,
          });
        }

        setCargando(false);
      }, 2000);
    }
  };
  const limpiarFormulario = () => {
    setNombreCompleto("");
    setIdentificacion("");
    setEstado("");
    setTipoUsuario("");
    setFechaIngreso("");
    setFechaEgreso("");
    setEmail("");
    setPassword("");
  };

  return (
    <Form className="login" ref={contenedor}>
      <ContenedorMensajes pila={pila} setPila={setPila} />
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
      <Form.Group className="mb-3" controlId="usuario-nombre">
        <Form.Label>Nombres:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese el nombre completo..."}
          value={nombreCompleto}
          readOnly={cargando}
          {...register("nombre_completo")}
          onChange={(e) => setNombreCompleto(e.target.value)}
          size="sm"
        />
        {errors.nombre_completo?.message ? (
          <Form.Text className="text-danger">
            {errors.nombre_completo?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-identificacion">
        <Form.Label>Identificacion:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese la identificación..."}
          value={identificacion}
          readOnly={cargando}
          {...register("identificacion")}
          onChange={(e) => setIdentificacion(e.target.value)}
          size="sm"
        />
        {errors.identificacion?.message ? (
          <Form.Text className="text-danger">
            {errors.identificacion?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-tipo">
        <Form.Label>Tipo:</Form.Label>
        <Form.Select
          aria-label="usuario-tipo"
          value={tipoUsuario}
          disabled={cargando}
          {...register("tipo_usuario")}
          onChange={(e) => setTipoUsuario(e.target.value)}
          size="sm"
        >
          <option>Seleccione el tipo de usuario</option>
          {tipos &&
            tipos.map((_tipo) => {
              if (
                estadoAutenticacion?.usuario?.tipo_usuario == ETipos.LIDER &&
                _tipo !== ETipos.ADMINISTRADOR &&
                _tipo !== ETipos.LIDER
              ) {
                return (
                  <option key={v4()} value={_tipo}>
                    {_tipo.trim().replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                );
              } else if (
                estadoAutenticacion?.usuario?.tipo_usuario ==
                ETipos.ADMINISTRADOR
              ) {
                return (
                  <option key={v4()} value={_tipo}>
                    {_tipo.trim().replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                );
              } else {
                null;
              }
            })}
        </Form.Select>
        {errors.tipo_usuario?.message ? (
          <Form.Text className="text-danger">
            {errors.tipo_usuario?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-estado">
        <Form.Label>Estado:</Form.Label>
        <Form.Select
          aria-label="usuario-estado"
          value={estado}
          disabled={cargando}
          {...register("estado")}
          onChange={(e) => setEstado(e.target.value)}
          size="sm"
        >
          <option>Seleccione el estado</option>
          {estados &&
            estados.map((_estado) => (
              <option key={v4()} value={_estado}>
                {_estado.trim().replace(/^\w/, (c) => c.toUpperCase())}
              </option>
            ))}
        </Form.Select>
        {errors.estado?.message ? (
          <Form.Text className="text-danger">
            {errors.estado?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-fecha-ingreso">
        <Form.Label hidden>Fecha Ingreso:</Form.Label>
        <Form.Control
          type="date"
          placeholder={"Seleccione la fecha..."}
          value={fechaIngreso}
          readOnly
          hidden
          // {...register("fecha_ingreso")}
          // onChange={(e) => setFechaIngreso(e.target.value)}
          size="sm"
        />
        {/* {errors.fecha_ingreso?.message ? (
          <Form.Text className="text-danger">
            {errors.fecha_ingreso?.message}
          </Form.Text>
        ) : null} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-fecha-egreso">
        <Form.Label hidden>Fecha Egreso:</Form.Label>
        <Form.Control
          type="date"
          placeholder={"Seleccione la fecha..."}
          value={fechaEgreso}
          readOnly
          hidden
          // {...register("fecha_egreso")}
          // onChange={(e) => setFechaEgreso(e.target.value)}
          size="sm"
        />
        {/* {errors.fecha_egreso?.message ? (
          <Form.Text className="text-danger">
            {errors.fecha_egreso?.message}
          </Form.Text>
        ) : null} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-email">
        <Form.Label>Correo:</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Ingrese el correo..."}
          value={email}
          readOnly={cargando}
          {...register("email")}
          onChange={(e) => setEmail(e.target.value)}
          size="sm"
        />
        {errors.email?.message ? (
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="usuario-password">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
          type="password"
          placeholder={"Ingrese la contraseña..."}
          value={password}
          readOnly={cargando}
          {...register("password")}
          onChange={(e) => setPassword(e.target.value)}
          size="sm"
        />
        {errors.password?.message ? (
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        ) : null}
      </Form.Group>
      {/* {botones &&
        Object.keys(botones).map((llave: string) => {
          const boton: IPropsBotones = botones[llave];
          return (
            <Button
              variant={boton.claseBoton}
              key={v4()}
              onClick={() => boton.click(usuario)}
            >
              {boton.nombre}
            </Button>
          );
        })} */}
      <div className={"d-flex justify-content-center mt-3"}>
        <Button
          variant={"outline-primary"}
          key={v4()}
          onClick={() => manejarNuevoUsuario()}
          className={"me-2"}
          size="sm"
        >
          Registrar
        </Button>
        <Button
          variant={"outline-primary"}
          key={v4()}
          onClick={() => limpiarFormulario()}
          size="sm"
        >
          Limpiar
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
FormularioNuevoUsuario.propTypes = {
  formulario: PropTypes.object.isRequired,
};

export default FormularioNuevoUsuario;
