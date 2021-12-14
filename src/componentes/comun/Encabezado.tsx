import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/main.css";
import "../../css/LineIcons20.css";
import "../../css/animate.css";
import "../../css/tiny-slider.css";
import logo from "../../images/logo/logo.svg";
import VentanaModal from "../../utilidades/ventana_modal";
import { IPropsFormulario } from "../usuario/Interfaces/Interfaces";
import FormularioRegistro from "./FormularioRegistro";
import FormularioLogin from "./FormularioLogin";
import useAutenticarContexto from "../ganchos/useAutenticar";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";

const Encabezado = () => {
  const [alerta, pila, setPila] = useMensajes();
  const { estadoAutenticacion, salir } = useAutenticarContexto();
  const navegar = useNavigate();

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
                      <span className="title">Siguenos en : </span>
                    </li>
                    <li>
                      <a href="*">
                        <i className="lni lni-facebook-original"></i>
                      </a>
                    </li>
                    <li>
                      <a href="*">
                        <i className="lni lni-twitter-original"></i>
                      </a>
                    </li>
                    <li>
                      <a href="*">
                        <i className="lni lni-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="*">
                        <i className="lni lni-linkedin-original"></i>
                      </a>
                    </li>
                    <li>
                      <a href="*">
                        <i className="lni lni-google"></i>
                      </a>
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
                          Hola
                          {estadoAutenticacion.usuario &&
                            " " + estadoAutenticacion.usuario.nombre_completo}
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
                          className={"btn btn-success"}
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
                  <a className="navbar-brand" href="index.html">
                    <img src={logo} alt="Logo" />
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
                          <li className="nav-item">
                            <NavLink to="/usuarios">Usuarios</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/avances">Avances</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/inscripciones">Inscripciones</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/proyectos">Proyectos</NavLink>
                            <ul className="sub-menu collapse" id="submenu-1-4">
                              <li className="nav-item">
                                <NavLink to="/crear_proyecto">
                                  crear Proyecto
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink to="/actualizar_fase">
                                  Editar fase
                                </NavLink>
                              </li>
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
