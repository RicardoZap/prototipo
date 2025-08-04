import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface AuthProviderProps {
	children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const { isAuthenticated, isLoading } = useAuth();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	if (isLoading) {
		return (
			<View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
				<ActivityIndicator size="large" color={colors.tint} />
				<ThemedText style={styles.loadingText}>Cargando...</ThemedText>
			</View>
		);
	}

	// Si no está autenticado, mostrar la página de login
	if (!isAuthenticated) {
		return null;
	}

	// Si está autenticado, mostrar el contenido protegido
	return <>{children}</>;
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
	},
}); 