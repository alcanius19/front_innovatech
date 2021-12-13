import { gql } from "@apollo/client";

export const obtenerUsuarios = gql`
  query obtenerUsuarios($id_usuario: ID!) {
    usuarios(id_usuario: $id_usuario) {
      _id
      nombre_completo
      identificacion
      email
      estado
      tipo_usuario
      fecha_egreso
      fecha_ingreso
    }
  }
`;

export const crearUsuario = gql`
  mutation crearUsuario($usuario: UsuarioInput!) {
    crearUsuario(input: $usuario) {
      _id
      nombre_completo
      identificacion
      email
      estado
      tipo_usuario
      fecha_egreso
      fecha_ingreso
    }
  }
`;

export const actualizarUsuarioPorId = gql`
  mutation actualizarUsuarioPorID(
    $_id: ID!
    $id_usuario: ID
    $usuario: UsuarioAInput
  ) {
    actualizarUsuarioPorID(
      _id: $_id
      id_usuario: $id_usuario
      input: $usuario
    ) {
      _id
      nombre_completo
      identificacion
      email
      estado
      tipo_usuario
      fecha_egreso
      fecha_ingreso
    }
  }
`;

export const eliminarUsuarioPorId = gql`
  mutation eliminarUsuarioPorID($_id: ID!) {
    eliminarUsuarioPorID(_id: $_id) {
      _id
      nombre_completo
      identificacion
      email
      estado
      tipo_usuario
      fecha_egreso
      fecha_ingreso
    }
  }
`;

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      usuario {
        _id
        nombre_completo
        identificacion
        email
        estado
        tipo_usuario
        fecha_egreso
        fecha_ingreso
      }
    }
  }
`;

export const logout = gql`
  mutation logout {
    logout
  }
`;
