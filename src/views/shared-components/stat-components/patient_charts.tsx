import React, { useState, Component, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import useSWR from 'swr'
import { useTheme } from '@emotion/react';
import { ApexOptions } from 'apexcharts';
import requests from 'src/utils/repository';
import { useSession } from 'next-auth/react';
import { Grid } from '@mui/material';

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())


export default function ChartOne() {
  const [data, setData] = useState();
 const { data: session } = useSession()
useEffect(() => {
    requests.get(`/researcher/patientRecord`, session ? session.accessToken.toString() : '').then(response => {
      setData(response.data)
    })
  },[])



  // if (error) return <div>Failed to load</div>
  if (!data) return <div> </div>


  const theme = useTheme();

  const chartDataOne: ApexOptions = {
    chart: {
      type: "line",
      id: ""
    },
    xaxis: {
      categories: ["infant (0-1)", "toddler (2-4)", "child (5-12)", "teen (13-19)", "adult (20-39)", "middle age (40 -59)", "senior (60+)"]
    },
    colors: ['#56ca00'],
    fill: {
      type: "solid",

    },
    legend: {
      // position: '',
      width: 400
      // position: 'top',
    },
    title: {
      text: 'Patient Record By age',
      floating: true,
      align: 'center',
      style: {
        color: '#444'
      }
    },
    series: [
      {
        name: "Patient Record By age",
        type: "column",
            data: [data['infant'], data['toddler'], data['child'],
                data['teen'], data['adult'], data['middle_age_adult'], data['senior_adult']]
      }
    ]
  };


    const chartDataTwo: ApexOptions = {
    chart: {
      type: "line",
      id: ""
    },
    xaxis: {
      categories: ["male", "female"]
      },
    colors:['#56ca00'],
    fill: {
      type: "solid",

    },
    legend: {
      // position: '',
      width: 400,
      position: 'top',
      title:'Patient Record By Gender'
      },
    title: {
      text: 'Patient Record By Gender',
      floating: true,
      align: 'center',
      style: {
        color: '#444'
      }
    },
    series: [
      {
        name: "Patient Record By Gender",
        type: "column",
        data: [data['male'], data['female']]
      }
    ]
  };



    return (

      <div>
        <Grid container spacing={2}>
          <Grid item  xs={12} md={6} sm={12} >
            <ReactApexChart options={chartDataOne} series={chartDataOne.series} type="bar" width='500px' />
          </Grid>
          <Grid item  xs={12} md={6} sm={12} >
            <ReactApexChart options={chartDataTwo} series={chartDataTwo.series} type="bar" width='500px' />
          </Grid>
        </Grid>
      </div>
    )
};
