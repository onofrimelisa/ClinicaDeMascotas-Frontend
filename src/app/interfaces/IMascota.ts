
export interface IMascotaNueva {
    // si no llega una foto de la mascota, ponemos una por defecto (pero llega 1 si o si)
    id: string;
    nombre: string;
    especie: string;
    raza: string;
    fecha_nacimiento: String;
    sexo: string;
    color: string;
    foto: string;
    senias: string;
    veterinario: string;
    duenio: string;
}