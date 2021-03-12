import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import {
  AccountCircle,
  Email,
  ExitToApp,
  Home,
  Notifications,
  Settings,
} from '@material-ui/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: 300,
  },
  brand: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  content: {
    maxWidth: '700px',
    width: '100%',
    padding: 16,
  },
  menuItem: {
    paddingLeft: 48,
    height: 64,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 32,
  },
})

/**
 * TimelineLayout layout.
 */
export const TimelineLayout: React.FC = (props) => {
  const classes = useStyles()
  const badgeMax = 99
  const [notificationCount] = useState(100)
  const [messageCount] = useState(100)

  return (
    <div className={classes.root}>
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        variant="persistent"
        open
      >
        <div className={classes.brand}>
          <Image src="/motimoti-dark.svg" width={128} height={128} />
        </div>
        <Divider />
        <List>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon>
              <Badge
                badgeContent={notificationCount}
                color="primary"
                max={badgeMax}
              >
                <Notifications />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="通知" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon>
              <Badge badgeContent={messageCount} color="primary" max={badgeMax}>
                <Email />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="メッセージ" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="プロフィール" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="設定" />
          </ListItem>
          <Divider />
          <ListItem button className={clsx(classes.menuItem)}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.main}>
        <div className={classes.content}>{props.children}</div>
      </main>

      <Drawer
        classes={{ paper: classes.drawerPaper }}
        variant="persistent"
        open
      ></Drawer>
    </div>
  )
}
