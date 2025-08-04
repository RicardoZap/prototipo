// Tipos para la respuesta de autenticación
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface Usuario {
  firstname: string;
  lastname: string;
  fullname: string;
  clave: string;
  email: string;
}

export interface Sistema {
  id: number;
  clave: string;
  nombre: string;
  estatus: string;
  clientid: string;
  uuid: string;
  elementos: any[]; // Simplificado por ahora
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
  usuario: Usuario;
  sistema: Sistema;
}

export interface AuthState {
  user: Usuario | null;
  sistema: Sistema | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 