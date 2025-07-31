import { ROUTES } from '@/presentation/helpers/routes'
import colors from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { RelativePathString, useRouter } from 'expo-router'
import { Text, View } from 'react-native'

export default function CustomDrawerContent(props: any) {
  const router = useRouter()

  const navigateAndClose = (path: RelativePathString) => {
    router.replace(path)
    props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header del Drawer */}
      <View className="items-center p-4">
        <Text className="text-lg font-bold">SSOMA - Bienvenido</Text>
      </View>

      {/* Opciones del Drawer */}
      <DrawerItem
        label="Inicio"
        onPress={() => navigateAndClose(ROUTES.home)}
        icon={({ size }) => (
          <Ionicons name="home-outline" color={colors.primary} size={size} />
        )}
      />

      <DrawerItem
        label="Liderazgo Visible en Campo"
        onPress={() => navigateAndClose(ROUTES.liderazgo)}
        icon={({ size }) => (
          <Ionicons name="person-outline" color={colors.primary} size={size} />
        )}
      />

      <DrawerItem
        label="Cerrar sesión"
        onPress={() => console.log('Logout')}
        icon={({ size }) => (
          <Ionicons name="log-out-outline" color={colors.primary} size={size} />
        )}
      />
    </DrawerContentScrollView>
  )
}
