export interface IEvento {
    id: number;
	tipo: string;
	fecha: string;
	peso: number;
	descripcion: number;
	observaciones: string;
	diagnostico: string;
	droga: string;
	indicaciones: string;
	usuario_creador: number;
	nombre_mascota: string;
	id_mascota: number;
}

export interface IEventoNuevo {
	tipo: string;
	fecha: string;
	peso: number;
	descripcion: number;
	observaciones: string;
	diagnostico: string;
	droga: string;
	indicaciones: string;
	usuario_creador: number;
	id_mascota: number;
}