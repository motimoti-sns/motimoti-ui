import {
  Avatar,
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
import { AccountCircle, Favorite } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { getDateText } from '../utils/getDateText'

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
  username: string
  content: string
  createdAt: Date
} & CardProps

/**
 * PostCard component.
 *
 * *this component is temporary for development.*
 */
export const PostCard: React.FC<PostCardProps> = (props) => {
  const classes = useStyles()
  const [now, setNow] = useState<Date>()
  const { userDisplayName, username, content, createdAt, ...card } = props

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
        <CardContent>
          <Typography paragraph>{content}</Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton>
            <Favorite />
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
}
