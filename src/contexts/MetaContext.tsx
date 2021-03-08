import { createContext, useContext } from 'react'

/**
 * MetaContextData type.
 */
export type MetaContextData = {
  /**
   * site catchphrase.
   */
  catchphrase: string
}

/**
 * default MetaContext data.
 */
export const defaultMetaContextData: MetaContextData = {
  catchphrase: 'A next-generation sns powered by blockchain',
}

/**
 * MetaContext.
 */
export const MetaContext = createContext<MetaContextData>(
  defaultMetaContextData
)

/**
 * MetaProvider.
 */
export const MetaProvider = MetaContext.Provider

/**
 * MetaConsumer.
 */
export const MetaConsumer = MetaContext.Consumer

/**
 * use MetaContext.
 */
export const useMetaContext = (): MetaContextData => {
  return useContext(MetaContext)
}
