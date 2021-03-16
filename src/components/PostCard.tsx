import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import {
  AccountCircle,
  Delete,
  Edit,
  Favorite,
  Loop,
  Send,
} from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useApiContext } from '../contexts/ApiContext'
import { getDateText } from '../utils/getDateText'
import { PostForm } from './PostForm'

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

/**
 * PostCardProps type.
 */
export type PostCardProps = {
  userDisplayName: string
  userId: number
  postId: number
  username: string
  content: string
  createdAt: Date
  jwt: string
  onEffect?: () => void
} & CardProps

/**
 * PostCard component.
 *
 * *this component is temporary for development.*
 */
export const PostCard: React.FC<PostCardProps> = (props) => {
  const classes = useStyles()
  const [now, setNow] = useState<Date>()
  const [newText, setNewText] = useState('')
  const [isEditor, setIsEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const api = useApiContext()
  const { enqueueSnackbar } = useSnackbar()
  const {
    userDisplayName,
    username,
    content,
    createdAt,
    userId,
    postId,
    onEffect,
    ...card
  } = props

  const openEditor = () => {
    setNewText(props.content)
    setIsEditor(true)
  }

  const onDelete = async () => {
    setLoading(true)

    try {
      await api.client.deletePost({
        post_id: postId,
        jwt: props.jwt,
      })
      enqueueSnackbar('削除しました', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
        autoHideDuration: 2000,
      })
      onEffect && onEffect()
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    if (props.content === newText) {
      setIsEditor(false)
      return
    }

    setLoading(true)

    try {
      await api.client.updatePost({
        user_id: userId,
        post_id: postId,
        text: newText,
        jwt: props.jwt,
      })
      setIsEditor(false)
      enqueueSnackbar('編集しました', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
        autoHideDuration: 2000,
      })
      onEffect && onEffect()
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(id)
  })

  return (
    <>
      <Card {...card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
          }
          title={userDisplayName}
          subheader={`@${username} ${getDateText(now, createdAt)}`}
        />
        <Divider />
        {isEditor ? (
          <>
            <PostForm
              text={newText}
              onChange={setNewText}
              submitText={props.content === newText ? '戻る' : '更新'}
              submitIcon={props.content === newText ? <Loop /> : <Send />}
              onSubmit={onSubmit}
              loading={loading}
            />
          </>
        ) : (
          <>
            <CardContent>
              <Typography paragraph>{content}</Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <IconButton onClick={onDelete} disabled={loading}>
                <Delete />
              </IconButton>
              <IconButton onClick={openEditor} disabled={loading}>
                <Edit />
              </IconButton>
              <IconButton disabled={loading}>
                <Favorite />
              </IconButton>
            </CardActions>
          </>
        )}
      </Card>
    </>
  )
}
