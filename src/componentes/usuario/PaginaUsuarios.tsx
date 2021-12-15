import * as React from "react";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { useEffect, useState } from "react";
import Tabla from "./tabla/Tabla";
import modelo_tabla_usuarios from "./tabla/ModeloTablaUsuario";
import VentanaModal from "../../utilidades/ventana_modal";
import FormularioNuevoUsuario from "./Formularios/FormularioNuevoUsuario";
import FormularioEliminarUsuarios from "./Formularios/FormularioEliminarUsuarios";
import { useMutation, useQuery } from "@apollo/client";
import {
  eliminarUsuarioPorId,
  actualizarUsuarioPorId,
  obtenerUsuarios,
} from "../../graphql/consulta_usuarios";
import { IUsuario, IUsuarioA, IPropsFormulario } from "./Interfaces/Interfaces";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";

const Usuarios = () => {
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
  const [consultaEliminarUsuarioPorId] = useMutation(eliminarUsuarioPorId, {
    fetchPolicy: "no-cache",
  });

  const [usuarios, setUsuarios] = useState<IUsuario[]>([] as IUsuario[]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<
    IUsuario[]
  >([] as IUsuario[]);
  const [proveedorTabla, setProveedorTabla] = useState<IUsuario[]>(
    [] as IUsuario[]
  );
  const [mostrarNuevoUsuario, setMostrarNuevoUsuario] = useState(false);
  const [mostrarEliminarUsuarios, setMostrarEliminarUsuarios] = useState(false);

  useEffect(() => {
    if (consultaUsuarios?.data) {
      setUsuarios(consultaUsuarios.data.usuarios as IUsuario[]);
    }
  }, [consultaUsuarios.data]);

  useEffect(() => {
    if (usuarios.length > 0) {
      setProveedorTabla(usuarios);
      alerta({
        titulo: "Usuarios Cargados.",
        mensaje: "Todos los usuarios fueron cargados.",
        tiempo: 0,
      });
    }
  }, [usuarios.length]);

  const propsFormularioNuevoUsuario: IPropsFormulario = {
    mensaje: "Registro",
    textoOpcion: "",
    cerrarForm: () => {
      setMostrarNuevoUsuario(false);
      alerta({
        titulo: "Nuevo Usuario.",
        mensaje: "El usuario fue crado exitosamente.",
        tiempo: 0,
      });
      consultaUsuarios.refetch();
    },
    botones: {
      botonNuevoUsuario: {
        nombre: "Crear Usuario",
        claseBoton: "outline-success",
        click: () => null,
      },
    },
  };

  const handleNuevoUsuario = () => {
    setMostrarNuevoUsuario(true);
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

  const propsFormularioEliminarUsuarios: IPropsFormulario = {
    mensaje: "Advertencia: ¿Desea eliminar los Usuarios seleccionados?",
    textoOpcion: "",
    cerrarForm: async () => {
      setMostrarEliminarUsuarios(false);
      const usuariosEliminados: string[] = [];
      for (const _usuario of usuariosSeleccionados) {
        const eliminado = await eliminarUsuario(_usuario._id);
        console.log(eliminado);
        eliminado == true ? usuariosEliminados.push(_usuario._id) : null;
      }
      alerta({
        titulo: "Usuarios Eliminados",
        mensaje: `Los usuarios con ids: ${usuariosEliminados.join(
          ", "
        )} han sido eliminados`,
        tiempo: 0,
      });
      consultaUsuarios.refetch();
    },
    botones: {
      botonEliminar: {
        nombre: "Eliminar Usuarios",
        claseBoton: "outline-success",
        click: () => null,
      },
    },
  };

  const eliminarUsuario = async (_id: string) => {
    const _usuario = await consultaEliminarUsuarioPorId({
      variables: {
        _id,
      },
    });
    if (_usuario) {
      return true;
    } else {
      return false;
    }
  };
  const alBorrarFilas = async (_id: string) => {
    const eliminado: boolean = await eliminarUsuario(_id);
    if (eliminado) {
      consultaUsuarios.refetch();
      alerta({
        titulo: "Información",
        mensaje: `El usuario con id:${_id} ha sido eliminado.`,
        tiempo: 0,
      });
    } else {
      alerta({
        titulo: "Información",
        mensaje: `Error al eliminar el usuario.`,
        tiempo: 0,
      });
    }
  };

  const handleEliminarUsuarios = () => {
    if (usuariosSeleccionados.length > 0) {
      setMostrarEliminarUsuarios(true);
    } else {
      alerta({
        titulo: "Información",
        mensaje: "Seleccione los usuarios a eliminar.",
        tiempo: 0,
      });
    }
  };

  const onSeleccion = (_usuariosSeleccionados: IUsuario[]) => {
    setUsuariosSeleccionados(_usuariosSeleccionados);
  };
  return (
    <section
      className="area-usuarios"
      style={{ height: 480, backgroundColor: "white" }}
    >
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
          className="btn me-2 btn-sm"
          style={{ backgroundColor: "#0e79dc", color: "white" }}
          onClick={handleNuevoUsuario}
        >
          Nuevo Usuario
        </button>
        <button
          className="btn me-2 btn-sm"
          style={{ backgroundColor: "#0e79dc", color: "white" }}
          onClick={handleEliminarUsuarios}
        >
          Eliminar Usuarios
        </button>
      </div>
      <div
        className={"tabla-usuarios container-fluid overflow-auto"}
        style={{ height: 400 }}
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

export default Usuarios;
