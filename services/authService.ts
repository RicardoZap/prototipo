import { ENV } from '@/config/env';
import { LoginRequest, LoginResponse } from '@/presentation/types/auth';
import axios from 'axios';

// Configuración base de axios
const apiClient = axios.create({
	baseURL: ENV.API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export class AuthService {
	/**
	 * Inicia sesión del usuario
	 * @param credentials Credenciales del usuario
	 * @returns Respuesta de autenticación
	 */
	static async login(credentials: LoginRequest): Promise<LoginResponse> {
		try {
			const url = `${ENV.API_BASE_URL}${ENV.AUTH_LOGIN_ENDPOINT}/${ENV.APP_CONTEXT}`;
			console.log(url)

			const response = await apiClient.post<LoginResponse>(url, credentials);

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					throw new Error('Credenciales inválidas');
				} else if (error.response?.status === 404) {
					throw new Error('Servicio no disponible');
				} else if (error.response?.status >= 500) {
					throw new Error('Error del servidor');
				} else {
					throw new Error('Error de conexión');
				}
			}
			throw new Error('Error inesperado');
		}
	}

	/**
	 * Valida si el token de acceso es válido
	 * @param token Token de acceso
	 * @returns true si el token es válido
	 */
	static isTokenValid(token: string): boolean {
		if (!token) return false;

		try {
			// Decodificar el token JWT (solo la parte del payload)
			const payload = JSON.parse(atob(token.split('.')[1]));
			const currentTime = Math.floor(Date.now() / 1000);

			return payload.exp > currentTime;
		} catch (error) {
			console.error('Error validando token:', error);
			return false;
		}
	}
} 