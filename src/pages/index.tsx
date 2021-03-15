import { styled } from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Client } from '../classes/Client'
import { PageHead } from '../components/PageHead'
import { PostCard } from '../components/PostCard'
import { PostForm, PostFormProps } from '../components/PostForm'
import { useApiContext } from '../contexts/ApiContext'
import { TimelineLayout } from '../layouts/TimelineLayout'
import { User } from '../types/User'

const Post = styled(PostCard)({
  marginBottom: '16px',
})

type HomePageProps = {
  user: User
  jwt: string
}

/**
 * HomePage component.
 */
export const HomePage: NextPage<HomePageProps> = (props) => {
  const [text, setText] = useState('')
  const [posting, setPosting] = useState(false)
  const api = useApiContext()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit: PostFormProps['onSubmit'] = async (text) => {
    setPosting(true)
    try {
      await api.client.createPost({
        user_id: props.user.id,
        text,
        jwt: props.jwt,
      })
      setText('')
      enqueueSnackbar('投稿しました！', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      })
    } catch (e) {
      console.log('error', e)
    } finally {
      setPosting(false)
    }
  }

  return (
    <>
      <PageHead title="ホーム" />

      <TimelineLayout>
        <PostForm
          text={text}
          onSubmit={onSubmit}
          onChange={setText}
          loading={posting}
        />
      </TimelineLayout>
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  try {
    const client = new Client()
    const cookies = nookies.get(ctx)
    const jwt: string = cookies.jwt
    const email = Buffer.from(jwt.split('.')[1], 'base64').toString()
    console.log('fetching...')

    const users = await client.users()
    const user = users.find((u) => u.email === email)

    if (!user) {
      throw new Error('not logged in')
    }

    return {
      props: {
        user,
        jwt,
      },
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {} as never,
    }
  }
}
