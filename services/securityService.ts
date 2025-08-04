import { apiClient } from './apiClient';

// Tipos para el servicio de seguridad
export interface SecurityEvent {
	id: number;
	type: string;
	description: string;
	location: string;
	timestamp: string;
	severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
	status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
	assigned_to?: string;
	created_at: string;
	updated_at: string;
}

export interface CreateSecurityEventRequest {
	type: string;
	description: string;
	location: string;
	severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface UpdateSecurityEventRequest {
	description?: string;
	status?: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
	assigned_to?: string;
}

export interface SecurityEventListResponse {
	events: SecurityEvent[];
	total: number;
	page: number;
	limit: number;
}

export interface SecurityReport {
	id: number;
	title: string;
	content: string;
	generated_at: string;
	period: string;
	summary: {
		total_events: number;
		critical_events: number;
		resolved_events: number;
		pending_events: number;
	};
}

export class SecurityService {
	/**
	 * Obtiene la lista de eventos de seguridad
	 */
	static async getSecurityEvents(
		page: number = 1,
		limit: number = 10,
		status?: string,
		severity?: string
	): Promise<SecurityEventListResponse> {
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});

		if (status) params.append('status', status);
		if (severity) params.append('severity', severity);

		return apiClient.get<SecurityEventListResponse>(`/v1/api/security/events?${params}`);
	}

	/**
	 * Obtiene un evento de seguridad por ID
	 */
	static async getSecurityEventById(id: number): Promise<SecurityEvent> {
		return apiClient.get<SecurityEvent>(`/v1/api/security/events/${id}`);
	}

	/**
	 * Crea un nuevo evento de seguridad
	 */
	static async createSecurityEvent(eventData: CreateSecurityEventRequest): Promise<SecurityEvent> {
		return apiClient.post<SecurityEvent>('/v1/api/security/events', eventData);
	}

	/**
	 * Actualiza un evento de seguridad
	 */
	static async updateSecurityEvent(id: number, eventData: UpdateSecurityEventRequest): Promise<SecurityEvent> {
		return apiClient.put<SecurityEvent>(`/v1/api/security/events/${id}`, eventData);
	}

	/**
	 * Elimina un evento de seguridad
	 */
	static async deleteSecurityEvent(id: number): Promise<void> {
		return apiClient.delete<void>(`/v1/api/security/events/${id}`);
	}

	/**
	 * Marca un evento como resuelto
	 */
	static async resolveSecurityEvent(id: number, resolution: string): Promise<SecurityEvent> {
		return apiClient.patch<SecurityEvent>(`/v1/api/security/events/${id}/resolve`, {
			resolution,
			resolved_at: new Date().toISOString(),
		});
	}

	/**
	 * Asigna un evento a un usuario
	 */
	static async assignSecurityEvent(id: number, assignedTo: string): Promise<SecurityEvent> {
		return apiClient.patch<SecurityEvent>(`/v1/api/security/events/${id}/assign`, {
			assigned_to: assignedTo,
		});
	}

	/**
	 * Obtiene reportes de seguridad
	 */
	static async getSecurityReports(period?: string): Promise<SecurityReport[]> {
		const params = period ? `?period=${period}` : '';
		return apiClient.get<SecurityReport[]>(`/v1/api/security/reports${params}`);
	}

	/**
	 * Genera un nuevo reporte de seguridad
	 */
	static async generateSecurityReport(period: string): Promise<SecurityReport> {
		return apiClient.post<SecurityReport>('/v1/api/security/reports', { period });
	}

	/**
	 * Obtiene estadísticas de seguridad
	 */
	static async getSecurityStats(): Promise<any> {
		return apiClient.get<any>('/v1/api/security/stats');
	}
} 