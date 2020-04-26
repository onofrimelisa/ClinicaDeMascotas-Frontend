export interface IEvento {
    id: number;
	tipo: string;
	fecha: string;
	peso: number;
	descripcion: string;
	observaciones: string;
	diagnostico: string;
	droga: string;
	indicaciones: string;
	usuario_creador: number;
	nombre_mascota: string;
	id_mascota: number;
	recordar_duenio: boolean;
	recordar_veterinario: boolean;
}

export interface IEventoNuevo {
	tipo: string;
	fecha: string;
	peso: number;
	descripcion: string;
	observaciones: string;
	diagnostico: string;
	droga: string;
	indicaciones: string;
	usuario_creador: number;
	id_mascota: number;
}