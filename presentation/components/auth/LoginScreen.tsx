import { Colors } from '@/constants/Colors'
import { LoginRequest } from '@/presentation/types/auth'
import { AuthService } from '@/services/authService'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View
} from 'react-native'
import { ThemedText } from './ThemedText'

interface LoginScreenProps {
  onLogin: (userName: string, password: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const isDark = colorScheme === 'dark'

  const handleLogin = async () => {
    if (!userName.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos')
      return
    }
    setError('')
    setIsLoading(true)
    try {
	  const credentials: LoginRequest = {
		userName: userName,
		password: password
	  };
	  await AuthService.login(credentials)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setError(errorMessage)
      Alert.alert('Error', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logoBg = colorScheme === 'dark' ? '#1f2937' : '#f0f0f0'
  const placeholder = colors.icon

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: logoBg }]}>
            <Image
              source={require('@/assets/images/penoles.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Peñoles Security
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.text }]}>
            Inicia sesión en tu cuenta
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Usuario */}
          <View style={styles.inputContainer}>
            <ThemedText style={[styles.inputLabel, { color: colors.text }]}>Usuario</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: error ? '#ff4444' : colors.icon,
                  color: colors.text
                }
              ]}
              placeholder="Ingresa tu usuario"
              placeholderTextColor={placeholder}
              value={userName}
              onChangeText={(text) => {
                setUserName(text)
                if (error) setError('')
              }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              selectionColor={colors.tint}
              keyboardAppearance={colorScheme === 'dark' ? 'dark' : 'light'}
              returnKeyType="next"
            />
          </View>

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <ThemedText style={[styles.inputLabel, { color: colors.text }]}>Contraseña</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: error ? '#ff4444' : colors.icon,
                  color: colors.text
                }
              ]}
              placeholder="••••••••"
              placeholderTextColor={placeholder}
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (error) setError('')
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleLogin}
              returnKeyType="done"
              editable={!isLoading}
              selectionColor={colors.tint}
              keyboardAppearance={colorScheme === 'dark' ? 'dark' : 'light'}
            />
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </View>
          ) : null}

          {/* Botón */}
          <TouchableOpacity
            style={[
			isDark ? 
				styles.loginButtonDark
			:
              styles.loginButton,
              {
                backgroundColor: colors.tint,
                opacity: isLoading ? 0.7 : 1
              }
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={isDark ? styles.loginButtonTextDark : styles.loginButtonText}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.text }]}>
            © 2024 Peñoles Security Framework
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 48
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  logo: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7
  },
  form: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16
  },
  errorContainer: {
    marginBottom: 16,
    paddingHorizontal: 4
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center'
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  loginButtonDark: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  loginButtonTextDark: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  },
  footer: {
    alignItems: 'center',
    marginTop: 40
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6
  }
})
