import React, { createContext, ReactNode, useContext, useState } from 'react'

type StepperContextType = {
  onNext?: () => void
  onBack?: () => void
  nextLabel?: string
  backLabel?: string
  setOnNext: (fn: (() => void) | undefined) => void
  setOnBack: (fn: (() => void) | undefined) => void
  setNextLabel: (label: string | undefined) => void
  setBackLabel: (label: string | undefined) => void
}

const StepperContext = createContext<StepperContextType>({
  setOnNext: () => {},
  setOnBack: () => {},
  setNextLabel: () => {},
  setBackLabel: () => {},
})

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [onNext, setOnNext] = useState<(() => void) | undefined>()
  const [onBack, setOnBack] = useState<(() => void) | undefined>()
  const [nextLabel, setNextLabel] = useState<string | undefined>()
  const [backLabel, setBackLabel] = useState<string | undefined>()

  return (
    <StepperContext.Provider value={{ onNext, onBack, setOnNext, setOnBack, nextLabel, setNextLabel, backLabel, setBackLabel }}>
      {children}
    </StepperContext.Provider>
  )
}

export const useStepperContext = () => useContext(StepperContext)
