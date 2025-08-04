import { AuthState, LoginRequest, Sistema, Usuario } from '@/presentation/types/auth';
import { AuthService } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

const STORAGE_KEYS = {
	USER: 'auth_user',
	SISTEMA: 'auth_sistema',
	ACCESS_TOKEN: 'auth_access_token',
	REFRESH_TOKEN: 'auth_refresh_token',
} as const;

export function useAuth() {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		sistema: null,
		accessToken: null,
		refreshToken: null,
		isAuthenticated: false,
		isLoading: true,
	});

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const [userData, sistemaData, accessToken, refreshToken] = await Promise.all([
				AsyncStorage.getItem(STORAGE_KEYS.USER),
				AsyncStorage.getItem(STORAGE_KEYS.SISTEMA),
				AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
				AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
			]);

			if (userData && accessToken && AuthService.isTokenValid(accessToken)) {
				const user: Usuario = JSON.parse(userData);
				const sistema: Sistema = sistemaData ? JSON.parse(sistemaData) : null;

				setAuthState({
					user,
					sistema,
					accessToken,
					refreshToken,
					isAuthenticated: true,
					isLoading: false,
				});
			} else {
				// Limpiar datos inválidos
				await clearAuthData();
				setAuthState({
					user: null,
					sistema: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error('Error checking auth status:', error);
			await clearAuthData();
			setAuthState({
				user: null,
				sistema: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
				isLoading: false,
			});
		}
	};

	const login = async (userName: string, password: string): Promise<void> => {
		try {
			const credentials: LoginRequest = { userName, password };
			const response = await AuthService.login(credentials);

			// Guardar datos de autenticación
			await Promise.all([
				AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.usuario)),
				AsyncStorage.setItem(STORAGE_KEYS.SISTEMA, JSON.stringify(response.sistema)),
				AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token),
				AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token),
			]);

			// Actualizar estado
			setAuthState({
				user: response.usuario,
				sistema: response.sistema,
				accessToken: response.access_token,
				refreshToken: response.refresh_token,
				isAuthenticated: true,
				isLoading: false,
			});

			// Navegar a la aplicación principal
			router.replace('./(drawer)');
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await clearAuthData();
			setAuthState({
				user: null,
				sistema: null,
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
				isLoading: false,
			});
			router.replace('/');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	const clearAuthData = async (): Promise<void> => {
		try {
			await Promise.all([
				AsyncStorage.removeItem(STORAGE_KEYS.USER),
				AsyncStorage.removeItem(STORAGE_KEYS.SISTEMA),
				AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
				AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
			]);
		} catch (error) {
			console.error('Error clearing auth data:', error);
		}
	};

	const updateUser = async (userData: Partial<Usuario>): Promise<void> => {
		try {
			const updatedUser = { ...authState.user, ...userData } as Usuario;
			await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
			setAuthState(prev => ({
				...prev,
				user: updatedUser,
			}));
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	return {
		...authState,
		login,
		logout,
		updateUser,
	};
} 