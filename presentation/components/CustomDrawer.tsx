import colors from '@/app/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Text, View } from 'react-native'

export default function CustomDrawerContent(props: any) {
    const filteredRoutes = props.state.routes.filter(
        (route: any) => !route.name.includes('(')
    )

    // Crear un nuevo estado con las rutas filtradas
    const filteredState = {
        ...props.state,
        routes: filteredRoutes,
        index: Math.min(props.state.index, filteredRoutes.length - 1),
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/* Header del Drawer */}
        <View className="items-center p-4 ">
            <Text className="text-lg font-bold">Bienvenido</Text>
        </View>

        {/* Lista de pantallas registradas */}
        <DrawerItemList {...props} state={filteredState}  />

        {/* Extra: Botón personalizado */}
        <DrawerItem
            label="Cerrar sesión"
            onPress={() => console.log('Logout')}
            icon={({ color, size }) => (
            <Ionicons name="log-out-outline" color={colors.primary} size={size} />
            )}
        />
        </DrawerContentScrollView>
    )
}
