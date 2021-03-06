
export interface IUsuario {
    id: number;
    email: string;
    apellido: string;
    nombre: string;
    fecha_nacimiento: String;
    telefono: string;
    activo: boolean;
    roles: string[];
    password?: string;
    foto?: string;
    nombre_consultorio?: string;
    domicilio_consultorio?: string;
    matricula?: string; 
}


export interface IUsuarioLogin {
    email: string;
    password: string;
}

export interface IUsuarioNuevo {
    email: string;
    password: string;
    apellido: string;
    nombre: string;
    fecha_nacimiento: String;
    telefono: string;
    activo: boolean;
    rol: string;
    foto?: string;
    nombre_consultorio?: string;
    domicilio_consultorio?: string;
    matricula?: string;
}