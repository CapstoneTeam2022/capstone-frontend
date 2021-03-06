import * as React from 'react'
import { useState, ChangeEvent, Fragment } from 'react'
import Grid from '@mui/material/Grid'
import { Card, Typography, CardContent, DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { TextField, Button, CardActions } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// import CalendarMonthIcon from 'mdi-material-ui/CalendarMonth'
import CityIcon from 'mdi-material-ui/City'
import HouseIcon from 'mdi-material-ui/Home'
import StreetIcon from 'mdi-material-ui/RoadVariant'
import SubcityIcon from 'mdi-material-ui/TownHall'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// import AddressInformationForm from '../shared-components/form-components/AddressInformationForm'

import requests from 'src/utils/repository'

import { useSession } from 'next-auth/react'

// import { userInfo } from 'os'
import ShowRefDialog from '../shared-components/ShowRefDialog'
import { EmailMarkAsUnread } from 'mdi-material-ui'

export default function PatientRegistrationForm() {
  const [address, setAddress] = useState({
    city: '',
    subCity: '',
    woreda: '',
    zone: '',
    kebelle: '',
    street: '',
    houseNo: ''
  })
  const [currentUser, setUser] = useState({
    name: '',
    age: 24,
    gender: 'female',
    email: '',
    phone: '',
    address: address,
    isAdmin: false,
    image: '',
    healthCenterId: 4
  })
  const [emName, setEmName] = useState('')
  const [emPhone, setEmPhone] = useState('')
  const [nameErrors, setNameErrors] = useState<{ name: string }>()
  const [emailErrors, setEmailErrors] = useState<{ email: string }>()
  const [phoneErrors, setPhoneErrors] = useState<{ phone: string }>()
  const [cityErrors, setCityErrors] = useState<{ city: string }>()
  const [emNameErrors, setEmNameErrors] = useState<{ emName: string }>()
  const [emPhoneErrors, setEmPhoneErrors] = useState<{ emPhone: string }>()
  const [woredaErrors, setWoredaErrors] = useState<{ woreda: string }>()
  const [subCityErrors, setSubCityErrors] = useState<{ subCity: string }>()
  const [kebelleErrors, setKebelleErrors] = useState<{ kebelle: string }>()
  const [streetErrors, setStreetErrors] = useState<{ street: string }>()
  const [houseNoErrors, setHouseNoErrors] = useState<{ houseNo: string }>()
  const [zoneErrors, setZoneErrors] = useState<{ zone: string }>()

  const disableButton =
    nameErrors?.name ||
    !currentUser.name ||
    emNameErrors?.emName ||
    emailErrors?.email ||
    !currentUser.email ||
    phoneErrors?.phone ||
    !currentUser.phone ||
    emPhoneErrors?.emPhone ||
    cityErrors?.city ||
    !address.city ||
    woredaErrors?.woreda ||
    subCityErrors?.subCity ||
    kebelleErrors?.kebelle ||
    streetErrors?.street ||
    houseNoErrors?.houseNo ||
    zoneErrors?.zone
      ? true
      : false

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setNameErrors({ name: '' })
    setUser({ ...currentUser, name: value })
    const regName = new RegExp(/^[a-zA-Z\s]{3,30}$/).test(value)

    if (value == '') {
      setNameErrors({ name: 'Name field cannot be empty' })
    } else if (value.length <= 3) {
      setNameErrors({ name: "Name can't be less than 3 characters" })
    } else if (value.length >= 30) {
      setNameErrors({ name: "Name can't be longer than 30 characters" })
    } else if (!regName) {
      setNameErrors({ name: 'Name can only include alphabets' })
    }
  }

  const handleEmNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setEmNameErrors({ emName: '' })
    setEmName(value)
    const regName = new RegExp(/^[a-zA-Z\s]{3,30}$/).test(value)

    if (value.length <= 3 && value.length != 0) {
      setEmNameErrors({ emName: "Name can't be less than 3 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setEmNameErrors({ emName: "Name can't be longer than 30 characters" })
    } else if (!regName && value.length != 0) {
      setEmNameErrors({ emName: 'Name can only include alphabets' })
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setEmailErrors({ email: '' })
    setUser({ ...currentUser, email: value })
    const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)

    if (value == '') {
      setEmailErrors({ email: 'Email field cannot be empty' })
    } else if (!reg) {
      setEmailErrors({ email: 'Invalid email' })
    }
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setPhoneErrors({ phone: '' })
    setUser({ ...currentUser, phone: value })
    const reg = new RegExp(/^\d{9,10}$/).test(value)

    if (value == '') {
      setPhoneErrors({ phone: 'Phone field cannot be empty' })
    } else if (value.length < 9) {
      setPhoneErrors({ phone: "Phone number length can't be less than 9" })
    } else if (value.length > 10) {
      setPhoneErrors({ phone: "Phone number length can't be longer than 10" })
    } else if (!reg) {
      setPhoneErrors({ phone: "Phone number can't include alphabet" })
    }
  }

  const handleEmPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setEmPhoneErrors({ emPhone: '' })
    setEmPhone(value)
    const reg = new RegExp(/^\d{9,10}$/).test(value)

    if (value.length < 9 && value.length != 0) {
      setEmPhoneErrors({ emPhone: "Phone number length can't be less than 9" })
    } else if (value.length > 10 && value.length != 0) {
      setEmPhoneErrors({ emPhone: "Phone number length can't be longer than 10" })
    } else if (!reg && value.length != 0) {
      setEmPhoneErrors({ emPhone: "Phone number can't include alphabet" })
    }
  }

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setCityErrors({ city: '' })
    setAddress({ ...address, city: value })
    const regName = new RegExp(/^[a-zA-Z\s]{3,30}$/).test(value)

    if (value == '') {
      setCityErrors({ city: 'City field cannot be empty' })
    } else if (value.length <= 3) {
      setCityErrors({ city: "City can't be less than 3 characters" })
    } else if (value.length >= 30) {
      setCityErrors({ city: "City can't be longer than 30 characters" })
    } else if (!regName) {
      setCityErrors({ city: 'City can only include alphabets' })
    }
  }

  const handleWoredaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setWoredaErrors({ woreda: '' })
    setAddress({ ...address, woreda: value })

    if (value.length < 2 && value.length != 0) {
      setWoredaErrors({ woreda: "Woreda can't be less than 2 characters" })
    } else if (value.length >= 10 && value.length != 0) {
      setWoredaErrors({ woreda: "Woreda can't be longer than 10 characters" })
    }
  }

  const handleSubCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setSubCityErrors({ subCity: '' })
    setAddress({ ...address, subCity: value })
    const regName = new RegExp(/^[a-zA-Z\s]{3,30}$/).test(value)

    if (value.length <= 3 && value.length != 0) {
      setSubCityErrors({ subCity: "Sub City can't be less than 3 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setSubCityErrors({ subCity: "Sub City can't be longer than 10 characters" })
    } else if (!regName) {
      setSubCityErrors({ subCity: 'Sub City can only include alphabets' })
    }
  }

  const handleKebelleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setKebelleErrors({ kebelle: '' })
    setAddress({ ...address, kebelle: value })

    if (value.length < 2 && value.length != 0) {
      setKebelleErrors({ kebelle: "Kebelle can't be less than 2 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setKebelleErrors({ kebelle: "Kebelle can't be longer than 30 characters" })
    }
  }

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setStreetErrors({ street: '' })
    setAddress({ ...address, street: value })

    if (value.length <= 3 && value.length != 0) {
      setStreetErrors({ street: "Street can't be less than 3 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setStreetErrors({ street: "Street can't be longer than 30 characters" })
    }
  }

  const handleHouseNoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setHouseNoErrors({ houseNo: '' })
    setAddress({ ...address, houseNo: value })

    if (value.length < 2 && value.length != 0) {
      setHouseNoErrors({ houseNo: "HouseNo can't be less than 2 characters" })
    } else if (value.length >= 10 && value.length != 0) {
      setHouseNoErrors({ houseNo: "HouseNo can't be longer than 10 characters" })
    }
  }

  const handleZoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setZoneErrors({ zone: '' })
    setAddress({ ...address, zone: value })

    if (value.length <= 3 && value.length != 0) {
      setZoneErrors({ zone: "Zone can't be less than 3 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setZoneErrors({ zone: "Zone can't be longer than 10 characters" })
    }
  }

  const { data: session } = useSession()
  const [age, setAge] = useState(24)
  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'))
  const [gender, setGender] = React.useState('female')
  const [patientRef, setPatientRef] = useState('')
  const [open, setOpen] = useState(false)

  const handleDateChange = (newValue: Date | null) => {
    setValue(newValue)
    const today = new Date()
    let val = today.getFullYear() - newValue.getFullYear()
    const m = today.getMonth() - newValue.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < newValue.getDate())) {
      val--
    }
    setAge(val)
  }

  const registerPatient = () => {
    // const healthCenter = new HealthCenter({name: name, type: type, email: email, phone: phone, address: address} );
    let finalUser = currentUser
    finalUser.address = address
    const body = {
      user: finalUser,
      emergencyContactName: emName,
      emergencyContactPhone: emPhone,
      registeredBy: 1,
      role: 'Patient'
    }
    console.log(body)

    requests.post(`/patient`, body, session ? session.accessToken.toString() : '').then(response => {
      setPatientRef(response.data.refId)
      setOpen(true)
    })
  }

  // const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false)

  return (
    <Grid container spacing={6}>
      <Grid sx={{ mx: 12, my: 4 }} item xs={12}>
        <Typography variant='h5'>Patient Registration</Typography>
      </Grid>
      <Card sx={{ width: 5 / 6, mx: 18, my: 4, backgroundColor: 'white' }}>
        <div>
          <CardContent sx={{ px: 4 }}>
            <Grid sx={{ px: 4 }} container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, mt: 2, mb: 3 }}>
                  Personal Information
                </Typography>
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <TextField
                  size='small'
                  fullWidth
                  required
                  label='Full Name'
                  placeholder='Rediet Demisse'
                  value={currentUser.name}
                  onChange={handleNameChange}
                  error={Boolean(nameErrors?.name)}
                  helperText={nameErrors?.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <TextField
                  size='small'
                  fullWidth
                  type='email'
                  label='Email'
                  required
                  value={currentUser.email}
                  onChange={handleEmailChange}
                  error={Boolean(emailErrors?.email)}
                  helperText={emailErrors?.email}
                  placeholder='ruthgd2000@gmail.com'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <TextField
                  size='small'
                  fullWidth
                  required
                  label='Phone Number'
                  placeholder='987654321'
                  value={currentUser.phone}
                  onChange={handlePhoneChange}
                  error={Boolean(phoneErrors?.phone)}
                  helperText={phoneErrors?.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Phone />
                        +251
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label='Date of Birth'
                    openTo='year'
                    inputFormat='MM/dd/yyyy'
                    value={value}
                    onChange={handleDateChange}
                    renderInput={params => <TextField size='small' fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={gender}
                    onChange={e => {
                      setGender(e.target.value)
                    }}
                  >
                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, my: 3 }}>
                  Emergency Contacts
                </Typography>
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <TextField
                  size='small'
                  fullWidth
                  label='Full Name'
                  value={emName}
                  onChange={handleEmNameChange}
                  error={Boolean(emNameErrors?.emName)}
                  helperText={nameErrors?.name}
                  placeholder='Rediet Demisse'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                <TextField
                  size='small'
                  fullWidth
                  label='Phone'
                  value={emPhone}
                  onChange={handleEmPhoneChange}
                  error={Boolean(emPhoneErrors?.emPhone)}
                  helperText={emPhoneErrors?.emPhone}
                  placeholder='987654321'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Phone />
                        +251
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* <AddressInformationForm onSubmit={registerPatient} setAddress={setAddress} /> */}
              <Grid item xs={12} sx={{ px: 2 }}>
                <Typography variant='body2' sx={{ fontWeight: 600, mb: 7, mt: 3 }}>
                  Address Information
                </Typography>
              </Grid>
              <Grid sx={{ px: 4 }} container spacing={5}>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    required
                    onChange={handleCityChange}
                    error={Boolean(cityErrors?.city)}
                    helperText={cityErrors?.city}
                    value={address.city}
                    label='City'
                    placeholder='Addis Ababa'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <CityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    label='Woreda'
                    placeholder='04'
                    value={address.woreda}
                    onChange={handleWoredaChange}
                    error={Boolean(woredaErrors?.woreda)}
                    helperText={woredaErrors?.woreda}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <HouseIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    label='Sub City'
                    placeholder='Bole'
                    value={address.subCity}
                    onChange={handleSubCityChange}
                    error={Boolean(subCityErrors?.subCity)}
                    helperText={subCityErrors?.subCity}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SubcityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    label='Kebele'
                    placeholder='32'
                    value={address.kebelle}
                    onChange={handleKebelleChange}
                    error={Boolean(kebelleErrors?.kebelle)}
                    helperText={kebelleErrors?.kebelle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <CityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    label='Street'
                    value={address.street}
                    onChange={handleStreetChange}
                    error={Boolean(streetErrors?.street)}
                    helperText={streetErrors?.street}
                    placeholder='Mauritania street'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <StreetIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    label='House Number'
                    placeholder='432'
                    value={address.houseNo}
                    onChange={handleHouseNoChange}
                    error={Boolean(houseNoErrors?.houseNo)}
                    helperText={houseNoErrors?.houseNo}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <HouseIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item sx={{ mb: 1, pr: 2 }} xs={12} sm={6}>
                  <TextField
                    size='small'
                    fullWidth
                    value={address.zone}
                    onChange={handleZoneChange}
                    error={Boolean(zoneErrors?.zone)}
                    helperText={zoneErrors?.zone}
                    label='Zone'
                    placeholder='zone'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <CityIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <CardActions>
                <Button
                  disabled={disableButton}
                  size='large'
                  type='submit'
                  variant='contained'
                  onClick={registerPatient}
                >
                  Register
                </Button>
              </CardActions>
            </Grid>
          </CardContent>
        </div>
      </Card>
      <Fragment>
        <Dialog open={open} maxWidth='md' onClose={handleClickClose} aria-labelledby='max-width-dialog-title'>
          <DialogTitle id='max-width-dialog-title'>Please Make sure to copy the Reference Id below </DialogTitle>
          <DialogContent>
            <ShowRefDialog refId={patientRef} />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'></DialogActions>
        </Dialog>
      </Fragment>
    </Grid>
  )
}
