'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';

import type { CardProps } from '@src/types/CardProps';
import { getAllData } from '@src/fetch/loadData';

interface DataContextType {
  data: CardProps[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType>({
  data: [],
  isLoading: true,
});

/**
 * Hook personnalisé pour utiliser le contexte de données
 * @returns Le contexte de données
 */
export const useData = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * Provider pour les données de l'application
 * Centralise le chargement des données pour éviter la duplication
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [data, setData] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAllData();
        setData(result);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({ data, isLoading }), [data, isLoading]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
