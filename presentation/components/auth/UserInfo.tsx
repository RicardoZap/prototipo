import { Colors } from '@/constants/Colors';
import { useAuth } from '@/presentation/hooks/useAuth';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function UserInfo() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <ThemedText style={styles.userName}>{user.fullname}</ThemedText>
        <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
        <ThemedText style={styles.userClave}>Clave: {user.clave}</ThemedText>
      </View>
      
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.tint }]}
        onPress={logout}
      >
        <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    margin: 16,
  },
  userInfo: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  userClave: {
    fontSize: 12,
    opacity: 0.6,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 