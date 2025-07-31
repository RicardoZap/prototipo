import CustomDrawerContent from '@/presentation/components/CustomDrawer'
import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
  return (
    <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            drawerActiveTintColor: 'indigo',
            headerShadowVisible: false,
            sceneStyle: {
                backgroundColor: 'white',
            },
            drawerItemStyle: {
                borderRadius: 10
            },
            headerShown: false,
        }}
    >
    </Drawer>
  )
}
