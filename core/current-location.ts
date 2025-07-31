import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      // Pedir permisos
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado')
        return
      }

      // Obtener ubicación
      let loc = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      })
    })()
  }, [])

  return { location, errorMsg }
}
