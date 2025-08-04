import { Colors } from '@/constants/Colors';
import LoginScreen from '@/presentation/components/auth/LoginScreen';
import { ThemedText } from '@/presentation/components/auth/ThemedText';
import { useAuth } from '@/presentation/hooks/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function IndexPage() {
	const { login } = useAuth();
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const isDark = colorScheme === 'dark'

	const handleLogin = async (userName: string, password: string) => {
		try {
			await login(userName, password);
		} catch (error) {
			throw error;
		}
	};

	const goToAuthDemo = () => {
		router.push('/auth-demo');
	};

	const goToApiClientDemo = () => {
		router.push('/api-client-demo');
	};

	return (
		<View style={styles.container}>
			<LoginScreen
				onLogin={handleLogin}
			/>

			{/* Botones para acceder a las demos */}
			<View style={styles.demoButtonsContainer}>
				<TouchableOpacity
					style={[styles.demoButton, { backgroundColor: colors.tint }]}
					onPress={goToAuthDemo}
				>
					<ThemedText style={isDark ? styles.demoButtonTextDark : styles.demoButtonText}>
						Demo Auth
					</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.demoButton, { backgroundColor: '#007AFF', marginLeft: 12 }]}
					onPress={goToApiClientDemo}
				>
					<ThemedText style={styles.demoButtonText}>
						Demo ApiClient
					</ThemedText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	demoButtonsContainer: {
		position: 'absolute',
		bottom: 80,
		right: 20,
		flexDirection: 'row',
	},
	demoButton: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	demoButtonText: {
		color: 'white',
		fontSize: 14,
		fontWeight: '600',
	},
	demoButtonTextDark: {
		color: 'black',
		fontSize: 14,
		fontWeight: '600',
	}
}); 