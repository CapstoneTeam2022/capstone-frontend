// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

// import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'

// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'

// import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { setServers } from 'dns/promises'
import requests from 'src/utils/repository'
import { useSession } from 'next-auth/react'
import { Alert, Snackbar, TextField } from '@mui/material'

// import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = (props: any) => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const [newError, setNewError] = useState<{ newPassword: string }>()

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  // const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setNewError({ newPassword: '' })
    setValues({ ...values, newPassword: value })
    const regName = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(value)

    if (value == '') {
      setNewError({ newPassword: 'Password field cannot be empty' })
    } else if (!regName) {
      setNewError({ newPassword: 'Not a strong password' })
    }
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [err, setErr] = useState(false)
  const [open, setOpen] = useState(false)

  const { data: session } = useSession()
  const changePassword = () => {
    if (values.newPassword === values.confirmNewPassword) {
      const body = {
        oldPassword: values.currentPassword,
        newPassword: values.confirmNewPassword
      }
      requests
        .post('/user/password/update', body, session ? session.accessToken : '')
        .then(res => {
          setErr(false)
          setOpen(true)
        })
        .catch(e => {
          setErr(true)
          setOpen(true)
        })
    } else {
      setErr(true)
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Snackbar open={open} autoHideDuration={600} onClose={() => setOpen(false)}>
          <Alert onClose={handleClose} severity={err ? 'error' : 'success'} sx={{ width: '100%' }}>
            {err ? 'An error has occured, try again!' : 'Changed Successfully'}
          </Alert>
        </Snackbar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <TextField
                  value={values.currentPassword}
                  onChange={handleCurrentPasswordChange('currentPassword')}
                  fullWidth
                  error={values.currentPassword == ''}
                  helperText={values.currentPassword == '' ? 'Password cannot be empty' : ''}
                  id='account-settings-current-password'
                  type={values.showCurrentPassword ? 'text' : 'password'}
                  required
                  label='Current Password'
                  placeholder=''
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl> */}
              </Grid>

              <Grid item xs={12} sx={{}}>
                <TextField
                  value={values.newPassword}
                  onChange={handleNewPasswordChange}
                  fullWidth
                  id='account-settings-new-password'
                  type={values.showNewPassword ? 'text' : 'password'}
                  required
                  error={Boolean(newError?.newPassword)}
                  helperText={newError?.newPassword}
                  label='New Password'
                  placeholder=''
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl> */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  value={values.confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                  fullWidth
                  id='account-settings-confirm-new-password'
                  type={values.showConfirmNewPassword ? 'text' : 'password'}
                  required
                  label='Confirm New Password'
                  error={Boolean(values.newPassword !== values.confirmNewPassword)}
                  helperText={
                    values.newPassword !== values.confirmNewPassword ? 'New password doesnt match confirm password' : ''
                  }
                  placeholder=''
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Box sx={{ mt: 11 }}>
          <Button
            variant='contained'
            disabled={
              values.newPassword != values.confirmNewPassword ||
              values.newPassword == '' ||
              values.confirmNewPassword == '' ||
              values.currentPassword == '' ||
              newError?.newPassword
            }
            sx={{ marginRight: 3.5 }}
            onClick={changePassword}
          >
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
