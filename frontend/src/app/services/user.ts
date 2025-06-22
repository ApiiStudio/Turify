export interface User {
    id: number; // Para compatibilidad con frontend
    user_id?: number; // Para compatibilidad con backend si se requiere
    name?: string;
    surname?: string;
    email: string;
    role?: string;
}