// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import userData from '../data/userData'
import { signIn, useSession } from 'next-auth/react'
import LoginPage from 'src/pages/pages/login'
import { Grid } from 'mdi-material-ui'
import Error401 from 'src/pages/401'
import First from 'src/pages/pages/login/first'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const { status, data } = useSession()
  // const session = useSession()
  console.log('pass set', status, data)
  if (status === 'authenticated' && !data.isPasswordReset) {
    return (
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={VerticalNavItems(data)} // Navigation Items
        verticalAppBarContent={(
          props // AppBar C ontent
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>
    )
  } else if (status === 'authenticated' && !data.isPasswordReset) {
    return <First />
  } else if (status === 'unauthenticated') {
    return <LoginPage />
  } else {
    return <div></div>
  }
}

export default UserLayout
