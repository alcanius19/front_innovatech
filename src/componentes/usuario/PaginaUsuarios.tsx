import * as React from "react";
//import useExtraer from "../ganchos/useExtraer";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { useEffect, useState } from "react";
import Tabla from "./tabla/Tabla";
import modelo_tabla_usuarios from "./tabla/ModeloTablaUsuario";
import VentanaModal from "../../utilidades/ventana_modal";
import FormularioNuevoUsuario from "./Formularios/FormularioNuevoUsuario";
import FormularioEliminarUsuarios from "./Formularios/FormularioEliminarUsuarios";
import { useMutation, useQuery } from "@apollo/client";
import {
  actualizarUsuarioPorId,
  obtenerUsuarios,
} from "../../graphql/consulta_usuarios";
import {
  IUsuario,
  IUsuarioA,
  IPropsFormulario,
} from "../Interfaces/Interfaces";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";

const Estudiantes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alerta, pila, setPila] = useMensajes();

  const { estadoAutenticacion } = useAutenticarContexto();

  const consultaUsuarios = useQuery(obtenerUsuarios, {
    variables: {
      id_usuario: estadoAutenticacion?.usuario?._id,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [consultaActualizarUsuarioPorId] = useMutation(actualizarUsuarioPorId, {
    fetchPolicy: "no-cache",
  });
  const [usuarios, setUsuarios] = useState<IUsuario[]>([] as IUsuario[]);
  const [proveedorTabla, setProveedorTabla] = useState<IUsuario[]>(
    [] as IUsuario[]
  );
  const [mostrarNuevoUsuario, setMostrarNuevoUsuario] = useState(false);
  const [mostrarEliminarUsuarios, setMostrarEliminarUsuarios] = useState(false);

  useEffect(() => {
    console.log(estadoAutenticacion);
    if (consultaUsuarios?.data) {
      setUsuarios(consultaUsuarios.data.usuarios as IUsuario[]);
    }
  }, [consultaUsuarios.data]);

  useEffect(() => {
    if (usuarios.length > 0) {
      console.log(usuarios);
      setProveedorTabla(usuarios);
      alerta({
        titulo: "Usuarios Cargados.",
        mensaje: "Todos los usuarios fueron cargados.",
        tiempo: 0,
      });
    }
  }, [usuarios.length]);

  const alBorrarFilas = () => {
    //   alerta({
    //     titulo: "Información",
    //     mensaje: "Se ha eliminado un producto.",
    //     tiempo: 0,
    //   });
  };
  const alGuardarFilas = async (_usuario: IUsuario) => {
    const _usuarioa: IUsuarioA = {} as IUsuarioA;
    _usuarioa.nombre_completo = _usuario.nombre_completo;
    _usuarioa.identificacion = _usuario.identificacion;
    _usuarioa.estado = _usuario.estado;
    _usuarioa.tipo_usuario = _usuario.tipo_usuario;
    _usuarioa.email = _usuario.email;
    _usuarioa.password = _usuario.password;
    _usuarioa.fecha_egreso = _usuario.fecha_egreso;
    _usuarioa.fecha_ingreso = _usuario.fecha_ingreso;

    const usuarioA = await consultaActualizarUsuarioPorId({
      variables: {
        _id: _usuario._id,
        id_usuario: estadoAutenticacion?.usuario?._id,
        usuario: _usuarioa,
      },
    });
    if (usuarioA) {
      consultaUsuarios.refetch();
      alerta({
        titulo: "Información",
        mensaje: `El usuario ha sido actualizado.`,
        tiempo: 0,
      });
    } else {
      console.log("Error al actualizar usuario.");
    }
  };
  const onSeleccion = () => {
    console.log("seleccion");
  };

  const handleNuevoUsuario = () => {
    setMostrarNuevoUsuario(true);
  };
  const handleEliminarUsuarios = () => {
    setMostrarEliminarUsuarios(true);
  };

  const propsFormularioNuevoUsuario: IPropsFormulario = {
    mensaje: "Registro",
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarNuevoUsuario(false);
      consultaUsuarios.refetch();
    },
    botones: {
      botonLogin: {
        nombre: "Ingresar",
        claseBoton: "outline-success",
        click: () => null,
      },
    },
  };
  const propsFormularioEliminarUsuarios: IPropsFormulario = {
    mensaje: "Ingresa al sistema",
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarEliminarUsuarios(false);
    },
    botones: {
      botonLogin: {
        nombre: "Ingresar",
        claseBoton: "outline-success",
        click: () => null,
      },
    },
  };
  return (
    <section className="area-usuarios">
      <ContenedorMensajes pila={pila} setPila={setPila} />
      <VentanaModal
        abrir={mostrarNuevoUsuario}
        manejarCierre={() => {
          setMostrarNuevoUsuario(false);
        }}
        titulo={"Ingresar Nuevo Usuario"}
        formulario={
          <FormularioNuevoUsuario formulario={propsFormularioNuevoUsuario} />
        }
      />
      <VentanaModal
        abrir={mostrarEliminarUsuarios}
        manejarCierre={() => {
          setMostrarEliminarUsuarios(false);
        }}
        titulo={"Eliminar Usuarios Seleccionados"}
        formulario={
          <FormularioEliminarUsuarios
            formulario={propsFormularioEliminarUsuarios}
          />
        }
      />
      <div
        id="titulo-usuarios"
        className="container-fluid d-flex rounded-1 d-flex justify-content-center align-items-center p-1 mb-2"
      >
        <h5>Administración de usuarios</h5>
      </div>
      <div id="opciones estudiante" className="container-fluid mb-2">
        <button
          className="btn me-2"
          style={{ backgroundColor: "#0edc8d", color: "white" }}
          onClick={handleNuevoUsuario}
        >
          Nuevo Usuario
        </button>
        <button
          className="btn me-2"
          style={{ backgroundColor: "#0edc8d", color: "white" }}
          onClick={handleEliminarUsuarios}
        >
          Eliminar Usuarios
        </button>
      </div>
      <div
        className={"tabla-usuarios container-fluid overflow-auto"}
        style={{ height: 250 }}
      >
        <Tabla
          datos={proveedorTabla}
          setDatos={setProveedorTabla}
          modelo={modelo_tabla_usuarios}
          modo={"checkbox"}
          metodoSeleccion={onSeleccion}
          alGuardarFilas={alGuardarFilas}
          alBorrarFilas={alBorrarFilas}
          datosOriginales={usuarios}
          cargador={[consultaUsuarios.loading]}
        />
      </div>
    </section>
  );
};

export default Estudiantes;
