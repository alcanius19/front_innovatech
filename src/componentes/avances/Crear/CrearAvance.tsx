import * as React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREAR_AVANCE_POR_ID } from "../graphql/mutations";

const CrearAvance = () => {
  const { register, handleSubmit } = useForm();
  //const onSubmit = (data) => alert(JSON.stringify(data));
  const [crear_Avance] = useMutation(CREAR_AVANCE_POR_ID);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = (data: any) => {
    console.log("crear");
    console.log(data);

    const { descripcion, observacion } = data;

    crear_Avance({
      variables: { descripcion, observacion },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Descripcion"
          {...register("descripcion", { required: true })}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Observacion"
          {...register("observacion", { required: true })}
        />
        <select
          className="form-control mb-3"
          {...register("rol", { required: true })}
        >
          <option value="61b3da6a44cb44958d979097">estudiante</option>
        </select>
      </div>
      <input type="submit" />
    </form>
  );
};

export default CrearAvance;
