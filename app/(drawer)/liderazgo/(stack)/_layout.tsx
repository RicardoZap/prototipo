import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { Stack, useNavigation, useRouter } from 'expo-router'
import React from 'react'

const StackLayout = () => {
    const router = useRouter()
    const navigation = useNavigation()

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
                headerLeft: ({ tintColor, canGoBack}) => <Ionicons 
                    name={ canGoBack ? 'arrow-back-outline' : 'menu-outline'}
                    size={20}
                    className='mr-5'
                    onPress={() => onHeaderLeftClick(canGoBack as boolean)}
                />
            }}
        >
            <Stack.Screen 
                name='/(new)/index'
                options={{ 
                    title: 'Nuevo Liderazgo',
                }}
            />
        </Stack>
    )
}

export default StackLayout