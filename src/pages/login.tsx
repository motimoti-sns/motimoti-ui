import {
  Button,
  makeStyles,
  Typography,
  Container,
  Divider,
} from '@material-ui/core'
import { TextField } from 'mui-rff'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Form } from 'react-final-form'
import { LoginParams } from '../classes/Client'
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
  const classes = useStyles()
  const api = useApiContext()

  const login = async (data: LoginParams) => {
    try {
      await api.client.login(data).then(console.log)
    } catch (e) {
      console.log(e)
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
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
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
