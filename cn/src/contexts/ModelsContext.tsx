// @ts-nocheck
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const ModelsContext = createContext()

export function ModelsProvider({ children }) {
  const [models, setModels] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchModels = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/models`
      )
      setModels(data.models)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const doTheThing = async () => {
      try {
        await fetchModels()
      } catch (err) {
        console.error("Something went wrong while fetching the models", err)
      }
    }
    doTheThing()
  }, [])

  const value = { models, error, isLoading, fetchModels }

  return (
    <ModelsContext.Provider value={value}>{children}</ModelsContext.Provider>
  )
}

export function useModels() {
  const ctx = useContext(ModelsContext)

  if (!ctx) {
    throw new Error("useModels must be used within a ModelsProvider")
  }

  return ctx
}
