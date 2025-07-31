import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { Stack, useNavigation, useRouter } from 'expo-router'

const StackLayout = () => {
    const navigation = useNavigation()
    const router = useRouter()

    const onHeaderLeftClick = (canGoBack: boolean) => {
        if (canGoBack) {
            router.back()
        } else {
            navigation.dispatch(DrawerActions.toggleDrawer)
        }
    }

  return (
    <Stack
        screenOptions={{
            //headerShown: false,
            headerShadowVisible: false,
            contentStyle: {
                backgroundColor: 'white',
            },
            title: 'Liderazgo Visible en Campo',
            headerLeft: ({ tintColor, canGoBack}) => <Ionicons 
                name={ canGoBack ? 'arrow-back-outline' : 'menu-outline'}
                size={20}
                className='mr-5'
                onPress={() => onHeaderLeftClick(canGoBack as boolean)}
            />
        }}
    >
        <Stack.Screen name="liderazgo/(new)/index" options={{ title: 'Nuevo Liderazgo' }} />
        
    </Stack>
    
  )
}

export default StackLayout