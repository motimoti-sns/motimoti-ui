import { LinearProgress, styled } from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import useInterval from 'use-interval'
import { Client, PostWithUser } from '../classes/Client'
import { PageHead } from '../components/PageHead'
import { PostCard } from '../components/PostCard'
import { PostForm, PostFormProps } from '../components/PostForm'
import { useApiContext } from '../contexts/ApiContext'
import { TimelineLayout } from '../layouts/TimelineLayout'
import { User } from '../types/User'

const PostCardWithMargin = styled(PostCard)({
  margin: '16px 0',
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
  const [posts, setPosts] = useState<PostWithUser[]>([])
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)
  const api = useApiContext()
  const { enqueueSnackbar } = useSnackbar()

  useInterval(() => {
    if (loading) return
    updatePosts()
  }, 5000)

  const updatePosts = async () => {
    setLoading(true)
    api.client
      .postsWithUser(props)
      .then((p) => p.reverse())
      .then((p) => setPosts(p))
      .then(() => setLoading(false))
  }

  useEffect(() => {
    updatePosts()
  }, [])

  const onSubmit: PostFormProps['onSubmit'] = async (text) => {
    setPosting(true)
    try {
      await api.client.createPost({
        user_id: props.user.id,
        text,
        jwt: props.jwt,
      })
      setText('')
      updatePosts()
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
        {loading && <LinearProgress color="secondary" />}
        {posts.map((p) => (
          <PostCardWithMargin
            key={p.post_id}
            username={p.user.name}
            userDisplayName={p.user.name}
            content={p.text_body}
            createdAt={new Date(parseInt(p.timestamp))}
          />
        ))}
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
