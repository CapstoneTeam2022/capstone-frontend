// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'



const vitalCategories = [
  {
    name: 'Heart Rate',
    value: '117',
    field: 'pulse',
    measuredBy: '/87',
    image: '/images/heart.png'
  },
  {
    name: 'Fever',
    value: '40',
    field: 'temperature',
    measuredBy: 'c',
    image: '/images/fever.png'
  },
  {
    name: 'Blood Pressure',
    field: 'bloodPressure',
    value: '75',
    measuredBy: '/123',
    image: '/images/bp.jpg'
  },
  {
    name: 'Weight',
    value: '123',
    field: 'weight',
    measuredBy: 'c',
    image: '/images/weight.jpg'
  },
  {
    name: 'SpO2 levels',
    value: '20',
    field: 'spo2Level',
    measuredBy: '.3',
    image: '/images/bmi.jpg'
  },
  {
    name: 'Respiratory Rate',
    value: '20',
    field: 'respiratoryRate',
    measuredBy: '.3',
    image: '/images/bmi.jpg'
  }
]

const PatientVitals = (props) => {
  return (
    <Grid container >
  {vitalCategories.map((category) => {
    const fi = category.field
return (
      <Grid
      key={props.vital.name}
                xs={3} item sx={{ backgroundColor: 'white', borderRadius: 1, px: 2, margin:1}}>
                <Grid item xs={12}>
                <Typography sx={{  my: 3, display: 'block' }} variant='subtitle1'>
                      {category.name}
                    </Typography>
                  </Grid>
                  <Grid container xs={12}>
                  <Grid item xs={6}>
                    <img src={category.image} alt='heart rate' height={70} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ display: 'inline' }} variant='h4'>
                      {props.vital[fi]}
                      <Typography sx={{ display: 'inline' }} variant='subtitle1'>
                        {props.vital.measuredBy}
                      </Typography>
                    </Typography>
                  </Grid>
                  </Grid>

                </Grid>
)
              })}
</Grid>
  )


}

export default PatientVitals
