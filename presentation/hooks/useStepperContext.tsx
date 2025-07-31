import React, { createContext, useContext, useState } from 'react'

type StepperContextType = {
  onNext?: () => void
  onBack?: () => void
  setOnNext: (fn: (() => void) | undefined) => void
  setOnBack: (fn: (() => void) | undefined) => void
}

const StepperContext = createContext<StepperContextType>({
  setOnNext: () => {},
  setOnBack: () => {},
})

export const StepperProvider = ({ children }: { children: React.ReactNode }) => {
  const [onNext, setOnNext] = useState<(() => void) | undefined>()
  const [onBack, setOnBack] = useState<(() => void) | undefined>()

  return (
    <StepperContext.Provider value={{ onNext, onBack, setOnNext, setOnBack }}>
      {children}
    </StepperContext.Provider>
  )
}

export const useStepperContext = () => useContext(StepperContext)
