import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/presentation/components/auth/ThemedText';
import { LoginRequest, LoginResponse } from '@/presentation/types/auth';
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

export default function AuthDemoScreen() {
	const [userName, setUserName] = useState('demo_user');
	const [password, setPassword] = useState('demo_password');
	const [responseData, setResponseData] = useState<string>('');
	const [storedData, setStoredData] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const simulateLogin = async () => {
		setIsLoading(true);
		setResponseData('');
		setStoredData('');

		try {
			// Simular la llamada al servicio de autenticación
			const credentials: LoginRequest = { userName, password };
			
			// Mostrar el código de ejemplo
			const codeExample = `// 1. Crear las credenciales
const credentials: LoginRequest = {
  userName: "${userName}",
  password: "${password}"
};

// 2. Llamar al servicio de autenticación
const response = await AuthService.login(credentials);`;

			setResponseData(codeExample);

			// Simular respuesta exitosa
			const mockResponse: LoginResponse = {
				access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
				expires_in: 3600,
				refresh_expires_in: 86400,
				refresh_token: "refresh_token_example",
				token_type: "Bearer",
				scope: "read write",
				usuario: {
					firstname: "Juan",
					lastname: "Pérez",
					fullname: "Juan Pérez",
					clave: "JP001",
					email: "juan.perez@penoles.com"
				},
				sistema: {
					id: 1,
					clave: "SECURITY",
					nombre: "Sistema de Seguridad",
					estatus: "ACTIVO",
					clientid: "security_client",
					uuid: "123e4567-e89b-12d3-a456-426614174000",
					elementos: []
				}
			};

			// Mostrar la respuesta
			setResponseData(prev => prev + `\n\n// 3. Respuesta del servidor:
${JSON.stringify(mockResponse, null, 2)}`);

			// Simular almacenamiento
			const storageExample = `// 4. Almacenar datos en AsyncStorage
await Promise.all([
  AsyncStorage.setItem('auth_user', JSON.stringify(response.usuario)),
  AsyncStorage.setItem('auth_sistema', JSON.stringify(response.sistema)),
  AsyncStorage.setItem('auth_access_token', response.access_token),
  AsyncStorage.setItem('auth_refresh_token', response.refresh_token)
]);`;

			setResponseData(prev => prev + `\n\n${storageExample}`);

			// Simular almacenamiento real
			await Promise.all([
				AsyncStorage.setItem('auth_user', JSON.stringify(mockResponse.usuario)),
				AsyncStorage.setItem('auth_sistema', JSON.stringify(mockResponse.sistema)),
				AsyncStorage.setItem('auth_access_token', mockResponse.access_token),
				AsyncStorage.setItem('auth_refresh_token', mockResponse.refresh_token),
			]);

			// Mostrar datos almacenados
			const [userData, sistemaData, accessToken, refreshToken] = await Promise.all([
				AsyncStorage.getItem('auth_user'),
				AsyncStorage.getItem('auth_sistema'),
				AsyncStorage.getItem('auth_access_token'),
				AsyncStorage.getItem('auth_refresh_token'),
			]);

			const storedDataExample = `// 5. Datos almacenados en AsyncStorage:
Usuario: ${userData}
Sistema: ${sistemaData}
Access Token: ${accessToken?.substring(0, 50)}...
Refresh Token: ${refreshToken}`;

			setStoredData(storedDataExample);

			Alert.alert('Éxito', 'Flujo de autenticación simulado correctamente');

		} catch (error) {
			Alert.alert('Error', 'Error al simular el flujo de autenticación');
		} finally {
			setIsLoading(false);
		}
	};

	const clearStoredData = async () => {
		try {
			await Promise.all([
				AsyncStorage.removeItem('auth_user'),
				AsyncStorage.removeItem('auth_sistema'),
				AsyncStorage.removeItem('auth_access_token'),
				AsyncStorage.removeItem('auth_refresh_token'),
			]);
			setResponseData('');
			setStoredData('');
			Alert.alert('Éxito', 'Datos de autenticación limpiados');
		} catch (error) {
			Alert.alert('Error', 'Error al limpiar los datos');
		}
	};

	const showReadExample = async () => {
		try {
			const [userData, sistemaData, accessToken, refreshToken] = await Promise.all([
				AsyncStorage.getItem('auth_user'),
				AsyncStorage.getItem('auth_sistema'),
				AsyncStorage.getItem('auth_access_token'),
				AsyncStorage.getItem('auth_refresh_token'),
			]);

			const readExample = `// Código para leer datos almacenados:
const [userData, sistemaData, accessToken, refreshToken] = await Promise.all([
  AsyncStorage.getItem('auth_user'),
  AsyncStorage.getItem('auth_sistema'),
  AsyncStorage.getItem('auth_access_token'),
  AsyncStorage.getItem('auth_refresh_token')
]);

// Verificar si hay datos válidos
if (userData && accessToken && AuthService.isTokenValid(accessToken)) {
  const user = JSON.parse(userData);
  const sistema = sistemaData ? JSON.parse(sistemaData) : null;
  
  // Usuario autenticado
  console.log('Usuario autenticado:', user);
} else {
  // Usuario no autenticado
  console.log('Usuario no autenticado');
}

// Datos actuales almacenados:
Usuario: ${userData || 'No hay datos'}
Sistema: ${sistemaData || 'No hay datos'}
Access Token: ${accessToken ? accessToken.substring(0, 50) + '...' : 'No hay datos'}
Refresh Token: ${refreshToken || 'No hay datos'}`;

			setStoredData(readExample);
		} catch (error) {
			Alert.alert('Error', 'Error al leer los datos almacenados');
		}
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
					Demo de Autenticación
				</ThemedText>
				<ThemedText style={styles.subtitle}>
					Flujo completo de inicio de sesión
				</ThemedText>
			</View>

			{/* Formulario de ejemplo */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Credenciales de Ejemplo
				</ThemedText>
				
				<View style={styles.inputContainer}>
					<ThemedText style={styles.inputLabel}>Usuario</ThemedText>
					<TextInput
						style={[styles.input, { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text }]}
						value={userName}
						onChangeText={setUserName}
						placeholder="Usuario de ejemplo"
						placeholderTextColor={colors.icon}
					/>
				</View>

				<View style={styles.inputContainer}>
					<ThemedText style={styles.inputLabel}>Contraseña</ThemedText>
					<TextInput
						style={[styles.input, { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text }]}
						value={password}
						onChangeText={setPassword}
						placeholder="Contraseña de ejemplo"
						placeholderTextColor={colors.icon}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: colors.tint, opacity: isLoading ? 0.7 : 1 }]}
					onPress={simulateLogin}
					disabled={isLoading}
				>
					<ThemedText style={styles.buttonText}>
						{isLoading ? 'Simulando...' : 'Simular Login'}
					</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Código de ejemplo */}
			{responseData ? (
				<View style={styles.section}>
					<ThemedText type="title" style={styles.sectionTitle}>
						Código de Ejemplo
					</ThemedText>
					<View style={[styles.codeContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
						<Text style={[styles.codeText, { color: colors.text }]}>{responseData}</Text>
					</View>
				</View>
			) : null}

			{/* Datos almacenados */}
			{storedData ? (
				<View style={styles.section}>
					<ThemedText type="title" style={styles.sectionTitle}>
						Datos Almacenados
					</ThemedText>
					<View style={[styles.codeContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
						<Text style={[styles.codeText, { color: colors.text }]}>{storedData}</Text>
					</View>
				</View>
			) : null}

			{/* Botones de acción */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Acciones
				</ThemedText>
				
				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#007AFF', marginBottom: 12 }]}
					onPress={showReadExample}
				>
					<ThemedText style={styles.buttonText}>
						Mostrar Código de Lectura
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#FF3B30' }]}
					onPress={clearStoredData}
				>
					<ThemedText style={styles.buttonText}>
						Limpiar Datos
					</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Explicación del flujo */}
			<View style={styles.section}>
				<ThemedText type="title" style={styles.sectionTitle}>
					Explicación del Flujo
				</ThemedText>
				
				<View style={styles.explanationContainer}>
					<ThemedText style={styles.explanationText}>
						1. <Text style={styles.bold}>Credenciales:</Text> El usuario ingresa su nombre de usuario y contraseña
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						2. <Text style={styles.bold}>Validación:</Text> Se validan los campos antes de enviar la petición
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						3. <Text style={styles.bold}>API Call:</Text> Se hace una petición POST al endpoint de autenticación
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						4. <Text style={styles.bold}>Respuesta:</Text> El servidor devuelve tokens y datos del usuario
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						5. <Text style={styles.bold}>Almacenamiento:</Text> Los datos se guardan en AsyncStorage para persistencia
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						6. <Text style={styles.bold}>Navegación:</Text> Se redirige al usuario a la aplicación principal
					</ThemedText>
					
					<ThemedText style={styles.explanationText}>
						7. <Text style={styles.bold}>Validación de Sesión:</Text> En cada inicio se verifica si hay una sesión válida
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