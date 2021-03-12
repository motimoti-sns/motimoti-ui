import { createContext, useContext } from 'react'
import { Client } from '../classes/Client'

/**
 * ApiContextData type.
 */
export type ApiContextData = {
  client: Client
}

/**
 * default ApiContext data.
 */
export const defaultApiContextData: ApiContextData = {
  client: new Client('http://localhost:5000'),
}

/**
 * ApiContext.
 */
export const ApiContext = createContext<ApiContextData>(defaultApiContextData)

/**
 * ApiProvider.
 */
export const ApiProvider = ApiContext.Provider

/**
 * ApiConsumer.
 */
export const ApiConsumer = ApiContext.Consumer

/**
 * use ApiContext.
 */
export const useApiContext = (): ApiContextData => {
  return useContext(ApiContext)
}
