import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/presentation/components/auth/ThemedText';
import { apiClient } from '@/services/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View
} from 'react-native';

export default function ApiClientDemoScreen() {
	const [responseData, setResponseData] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [endpoint, setEndpoint] = useState('/v1/api/users');
	const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
	const [requestBody, setRequestBody] = useState('{\n  "firstname": "Juan",\n  "lastname": "Pérez",\n  "email": "juan.perez@example.com"\n}');
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const showApiClientCode = () => {
		const codeExample = `// 1. Importar la librería
import { apiClient } from '@/services/apiClient';

// 2. Usar directamente (manejo automático de tokens)
const users = await apiClient.get('/v1/api/users');

// 3. Con tipos TypeScript
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const user: User = await apiClient.get<User>('/v1/api/users/1');

// 4. POST con datos
const newUser = await apiClient.post<User>('/v1/api/users', {
  firstname: 'Juan',
  lastname: 'Pérez',
  email: 'juan@example.com'
});

// 5. PUT para actualizar
const updatedUser = await apiClient.put<User>('/v1/api/users/1', {
  firstname: 'Juan Carlos'
});

// 6. DELETE
await apiClient.delete('/v1/api/users/1');

// 7. PATCH para actualizaciones parciales
const patchedUser = await apiClient.patch<User>('/v1/api/users/1', {
  email: 'nuevo@email.com'
});`;

		setResponseData(codeExample);
	};

	const showServiceExample = () => {
		const serviceExample = `// 1. Crear un servicio usando apiClient
import { apiClient } from './apiClient';

export class UserService {
  static async getUsers(page: number = 1, limit: number = 10) {
    return apiClient.get(\`/v1/api/users?page=\${page}&limit=\${limit}\`);
  }

  static async createUser(userData: CreateUserRequest) {
    return apiClient.post('/v1/api/users', userData);
  }

  static async updateUser(id: number, userData: UpdateUserRequest) {
    return apiClient.put(\`/v1/api/users/\${id}\`, userData);
  }

  static async deleteUser(id: number) {
    return apiClient.delete(\`/v1/api/users/\${id}\`);
  }
}

// 2. Usar el servicio
const users = await UserService.getUsers(1, 10);
const newUser = await UserService.createUser({
  firstname: 'Juan',
  lastname: 'Pérez',
  email: 'juan@example.com'
});`;

		setResponseData(serviceExample);
	};

	const showTokenFlow = () => {
		const tokenFlow = `// FLUJO AUTOMÁTICO DE TOKENS

// 1. Interceptor de Request (automático)
// - Lee el token de AsyncStorage
// - Lo agrega como Bearer token en Authorization header

// 2. Interceptor de Response (automático)
// - Si recibe 401 (Unauthorized)
// - Intenta refrescar el token automáticamente
// - Reintenta la petición original
// - Si falla el refresh, cierra sesión

// 3. Refresh Token Flow
const refreshResponse = await axios.post(
  \`\${ENV.API_BASE_URL}/v1/api/auth/refresh-token/\${ENV.APP_CONTEXT}\`,
  { refresh_token: storedRefreshToken }
);

// 4. Actualización automática de tokens
await Promise.all([
  AsyncStorage.setItem('auth_access_token', newAccessToken),
  AsyncStorage.setItem('auth_refresh_token', newRefreshToken)
]);

// 5. Reintento automático de petición original
// - Con el nuevo token
// - Transparente para el desarrollador`;

		setResponseData(tokenFlow);
	};

	const simulateApiCall = async () => {
		setIsLoading(true);
		setResponseData('');

		try {
			let response: any;

			// Simular diferentes tipos de llamadas según el método
			switch (method) {
				case 'GET':
					response = await apiClient.get(endpoint);
					break;
				case 'POST':
					const postData = JSON.parse(requestBody);
					response = await apiClient.post(endpoint, postData);
					break;
				case 'PUT':
					const putData = JSON.parse(requestBody);
					response = await apiClient.put(endpoint, putData);
					break;
				case 'DELETE':
					response = await apiClient.delete(endpoint);
					break;
				case 'PATCH':
					const patchData = JSON.parse(requestBody);
					response = await apiClient.patch(endpoint, patchData);
					break;
			}

			const result = `// Petición ${method} a ${endpoint}
// Headers automáticos agregados:
// Authorization: Bearer ${await getStoredToken()}

// Respuesta del servidor:
${JSON.stringify(response, null, 2)}`;

			setResponseData(result);
			Alert.alert('Éxito', 'Llamada a la API realizada correctamente');

		} catch (error: any) {
			const errorResult = `// Error en petición ${method} a ${endpoint}
// Tipo de error: ${error.message}
// Status: ${error.status || 'N/A'}
// Código: ${error.code || 'N/A'}

// Detalles del error:
${JSON.stringify(error, null, 2)}`;

			setResponseData(errorResult);
			Alert.alert('Error', `Error en la llamada: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const getStoredToken = async (): Promise<string> => {
		try {
			const token = await AsyncStorage.getItem('auth_access_token');
			return token ? `${token.substring(0, 20)}...` : 'No hay token';
		} catch {
			return 'Error al leer token';
		}
	};

	const showUserServiceDemo = async () => {
		setIsLoading(true);
		setResponseData('');

		try {
			// Simular llamadas al servicio de usuarios
			const demoCode = `// Ejemplo de uso del UserService

// 1. Obtener lista de usuarios
const users = await UserService.getUsers(1, 5);

// 2. Crear un nuevo usuario
const newUser = await UserService.createUser({
  firstname: 'María',
  lastname: 'García',
  email: 'maria.garcia@penoles.com',
  clave: 'MG001'
});

// 3. Actualizar usuario
const updatedUser = await UserService.updateUser(1, {
  firstname: 'María Elena'
});

// 4. Eliminar usuario
await UserService.deleteUser(1);

// 5. Obtener perfil actual
const profile = await UserService.getCurrentUserProfile();

// Todas las llamadas incluyen automáticamente:
// - Bearer token en Authorization header
// - Manejo automático de refresh token
// - Reintento automático en caso de 401
// - Logout automático si el refresh falla`;

			setResponseData(demoCode);
			Alert.alert('Éxito', 'Demo del UserService mostrada');

		} catch (error: any) {
			Alert.alert('Error', `Error en demo: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const showSecurityServiceDemo = async () => {
		setIsLoading(true);
		setResponseData('');

		try {
			// Simular llamadas al servicio de seguridad
			const demoCode = `// Ejemplo de uso del SecurityService

// 1. Obtener eventos de seguridad
const events = await SecurityService.getSecurityEvents(1, 10, 'PENDING', 'HIGH');

// 2. Crear nuevo evento
const newEvent = await SecurityService.createSecurityEvent({
  type: 'INTRUSION_DETECTED',
  description: 'Movimiento detectado en área restringida',
  location: 'Edificio A - Piso 3',
  severity: 'HIGH'
});

// 3. Actualizar evento
const updatedEvent = await SecurityService.updateSecurityEvent(1, {
  status: 'IN_PROGRESS',
  assigned_to: 'juan.perez@penoles.com'
});

// 4. Resolver evento
const resolvedEvent = await SecurityService.resolveSecurityEvent(1, 
  'Falso positivo - Sistema de ventilación'
);

// 5. Asignar evento
const assignedEvent = await SecurityService.assignSecurityEvent(1, 
  'maria.garcia@penoles.com'
);

// 6. Obtener reportes
const reports = await SecurityService.getSecurityReports('monthly');

// 7. Generar reporte
const newReport = await SecurityService.generateSecurityReport('weekly');

// 8. Obtener estadísticas
const stats = await SecurityService.getSecurityStats();`;

			setResponseData(demoCode);
			Alert.alert('Éxito', 'Demo del SecurityService mostrada');

		} catch (error: any) {
			Alert.alert('Error', `Error en demo: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const clearResponse = () => {
		setResponseData('');
	};

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.logoContainer}>
					<Image
						source={require('@/assets/images/penoles.png')}
						style={styles.logo}
						contentFit="contain"
					/>
				</View>
				<ThemedText type="title" style={styles.title}>
					Demo ApiClient
				</ThemedText>
				<ThemedText style={styles.subtitle}>
					Librería para consumir servicios con OAuth2
				</ThemedText>
			</View>

			{/* Sección de ejemplos de código */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Ejemplos de Código
				</ThemedText>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: colors.tint, marginBottom: 12 }]}
					onPress={showApiClientCode}
				>
					<ThemedText style={styles.buttonText}>
						Mostrar Uso Básico
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#007AFF', marginBottom: 12 }]}
					onPress={showServiceExample}
				>
					<ThemedText style={styles.buttonText}>
						Crear Servicios
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#34C759', marginBottom: 12 }]}
					onPress={showTokenFlow}
				>
					<ThemedText style={styles.buttonText}>
						Flujo de Tokens
					</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Sección de demos de servicios */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Demos de Servicios
				</ThemedText>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#FF9500', marginBottom: 12 }]}
					onPress={showUserServiceDemo}
					disabled={isLoading}
				>
					<ThemedText style={styles.buttonText}>
						UserService Demo
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#AF52DE' }]}
					onPress={showSecurityServiceDemo}
					disabled={isLoading}
				>
					<ThemedText style={styles.buttonText}>
						SecurityService Demo
					</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Sección de prueba de API */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Probar Llamada API
				</ThemedText>

				<View style={styles.inputContainer}>
					<ThemedText style={styles.inputLabel}>Endpoint</ThemedText>
					<TextInput
						style={[styles.input, { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text }]}
						value={endpoint}
						onChangeText={setEndpoint}
						placeholder="/v1/api/users"
						placeholderTextColor={colors.icon}
					/>
				</View>

				<View style={styles.inputContainer}>
					<ThemedText style={styles.inputLabel}>Método</ThemedText>
					<View style={styles.methodContainer}>
						{(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const).map((m) => (
							<TouchableOpacity
								key={m}
								style={[
									styles.methodButton,
									{
										backgroundColor: method === m ? colors.tint : colors.background,
										borderColor: colors.icon,
									}
								]}
								onPress={() => setMethod(m)}
							>
								<ThemedText style={[
									styles.methodButtonText,
									{ color: method === m ? 'white' : colors.text }
								]}>
									{m}
								</ThemedText>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
					<View style={styles.inputContainer}>
						<ThemedText style={styles.inputLabel}>Body (JSON)</ThemedText>
						<TextInput
							style={[styles.textArea, { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text }]}
							value={requestBody}
							onChangeText={setRequestBody}
							placeholder={`{\n  "key": "value"\n}`}
							placeholderTextColor={colors.icon}
							multiline
							numberOfLines={6}
						/>
					</View>
				)}

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#FF3B30', marginBottom: 12 }]}
					onPress={simulateApiCall}
					disabled={isLoading}
				>
					<ThemedText style={styles.buttonText}>
						{isLoading ? 'Ejecutando...' : 'Ejecutar Llamada'}
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#8E8E93' }]}
					onPress={clearResponse}
				>
					<ThemedText style={styles.buttonText}>
						Limpiar Respuesta
					</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Respuesta */}
			{responseData ? (
				<View style={styles.section}>
					<ThemedText type="title" style={styles.sectionTitle}>
						Respuesta / Código
					</ThemedText>
					<View style={[styles.codeContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
						<Text style={[styles.codeText, { color: colors.text }]}>{responseData}</Text>
					</View>
				</View>
			) : null}

			{/* Explicación del flujo */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Características de la Librería
				</ThemedText>

				<View style={styles.explanationContainer}>
					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Manejo automático de tokens:</Text> Agrega Bearer token a todas las peticiones
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Refresh automático:</Text> Renueva tokens expirados sin intervención
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Reintento automático:</Text> Reintenta peticiones fallidas con nuevo token
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Logout automático:</Text> Cierra sesión si el refresh falla
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Cola de peticiones:</Text> Maneja múltiples peticiones durante refresh
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Tipos TypeScript:</Text> Soporte completo para tipos genéricos
					</ThemedText>

					<ThemedText style={styles.explanationText}>
						✅ <Text style={styles.bold}>Manejo de errores:</Text> Errores consistentes y descriptivos
					</ThemedText>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 40,
	},
	header: {
		alignItems: 'center',
		marginBottom: 32,
	},
	logoContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
	},
	logo: {
		width: 40,
		height: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		textAlign: 'center',
		opacity: 0.7,
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 16,
	},
	inputContainer: {
		marginBottom: 16,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
	},
	input: {
		height: 44,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	textArea: {
		height: 120,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		fontSize: 14,
		textAlignVertical: 'top',
	},
	methodContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	methodButton: {
		flex: 1,
		height: 36,
		borderWidth: 1,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 2,
	},
	methodButtonText: {
		fontSize: 12,
		fontWeight: '600',
	},
	button: {
		height: 44,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	codeContainer: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 16,
	},
	codeText: {
		fontSize: 12,
		fontFamily: 'monospace',
		lineHeight: 18,
	},
	explanationContainer: {
		padding: 16,
		backgroundColor: '#f8f9fa',
		borderRadius: 8,
	},
	explanationText: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 8,
	},
	bold: {
		fontWeight: '600',
	},
}); 