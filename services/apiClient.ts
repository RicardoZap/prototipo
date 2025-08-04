import { ENV } from '@/config/env';
import { LoginResponse } from '@/presentation/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { router } from 'expo-router';

// Claves para AsyncStorage
const STORAGE_KEYS = {
	ACCESS_TOKEN: 'auth_access_token',
	REFRESH_TOKEN: 'auth_refresh_token',
	USER: 'auth_user',
	SISTEMA: 'auth_sistema',
} as const;

// Tipos para las respuestas de error
interface ApiError {
	message: string;
	status: number;
	code?: string;
}

// Configuración base de axios
const createApiClient = (): AxiosInstance => {
	const client = axios.create({
		baseURL: ENV.API_BASE_URL,
		timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return client;
};

class ApiClientService {
	private client: AxiosInstance;
	private isRefreshing = false;
	private failedQueue: {
		resolve: (value?: any) => void;
		reject: (reason?: any) => void;
	}[] = [];

	constructor() {
		this.client = createApiClient();
		this.setupInterceptors();
	}

	/**
	 * Configura los interceptores de axios para manejo automático de tokens
	 */
	private setupInterceptors(): void {
		// Interceptor para agregar el token a las peticiones
		this.client.interceptors.request.use(
			async (config) => {
				const token = await this.getAccessToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// Interceptor para manejar respuestas y errores
		this.client.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			async (error: AxiosError) => {
				const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

				// Si es un error 401 y no hemos intentado refrescar el token
				if (error.response?.status === 401 && !originalRequest._retry) {
					if (this.isRefreshing) {
						// Si ya estamos refrescando, agregar a la cola
						return new Promise((resolve, reject) => {
							this.failedQueue.push({ resolve, reject });
						});
					}

					originalRequest._retry = true;
					this.isRefreshing = true;

					try {
						// Intentar refrescar el token
						const newToken = await this.refreshAccessToken();
						if (newToken) {
							// Actualizar el token en la petición original
							originalRequest.headers = originalRequest.headers || {};
							originalRequest.headers.Authorization = `Bearer ${newToken}`;

							// Procesar la cola de peticiones fallidas
							this.processQueue(null, newToken);

							// Reintentar la petición original
							return this.client(originalRequest);
						} else {
							// No se pudo refrescar el token, cerrar sesión
							await this.logout();
							return Promise.reject(error);
						}
					} catch (refreshError) {
						// Error al refrescar el token, cerrar sesión
						this.processQueue(refreshError, null);
						await this.logout();
						return Promise.reject(refreshError);
					} finally {
						this.isRefreshing = false;
					}
				}

				return Promise.reject(error);
			}
		);
	}

	/**
	 * Procesa la cola de peticiones fallidas
	 */
	private processQueue(error: any, token: string | null): void {
		this.failedQueue.forEach(({ resolve, reject }) => {
			if (error) {
				reject(error);
			} else {
				resolve(token);
			}
		});
		this.failedQueue = [];
	}

	/**
	 * Obtiene el token de acceso almacenado
	 */
	private async getAccessToken(): Promise<string | null> {
		try {
			const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
			return token;
		} catch (error) {
			console.error('Error obteniendo access token:', error);
			return null;
		}
	}

	/**
	 * Refresca el token de acceso usando el refresh token
	 */
	private async refreshAccessToken(): Promise<string | null> {
		try {
			const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

			if (!refreshToken) {
				throw new Error('No hay refresh token disponible');
			}

			const response = await axios.post<LoginResponse>(
				`${ENV.API_BASE_URL}/v1/api/auth/refresh-token/${ENV.APP_CONTEXT}`,
				{
					refresh_token: refreshToken
				},
				{
					timeout: 10000,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const { access_token, refresh_token, usuario, sistema } = response.data;

			// Actualizar tokens y datos en AsyncStorage
			await Promise.all([
				AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token),
				AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token),
				AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(usuario)),
				AsyncStorage.setItem(STORAGE_KEYS.SISTEMA, JSON.stringify(sistema)),
			]);

			return access_token;
		} catch (error) {
			console.error('Error refrescando access token:', error);
			return null;
		}
	}

	/**
	 * Cierra la sesión del usuario
	 */
	private async logout(): Promise<void> {
		try {
			// Limpiar datos de autenticación
			await Promise.all([
				AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
				AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
				AsyncStorage.removeItem(STORAGE_KEYS.USER),
				AsyncStorage.removeItem(STORAGE_KEYS.SISTEMA),
			]);

			// Redirigir al login
			router.replace('/');
		} catch (error) {
			console.error('Error durante logout:', error);
		}
	}

	/**
	 * Realiza una petición GET
	 */
	async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.get<T>(url, config);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	/**
	 * Realiza una petición POST
	 */
	async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.post<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	/**
	 * Realiza una petición PUT
	 */
	async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.put<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	/**
	 * Realiza una petición DELETE
	 */
	async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.delete<T>(url, config);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	/**
	 * Realiza una petición PATCH
	 */
	async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.patch<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	/**
	 * Maneja los errores de las peticiones
	 */
	private handleError(error: any): ApiError {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status || 0;
			const message = error.response?.data?.message || error.message || 'Error de conexión';

			return {
				message,
				status,
				code: error.code,
			};
		}

		return {
			message: error.message || 'Error inesperado',
			status: 0,
		};
	}

	/**
	 * Verifica si hay una sesión activa
	 */
	async isAuthenticated(): Promise<boolean> {
		try {
			const token = await this.getAccessToken();
			return !!token;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Obtiene información del usuario actual
	 */
	async getCurrentUser(): Promise<any> {
		try {
			const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
			return userData ? JSON.parse(userData) : null;
		} catch (error) {
			console.error('Error obteniendo usuario actual:', error);
			return null;
		}
	}
}

// Instancia singleton del servicio
export const apiClient = new ApiClientService();

// Exportar también la clase para casos especiales
export { ApiClientService };
