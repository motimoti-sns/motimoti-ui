import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  LinearProgress,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { Send } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  actionWrap: {
    display: 'flex',
    justifyContent: 'right',
  },
}))

/**
 * PostFormProps type.
 */
export type PostFormProps = {
  onSubmit(text: string): void
  onChange(text: string): void
  text: string
  loading?: boolean
  noCard?: boolean
  submitText?: string
  submitIcon?: React.ReactElement
}

/**
 * PostForm component.
 */
export const PostForm: React.FC<PostFormProps> = (props) => {
  const classes = useStyles()
  const CardWrap = props.noCard ? 'div' : Card

  const onChange = (text: string) => {
    props.onChange(text)
  }

  const onPostClicked = () => {
    props.onSubmit(props.text)
  }

  return (
    <>
      <CardWrap>
        {props.loading && <LinearProgress color="secondary" />}
        <CardContent>
          <TextField
            placeholder="今何しとるん？"
            variant="filled"
            rows={5}
            fullWidth
            multiline
            value={props.text}
            onChange={({ target: { value } }) => onChange(value)}
            disabled={props.loading}
          />
        </CardContent>
        <Divider />
        <CardActions className={classes.actionWrap}>
          <Button
            color="primary"
            variant="contained"
            endIcon={props.submitIcon ?? <Send />}
            disableElevation
            disabled={props.text.length === 0 || props.loading}
            onClick={onPostClicked}
          >
            {props.submitText ?? '投稿する'}
          </Button>
        </CardActions>
      </CardWrap>
    </>
  )
}
