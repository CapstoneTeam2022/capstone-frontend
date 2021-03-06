import * as React from 'react'
import { useState, ChangeEvent, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel'
import BackIcon from '@mui/icons-material/ArrowBack'

import Grid from '@mui/material/Grid'
import { Card, Typography, CardContent, Select, MenuItem, SelectChangeEvent, Alert, Snackbar } from '@mui/material'
import { TextField, Button, CardActions } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CityIcon from 'mdi-material-ui/City'
import HouseIcon from 'mdi-material-ui/Home'
import StreetIcon from 'mdi-material-ui/RoadVariant'
import SubcityIcon from 'mdi-material-ui/TownHall'

// import AddressInformatimport BackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'

// import AddressInformationForm from '../shared-components/form-components/AddressInformationForm'

import requests from 'src/utils/repository'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function EmRegistrationForm(props: any) {
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(props.add ? props.user.name : '')
  const [email, setEmail] = useState(props.add ? props.user.name : '')
  const [phone, setPhone] = useState(props.add ? props.user.phone : '')
  const [role, setRole] = useState<string[]>(props.add ? [props.user.role] : ['Receptionist'])
  const [gender, setGender] = React.useState(props.add ? props.user.gender : 'female')
  const [age, setAge] = useState(props.add ? props.user.age : 24)
  const [isAdmin, setIsAdmin] = useState(props.add ? props.user.isAdmin : false)
  const [emName, setEmName] = useState(props.add ? props.user.emergencyContactName : '')
  const [emPhone, setEmPhone] = useState(props.add ? props.user.emergencyContactPhone : '')
  const [city, setCity] = useState(props.add ? props.user.address.city : '')
  const [subCity, setSubCity] = useState(props.add ? props.user.address.subCity : '')
  const [woreda, setWoreda] = useState(props.add ? props.user.address.woreda : '')
  const [kebelle, setKebelle] = useState(props.add ? props.user.address.kebelle : '')
  const [zone, setZone] = useState(props.add ? props.user.address.zone : '')
  const [street, setStreet] = useState(props.add ? props.user.address.street : '')
  const [houseNo, setHouseNo] = useState(props.add ? props.user.address.houseNo : '')

  const [nameErrors, setNameErrors] = useState<{ name: string }>()
  const [emailErrors, setEmailErrors] = useState<{ email: string }>()
  const [phoneErrors, setPhoneErrors] = useState<{ phone: string }>()
  const [cityErrors, setCityErrors] = useState<{ city: string }>()
  const [subCityErrors, setSubCityErrors] = useState<{ subCity: string }>()
  const [woredaErrors, setWoredaErrors] = useState<{ woreda: string }>()
  const [kebelleErrors, setKebelleErrors] = useState<{ kebelle: string }>()
  const [streetErrors, setStreetErrors] = useState<{ street: string }>()
  const [houseNoErrors, setHouseNoErrors] = useState<{ houseNo: string }>()
  const [zoneErrors, setZoneErrors] = useState<{ zone: string }>()
  const [emNameErrors, setEmNameErrors] = useState<{ emName: string }>()
  const [emPhoneErrors, setEmPhoneErrors] = useState<{ emPhone: string }>()

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (router.query.user) {
      const us = JSON.parse(router.query.user?.toString())
      setEdit(true)
      setName(us.name)
      setEmail(us.email)
      setPhone(us.phone)
      setRole(us.role)
      setGender(us.gender)
      setEmName(us.emName)
      setEmPhone(us.emPhone)
      setEdit(true)
    }

    // setCity(us.address.city)
    // setSubCity(us.address.subCity)
    // setWoreda(us.address.woreda)
    // setKebelle(us.address.kebelle)
    // setZone(us.address.zone)
    // setStreet(us.address.street)
    // setHouseNo(us.address.houseNo)
  }, [])

  const disableButton =
    nameErrors?.name ||
    !name ||
    emNameErrors?.emName ||
    emailErrors?.email ||
    !email ||
    phoneErrors?.phone ||
    !phone ||
    emPhoneErrors?.emPhone ||
    cityErrors?.city ||
    !city ||
    woredaErrors?.woreda ||
    subCityErrors?.subCity ||
    !subCity ||
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
    setName(value)
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
    } else if (!regName) {
      setEmNameErrors({ emName: 'Name can only include alphabets' })
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setEmailErrors({ email: '' })
    setEmail(value)
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
    setPhone(value)
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

    if (value == '') {
      setEmPhoneErrors({ emPhone: 'Phone field cannot be empty' })
    } else if (value.length < 9 && value.length != 0) {
      setEmPhoneErrors({ emPhone: "Phone number length can't be less than 9" })
    } else if (value.length > 10 && value.length != 0) {
      setEmPhoneErrors({ emPhone: "Phone number length can't be longer than 10" })
    } else if (!reg) {
      setEmPhoneErrors({ emPhone: "Phone number can't include alphabet" })
    }
  }

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    setCityErrors({ city: '' })
    setCity(value)
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
    setWoreda(value)

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
    setSubCity(value)
    const regName = new RegExp(/^[a-zA-Z\s]{3,30}$/).test(value)

    if (value == '') {
      setSubCityErrors({ subCity: 'Sub City field cannot be empty' })
    } else if (value.length <= 3 && value.length != 0) {
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
    setKebelle(value)

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
    setStreet(value)

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
    setHouseNo(value)

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
    setZone(value)

    if (value.length <= 3 && value.length != 0) {
      setZoneErrors({ zone: "Zone can't be less than 3 characters" })
    } else if (value.length >= 30 && value.length != 0) {
      setZoneErrors({ zone: "Zone can't be longer than 10 characters" })
    }
  }

  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState('An error occured please try again')
  const [open, setOpen] = useState(false)

  const registerEmployee = () => {
    // const healthCenter = new HealthCenter({name: name, type: type, email: email, phone: phone, address: address} );

    console.log({
      name: name,
      phone: phone,
      email: email,
      age: age,
      address: {
        city: city,
        subCity: subCity,
        woreda: woreda,
        zone: zone,
        street: street,
        kebelle: kebelle,
        houseNo: houseNo
      },
      image: '',
      isAdmin: isAdmin,

      // healthCenterId: 4,
      role: role,
      gender: gender
    })
    const body = {
      name: name,
      email: email,
      phone: phone,
      image: '',
      address: {
        city: city,
        subCity: subCity,
        woreda: woreda,
        zone: zone,
        street: street,
        kebelle: kebelle,
        houseNo: houseNo
      },
      gender: gender,
      age: age,
      role: role,
      isAdmin: isAdmin
    }
    if (!router.query.user) {
      requests
        .post(`/employee`, body, session ? session.accessToken.toString() : '')
        .then(response => {
          console.log(response.data)
          router.back()
        })
        .catch(e => {
          setErr(true)
          setOpen(true)
        })
    } else {
      requests
        .put(`/employee/${props.user.id}`, body, session ? session.accessToken.toString() : '')
        .then(response => {
          console.log(response.data)
          router.back()
        })
        .catch(e => {
          setErr(true)
          setOpen(true)
        })
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'))

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

  const switchHandler = (event: any) => {
    setIsAdmin(event.target.checked)
    setRole(['Hospital Admin'])
  }

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    if ((event.target.value as string[]) == ['Hospital Admin']) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    setRole(event.target.value as string[])
  }

  const roles = ['Doctor', 'Receptionist', 'Nurse', 'LabExpert', 'Radiologist', 'Hospital Admin']

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }

  return (
    <Card>
      <IconButton aria-label='back' onClick={() => router.back()}>
        <BackIcon />
      </IconButton>
      <Grid container spacing={6} sx={{ backgroundColor: 'white', mt: 4 }}>
        <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}>
          <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
            {errMsg}
          </Alert>
        </Snackbar>
        <Typography variant='h5' sx={{ fontWeight: 600, mt: 8, mx: 14 }}>
          Employee Registration
        </Typography>
        <Card sx={{ width: 5 / 6, mx: 18, my: 4, backgroundColor: 'white' }}>
          <form onSubmit={e => e.preventDefault()}>
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
                    value={name}
                    onChange={handleNameChange}
                    error={Boolean(nameErrors?.name)}
                    fullWidth
                    helperText={nameErrors?.name}
                    required
                    label='Full Name'
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
                    value={email}
                    onChange={handleEmailChange}
                    error={Boolean(emailErrors?.email)}
                    helperText={emailErrors?.email}
                    required
                    type='email'
                    label='Email'
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
                    value={phone}
                    onChange={handlePhoneChange}
                    error={Boolean(phoneErrors?.phone)}
                    helperText={phoneErrors?.phone}
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
                      defaultValue='female'
                      onChange={e => {
                        setGender(e.target.value)
                      }}
                    >
                      <FormControlLabel value='female' control={<Radio />} label='Female' />
                      <FormControlLabel value='male' control={<Radio />} label='Male' />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}></Grid>
                <Grid sx={{ mb: 1, pr: 2, mt: 1 }} item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                    <Select
                      label='Role'
                      value={role}
                      MenuProps={MenuProps}
                      onChange={handleRoleChange}
                      placeholder='Doctor'
                      fullWidth
                      size='small'
                    >
                      {roles.map(role => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ mb: 1, pr: 2 }} item xs={12} sm={6}>
                  <FormControlLabel
                    checked={isAdmin}
                    control={<Switch color='primary' />}
                    label='Is Administrator'
                    labelPlacement='start'
                    onChange={switchHandler}
                  />
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
                    error={Boolean(emNameErrors?.emName)}
                    helperText={emNameErrors?.emName}
                    placeholder='Rediet Demisse'
                    onChange={handleEmNameChange}
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
                    error={Boolean(emPhoneErrors?.emPhone)}
                    helperText={emPhoneErrors?.emPhone}
                    onChange={handleEmPhoneChange}
                    placeholder='+251 987654321'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Phone />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
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
                      value={city}
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
                      value={woreda}
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
                      value={subCity}
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
                      value={kebelle}
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
                      value={street}
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
                      value={houseNo}
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
                      value={zone}
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
                    onClick={registerEmployee}
                  >
                    Register
                  </Button>
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Card>
  )
}
