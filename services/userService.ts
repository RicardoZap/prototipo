import { apiClient } from './apiClient';

// Tipos para el servicio de usuarios
export interface User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	clave: string;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface CreateUserRequest {
	firstname: string;
	lastname: string;
	email: string;
	clave: string;
}

export interface UpdateUserRequest {
	firstname?: string;
	lastname?: string;
	email?: string;
	clave?: string;
}

export interface UserListResponse {
	users: User[];
	total: number;
	page: number;
	limit: number;
}

export class UserService {
	/**
	 * Obtiene la lista de usuarios
	 */
	static async getUsers(page: number = 1, limit: number = 10): Promise<UserListResponse> {
		return apiClient.get<UserListResponse>(`/v1/api/users?page=${page}&limit=${limit}`);
	}

	/**
	 * Obtiene un usuario por ID
	 */
	static async getUserById(id: number): Promise<User> {
		return apiClient.get<User>(`/v1/api/users/${id}`);
	}

	/**
	 * Crea un nuevo usuario
	 */
	static async createUser(userData: CreateUserRequest): Promise<User> {
		return apiClient.post<User>('/v1/api/users', userData);
	}

	/**
	 * Actualiza un usuario existente
	 */
	static async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
		return apiClient.put<User>(`/v1/api/users/${id}`, userData);
	}

	/**
	 * Elimina un usuario
	 */
	static async deleteUser(id: number): Promise<void> {
		return apiClient.delete<void>(`/v1/api/users/${id}`);
	}

	/**
	 * Obtiene el perfil del usuario actual
	 */
	static async getCurrentUserProfile(): Promise<User> {
		return apiClient.get<User>('/v1/api/users/profile');
	}

	/**
	 * Actualiza el perfil del usuario actual
	 */
	static async updateCurrentUserProfile(userData: UpdateUserRequest): Promise<User> {
		return apiClient.patch<User>('/v1/api/users/profile', userData);
	}
} 