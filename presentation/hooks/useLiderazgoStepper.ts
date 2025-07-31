import { RelativePathString, usePathname, useRouter } from 'expo-router'

const steps = [
  { key: 'info', path: '/liderazgo/(new)/InformacionGeneral' },
  { key: 'pdl1', path: '/liderazgo/(new)/LiderazgoUno' },
  { key: 'pdl2', path: '/liderazgo/(new)/LiderazgoDos' },
  { key: 'CA', path: '/liderazgo/(new)/CuasiaccidenteFlash' },
  { key: 'pdl3', path: '/liderazgo/(new)/LiderazgoTres' },
  { key: 'pdl4', path: '/liderazgo/(new)/LiderazgoCuatro' },
]

export function useLiderazgoStepper() {
  const pathname = usePathname()
  const router = useRouter()

  const currentIndex = steps.findIndex((s) => pathname.includes(s.path.split('/').pop()!))

  const goTo = (index: number) => {
    if (index >= 0 && index < steps.length) {
      router.push(steps[index].path as RelativePathString)
    }
  }

  const goNext = () => goTo(currentIndex + 1)
  const goBack = () => goTo(currentIndex - 1)

  return { steps, currentIndex, goTo, goNext, goBack }
}
