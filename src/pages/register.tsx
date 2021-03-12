import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { LockOutlined, PersonAdd } from '@material-ui/icons'
import { TextField } from 'mui-rff'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Form } from 'react-final-form'
import Particles from 'react-particles-js'
import { RegisterParams } from '../classes/Client'
import { useApiContext } from '../contexts/ApiContext'
import { waitFor } from '../utils/waitFor'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: 'linear-gradient(140deg, #0000FF, #2DFF00)',
  },
  particles: {
    position: 'absolute',
    left: 4,
    right: 4,
    top: 4,
    bottom: 8,
  },
  left: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  motimotiLogo: {
    width: '80%',
    maxWidth: '500px',
  },
  descriptionWrap: {
    textAlign: 'center',
    maxWidth: '85%',
  },
  description: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    letterSpacing: '0.2rem',
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  registerText: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  formCard: {
    width: '100%',
    maxWidth: 700,
  },
  form: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
  actionWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

/**
 * RegisterPage component.
 */
export const RegisterPage: NextPage = () => {
  const classes = useStyles()
  const api = useApiContext()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const register = async (data: RegisterParams) => {
    setLoading(true)
    await waitFor(1000)

    try {
      const token = await api.client.register(data)
      console.log(token)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const validate = (data: RegisterParams) => {
    const result: Partial<RegisterParams> = {}

    if (!data.name) result.name = '入力してください'
    if (!data.email) result.email = '入力してください'
    if (!data.password) result.password = '入力してください'

    if (Object.keys(result).length > 0) return result

    console.log(data.email)
    if (
      !data.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      result.email = 'メールアドレスを入力してください'
    }

    if (data.password.length < 6) result.password = '6文字以上にしてください'
    if (data.password.length > 32) result.password = '32文字以下にしてください'

    if (Object.keys(result).length > 0) return result
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Particles
          className={classes.particles}
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
            },
          }}
        />
        <Grid item xs={false} sm={5} md={6} className={classes.left}>
          <img src="/motimoti-light.svg" className={classes.motimotiLogo} />
          <div className={classes.descriptionWrap}>
            <Typography paragraph className={classes.description}>
              Motimoti(モチモチ)はブロックチェーンを利用した新時代のSNSです。
            </Typography>
            <Typography paragraph className={classes.description}>
              ブロックチェーンとは仮想通貨などに使われている技術です。その非中央集権的な特性上、データ紛失への耐性が高いことが知られています。
            </Typography>
            <Typography paragraph className={classes.description}>
              この技術により、SNSのありとあらゆるデータはMotimotiのブロックチェーンネットワークに保存されます。
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={6} className={classes.paper}>
          <Card className={classes.formCard}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  <LockOutlined />
                </Avatar>
              }
              title="Motimotiに登録する"
            />
            <Divider />
            <Form
              onSubmit={register}
              validate={validate}
              render={({ handleSubmit }) => (
                <>
                  <CardContent>
                    <form className={classes.form} noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        name="name"
                        label="ニックネーム"
                        helperText="Motimotiであなたが使うニックネームです"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="メールアドレス"
                        autoComplete="email"
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="パスワード"
                        autoComplete="password"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showPassword}
                            onChange={({ target: { checked } }) =>
                              setShowPassword(checked)
                            }
                          />
                        }
                        label="パスワードを表示する"
                      ></FormControlLabel>
                    </form>
                  </CardContent>
                  <Divider />
                  <CardActions className={classes.actionWrap}>
                    <Link href="/login">
                      <Button color="primary" disabled={loading}>
                        既にアカウントを持ってる方はこちら
                      </Button>
                    </Link>
                    <Button
                      color="secondary"
                      variant="contained"
                      endIcon={<PersonAdd />}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      登録する
                    </Button>
                  </CardActions>
                  {loading && <LinearProgress color="secondary" />}
                </>
              )}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default RegisterPage
