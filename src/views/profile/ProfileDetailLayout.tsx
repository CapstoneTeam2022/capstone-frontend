import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import healthCenter from 'src/data/healthCenterData'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import EmployeeGeneralInfo from '../shared-components/EmployeeGeneralInfo'

import ProfileDetail from './ProfileDetail'

import requests from 'src/utils/repository'
import { useSession } from 'next-auth/react'

const ProfileDetailLayout = () => {
  // ** State

  const [user, setUser] = useState({
    name: '',
    phone: '',
    age: 0,
    email: '',
    image: "",
    gender: null,
    isActive: true,
    isResearcher: false,
    isAdmin: false,
    address: {
      id: 6,
      city: '',
      subCity: '',
      zone: '',
      woreda: '',
      kebelle: '',
      street: '',
      houseNo: ''
    },
    role: {
      id: 0,
      name: ' '
    },
    healthCenter: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      type: ''
    }
  })

  const { data: session } = useSession()

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    requests.post(`/user/profile`, {}, session ? session.accessToken.toString() : '').then(response => {
      setUser(response.data)
      setLoading(false)
    })
  }, [])
  if (!loading) {
    return (
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <ProfileDetail user={user}></ProfileDetail>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <EmployeeGeneralInfo role={user.role} healthCenter={user.healthCenter} />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress sx={{ mx: 'auto' }} />
      </Box>
    )
  }
}

export default ProfileDetailLayout
