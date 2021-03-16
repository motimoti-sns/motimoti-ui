import {
  Button,
  makeStyles,
  Typography,
  Container,
  Divider,
  LinearProgress,
} from '@material-ui/core'
import { TextField } from 'mui-rff'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { LoginParams } from '../classes/Client'
import { PageHead } from '../components/PageHead'
import { useApiContext } from '../contexts/ApiContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toRegister: {
    margin: theme.spacing(3, 0, 2),
  },
}))

/**
 * LoginPage component.
 */
export const LoginPage: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const api = useApiContext()
  const router = useRouter()

  const login = async (data: LoginParams) => {
    setLoading(true)
    try {
      await api.client.login(data)
      await router.push('/')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const validate = (data: LoginParams) => {
    const result: Partial<LoginParams> = {}

    if (!data.email) result.email = '入力してください'
    if (!data.password) result.password = '入力してください'

    return Object.keys(result).length > 0 ? result : void 0
  }

  return (
    <>
      <PageHead title="Motimotiへログイン" />

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src="/motimoti-dark.svg" width="200px" height="200px" />
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Form
            onSubmit={login}
            validate={validate}
            render={({ handleSubmit }) => (
              <>
                <form className={classes.form} noValidate>
                  {loading && <LinearProgress color="secondary" />}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="メールアドレス"
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="パスワード"
                    autoComplete="password"
                    disabled={loading}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    ログイン
                  </Button>
                  <Divider />
                  <Link href="/register">
                    <Button
                      fullWidth
                      variant="text"
                      color="primary"
                      className={classes.toRegister}
                      disabled={loading}
                    >
                      まだアカウントを持っていない方はこちら
                    </Button>
                  </Link>
                </form>
              </>
            )}
          />
        </div>
      </Container>
    </>
  )
}

export default LoginPage
