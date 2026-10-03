import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ModelsContext = createContext();

export function ModelsProvider({ children }) {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateModels = (newModels) => {
    setModels(newModels);
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/models`,
        );
        console.log(data);
        setModels(data.models);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);

  const value = { models, error, isLoading, updateModels };

  return (
    <ModelsContext.Provider value={value}>{children}</ModelsContext.Provider>
  );
}

export function useModels() {
  const ctx = useContext(ModelsContext);

  if (!ctx) {
    throw new Error("useModels must be used within a ModelsProvider");
  }

  return ctx;
}
