import { createContext, useContext } from 'react'

export interface DataContextI {
  logged: boolean
  log: () => void
  query: (q: string) => void
  res: {ans: string}
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
