import CustomDrawerContent from '@/presentation/components/CustomDrawer'
import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import colors from '../theme/colors'

const DrawerLayout = () => {
  return (
    <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
            headerShadowVisible: false
        }}
    >
        <Drawer.Screen 
            name="home/index"
            options={{
                title: 'Bienvenido',
                drawerLabel: 'Inicio',
                drawerIcon: ({ size }) => (
                    <Ionicons name='home-outline' size={size} color={colors.primary} />
                )
            }}
        />
        <Drawer.Screen 
            name="liderazgo/index"
            options={{
                title: 'Liderazgo Visible en Campo',
                drawerLabel: 'Liderazgo Visible en Campo',
                drawerIcon: ({ size }) => (
                    <Ionicons name='person-outline' size={size} color={colors.primary} />
                )
            }}
        />
    </Drawer>
  )
}

export default DrawerLayout