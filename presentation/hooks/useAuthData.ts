import { useAuth } from './useAuth';

/**
 * Hook para acceder fácilmente a los datos de autenticación
 * Proporciona acceso directo a usuario, sistema, tokens y estado de autenticación
 */
export function useAuthData() {
  const auth = useAuth();
  
  return {
    // Datos del usuario
    user: auth.user,
    userName: auth.user?.fullname,
    userEmail: auth.user?.email,
    userClave: auth.user?.clave,
    
    // Datos del sistema
    sistema: auth.sistema,
    sistemaNombre: auth.sistema?.nombre,
    sistemaClave: auth.sistema?.clave,
    
    // Tokens
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    
    // Estado de autenticación
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    
    // Funciones
    login: auth.login,
    logout: auth.logout,
    updateUser: auth.updateUser,
  };
} 