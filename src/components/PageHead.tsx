import Head from 'next/head'
import { useMetaContext } from '../contexts/MetaContext'

/**
 * PageHeadProps type.
 */
export type PageHeadProps = {
  /**
   * page title.
   */
  title?: string

  /**
   * page description.
   */
  description?: string
}

/**
 * PageHead component.
 */
export const PageHead: React.FC<PageHeadProps> = (props) => {
  const meta = useMetaContext()

  return (
    <>
      <Head>
        <title>{props.title ?? meta.catchphrase} / Motimoti</title>
        <meta
          name="description"
          content={props.description ?? meta.catchphrase}
        />
      </Head>
    </>
  )
}
