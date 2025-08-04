import { ENV } from '@/config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Configuración base de axios
const createApiClient = (): AxiosInstance => {
	const client = axios.create({
		baseURL: ENV.API_BASE_URL,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	// Interceptor para agregar token de autenticación
	client.interceptors.request.use(
		async (config) => {
			try {
				const token = await AsyncStorage.getItem('auth_access_token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			} catch (error) {
				console.error('Error getting auth token:', error);
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Interceptor para manejar respuestas y errores
	client.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response?.status === 401) {
				// Token expirado o inválido
				try {
					await AsyncStorage.multiRemove([
						'auth_user',
						'auth_sistema',
						'auth_access_token',
						'auth_refresh_token',
					]);
					// Aquí podrías redirigir al login
				} catch (storageError) {
					console.error('Error clearing auth data:', storageError);
				}
			}
			return Promise.reject(error);
		}
	);

	return client;
};

export class ApiService {
	private static client: AxiosInstance = createApiClient();

	/**
	 * Realiza una petición GET
	 */
	static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.get<T>(url, config);
		return response.data;
	}

	/**
	 * Realiza una petición POST
	 */
	static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.post<T>(url, data, config);
		return response.data;
	}

	/**
	 * Realiza una petición PUT
	 */
	static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.put<T>(url, data, config);
		return response.data;
	}

	/**
	 * Realiza una petición DELETE
	 */
	static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.delete<T>(url, config);
		return response.data;
	}

	/**
	 * Actualiza el token de autenticación
	 */
	static setAuthToken(token: string): void {
		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	/**
	 * Limpia el token de autenticación
	 */
	static clearAuthToken(): void {
		delete this.client.defaults.headers.common.Authorization;
	}
} 