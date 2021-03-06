import React, { useState, Component, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import axios from 'axios';
import { useTheme } from '@emotion/react';
import requests from 'src/utils/repository'

import { useSession } from 'next-auth/react'
import { Grid } from '@mui/material';


export default function ChartNine(props: { email: any; }) {
  const [data, setData] = useState();
   const { data: session } = useSession()
  useEffect(() => {
    const body = {
       email: props.email
    }
    requests.post('researcher/healthcenter',body,session ? session.accessToken.toString() : '')
    .then(function (response) {
                  console.log(response.data);
                setData(response.data)

            })

  }, []);





  if (!data) return <div> </div>
    const h = data['user_count'];

const theme = useTheme();

  const chartDataOne = {
    chart: {
      type: "line",
      id: ""
    },
    xaxis: {
        categories: ["receptionists", "radiologists", "doctors", "nurses", "system admins", "hosptial admins", "lab experts", "researchers"],
      },
      colors: ['#56ca00'],
    title: {
      text: 'Users Record By Role in ' + JSON.stringify(data['hospital_name']),
      floating: true,
      align: 'center',
      style: {
        color: '#444'
      }
    },
      fill: {

        type: "solid",

    },
    legend: {
      // position: '',
      width: 400
      // position: 'top',
    },
    series: [
      {
        name: "User Record By Role",
            type: "column",
            data: [data['receptionist'], data['radiologist'], data['doctor'],
                data['nurse'], data['system_admin'], data['hospital_admin'], data['lab_technican'],
            data['researcher']]
      }
    ]
  };


     const chartDataTwo = {
    chart: {
      type: "line",
      id: ""
    },
    xaxis: {
      categories: ["male", "female"]
        },
    title: {
      text: 'Users Record By Gender in ' + JSON.stringify(data['hospital_name']),
      floating: true,
      align: 'center',
      style: {
        color: '#444'
      }
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
    series: [
      {
        name: "User Record By Gender",
        type: "column",
            data: [data['male'], data['female']]
      }
    ]
  };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <ReactApexChart options={chartDataOne} series={chartDataOne.series} type="bar"  width='500px' />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ReactApexChart options={chartDataTwo} series={chartDataTwo.series} type="bar" width='500px' />
          </Grid>
        </Grid>

      </div>
)


};
