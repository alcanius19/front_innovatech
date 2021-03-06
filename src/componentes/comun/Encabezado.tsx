import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../css/main.css";
import "../../css/LineIcons20.css";
import "../../css/animate.css";
import "../../css/tiny-slider.css";
import logo from "../../images/logo/logo3.svg";
import VentanaModal from "../../utilidades/ventana_modal";
import { IPropsFormulario } from "../usuario/Interfaces/Interfaces";
import FormularioRegistro from "./FormularioRegistro";
import FormularioLogin from "./FormularioLogin";
import FormularioUsuario from "./FormularioUsuario";
import useAutenticarContexto from "../ganchos/useAutenticar";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { ETipos } from "../Enumeraciones/Enumeraciones";

const Encabezado = () => {
  const [alerta, pila, setPila] = useMensajes();
  const { estadoAutenticacion, salir } = useAutenticarContexto();
  const navegar = useNavigate();
  const ubicacion = useLocation();

  const manejarLogout = () => {
    const _salir = typeof salir === "function" ? salir() : null;
    if (_salir) {
      _salir().then(() => navegar("/"));
    }
  };
  const manejarLogin = () => {
    setMostrarLogin(true);
  };

  const [mostrarLogin, setMostrarLogin] = useState(false);

  const propsformularioLogin: IPropsFormulario = {
    mensaje: "Ingresa al sistema",
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarLogin(false);
    },
    botones: {
      botonLogin: {
        nombre: "Ingresar",
        claseBoton: "outline-success",
        click: manejarLogin,
      },
    },
  };

  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const propsFormularioRegistro: IPropsFormulario = {
    mensaje: "Ingresa al sistema",
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarRegistro(false);
      alerta({
        titulo: "Nuevo Usuario.",
        mensaje:
          "El usuario fue cargado exitosamente. Por favor ingresa con tu usuario y contraseña.",
        tiempo: 0,
      });
    },
    botones: {
      botonLogin: {
        nombre: "Ingresar",
        claseBoton: "outline-success",
        click: manejarLogin,
      },
    },
  };

  const [mostrarUsuario, setMostrarUsuario] = useState(false);
  const propsFormularioUsuario: IPropsFormulario = {
    mensaje: `¡Saludos ${estadoAutenticacion?.usuario?.nombre_completo}!`,
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarUsuario(false);
      alerta({
        titulo: "Usuario actualizado.",
        mensaje: "El usuario fue actualizado exitosamente.",
        tiempo: 0,
      });
    },
    botones: {
      botonLogin: {
        nombre: "Ingresar",
        claseBoton: "outline-success",
        click: manejarLogin,
      },
    },
  };
  return (
    <>
      <ContenedorMensajes pila={pila} setPila={setPila} />
      <VentanaModal
        abrir={mostrarLogin}
        manejarCierre={() => {
          setMostrarLogin(false);
        }}
        titulo={"Bienvenido a InnovaTech-Proyectos"}
        formulario={<FormularioLogin formulario={propsformularioLogin} />}
      />
      <VentanaModal
        abrir={mostrarRegistro}
        manejarCierre={() => {
          setMostrarRegistro(false);
        }}
        titulo={"Nuevo registro de Usuario"}
        formulario={<FormularioRegistro formulario={propsFormularioRegistro} />}
      />
      <VentanaModal
        abrir={mostrarUsuario}
        manejarCierre={() => {
          setMostrarUsuario(false);
        }}
        titulo={"Datos de Usuario"}
        formulario={<FormularioUsuario formulario={propsFormularioUsuario} />}
      />
      {/* {"<!-- Preloader -->"} */}
      <div className="preloader">
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* {"<!-- /End Preloader -->"}
      {"<!-- Start Header Area -->"} */}
      <header className="header navbar-area">
        {/* {"<!-- Toolbar Start -->"} */}
        <div className="toolbar-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-12">
                <div className="toolbar-social">
                  <ul>
                    <li>
                      <span className="title">Proyecto MISIÓN TIC</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="toolbar-login">
                  <div className="button">
                    {estadoAutenticacion.autenticado ? (
                      <div>
                        <span className={"fw-normal text-dark me-2"}>
                          Hola&nbsp;
                          <NavLink
                            to={ubicacion.pathname}
                            onClick={() => setMostrarUsuario(true)}
                          >
                            {" "}
                            {estadoAutenticacion.usuario &&
                              " " + estadoAutenticacion.usuario.nombre_completo}
                          </NavLink>
                        </span>
                        <button
                          className={"btn btn-success"}
                          onClick={manejarLogout}
                        >
                          Salir
                        </button>
                      </div>
                    ) : (
                      <div>
                        <NavLink
                          to="/"
                          onClick={() => setMostrarRegistro(true)}
                        >
                          Crea una cuenta
                        </NavLink>
                        <button
                          className={"btn btn-primary"}
                          onClick={manejarLogin}
                        >
                          Ingresar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {"<!-- Toolbar End -->"} */}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="nav-inner">
                <nav className="navbar navbar-expand-lg">
                  <a
                    className="navbar-brand"
                    href="index.html"
                    // style={{ backgroundColor: "#0edc8d" }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      // style={{ height: 85, width: 80 }}
                    />
                  </a>
                  <button
                    className="navbar-toggler mobile-menu-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <NavLink end to="/">
                          Inicio
                        </NavLink>
                      </li>
                      {estadoAutenticacion.autenticado ? (
                        <>
                          {estadoAutenticacion.usuario.tipo_usuario ===
                            ETipos.ADMINISTRADOR ||
                          estadoAutenticacion.usuario.tipo_usuario ===
                            ETipos.LIDER ? (
                            <li className="nav-item">
                              <NavLink to="/usuarios">Usuarios</NavLink>
                            </li>
                          ) : null}
                          <li className="nav-item">
                            <NavLink to="/proyectos">Proyectos</NavLink>
                            <ul className="sub-menu collapse" id="submenu-1-4">
                              {estadoAutenticacion.usuario.tipo_usuario ===
                              ETipos.LIDER ? (
                                <li className="nav-item">
                                  <NavLink to="/crear_proyecto">
                                    crear Proyecto
                                  </NavLink>
                                </li>
                              ) : null}

                              {estadoAutenticacion.usuario.tipo_usuario ===
                              ETipos.ADMINISTRADOR ? (
                                <li className="nav-item">
                                  <NavLink to="/actualizar_fase">
                                    Editar fase
                                  </NavLink>
                                </li>
                              ) : null}

                              {estadoAutenticacion.usuario.tipo_usuario ===
                                ETipos.ESTUDIANTE ||
                              estadoAutenticacion.usuario.tipo_usuario ===
                                ETipos.LIDER ? (
                                <li className="nav-item">
                                  <NavLink to="/avances">Avances</NavLink>
                                </li>
                              ) : null}

                              {estadoAutenticacion.usuario.tipo_usuario ===
                                ETipos.ESTUDIANTE ||
                              estadoAutenticacion.usuario.tipo_usuario ===
                                ETipos.LIDER ? (
                                <li className="nav-item">
                                  <NavLink to="/inscripciones">
                                    Inscripciones
                                  </NavLink>
                                </li>
                              ) : null}
                            </ul>
                          </li>
                        </>
                      ) : null}
                      {/* <li className="nav-item">
                        <a
                          className="page-scroll dd-menu collapsed"
                          href="*"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-4"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Proyectos
                        </a>
                        <ul className="sub-menu collapse" id="submenu-1-4">
                          <li className="nav-item">
                            <a href="about-us.html">About Us</a>
                          </li>
                        </ul>
                      </li> */}
                      <li className="nav-item">
                        <NavLink to="/contacto">Contacto</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/acercade">Acerca de</NavLink>
                      </li>
                    </ul>
                    {/* <form className="d-flex search-form">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button className="btn btn-outline-success" type="submit">
                        <i className="lni lni-search-alt"></i>
                      </button>
                    </form> */}
                  </div>
                  {/* {"<!-- navbar collapse -->"} */}
                </nav>
                {/* {"<!-- navbar -->"} */}
              </div>
            </div>
          </div>
          {/* {"<!-- row -->"} */}
        </div>
        {/* {"<!-- container -->"} */}
      </header>
      {/* {"<!-- End Header Area -->"} */}
    </>
  );
};

export default Encabezado;
