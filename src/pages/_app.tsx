import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import nookies from 'nookies'
import { mainTheme as theme } from '../themes/main'
import { Client } from '../classes/Client'
import { ApiProvider } from '../contexts/ApiContext'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps, router }: AppProps): React.ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const [client] = useState(new Client(process.env.NEXT_PUBLIC_API_URL))

  if (['/login'].includes(router.pathname)) {
    client.onJwtChanged((jwt) => {
      if (!jwt) {
        nookies.destroy(null, 'jwt')
        nookies.set(null, 'jwt', '', {})
      } else {
        nookies.set(null, 'jwt', jwt, {})
      }
    })
  }

  return (
    <>
      <ApiProvider value={{ client }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={5}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </ApiProvider>
    </>
  )
}

export default MyApp
