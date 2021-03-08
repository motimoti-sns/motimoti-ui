import React, { ReactElement } from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { mainTheme as theme } from '../themes/main'
import { ManifestLoads } from '../components/ManifestLoads'
import {
  defaultMetaContextData,
  MetaContextData,
  MetaProvider,
} from '../contexts/MetaContext'

/**
 * MyDocumentState type.
 */
export type MyDocumentState = {
  /**
   * meta data.
   */
  meta: MetaContextData
}

/**
 * MyDocument class.
 */
export default class MyDocument extends Document {
  state: MyDocumentState = {
    meta: defaultMetaContextData,
  }

  /**
   * Render.
   */
  render(): ReactElement {
    return (
      <Html lang="ja">
        <MetaProvider value={this.state.meta}>
          <Head>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <ManifestLoads />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </MetaProvider>
      </Html>
    )
  }

  /**
   * Get initial props.
   *
   * @param ctx
   */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    }
  }
}
