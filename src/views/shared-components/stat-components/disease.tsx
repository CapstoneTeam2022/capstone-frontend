import React, { useState, Component, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import axios from 'axios';
import requests from 'src/utils/repository';
import { useSession } from 'next-auth/react';
import { CardContent } from '@mui/material';

// "deserunt deserunt ipsa corporis voluptates dolore aut dolores assumenda unde"

export default function ChartSeven(props: any) {
    const [data, setData] = useState();
     const { data: session } = useSession()
    useEffect(() => {

        const body = {
             healthCenter: "All",
            disease: props.data.disease,
            startAgeGroup: props.data.startAgeGroup,
            endAgeGroup: props.data.endAgeGroup,
            gender: props.data.gender
        }

        requests.post('researcher/disease',body,session ? session.accessToken.toString() : '')
            .then(function (response) {
                //   console.log(response.data);
                setData(response.data)

            })

    }, []);

  if (!data) return <div></div>
    const h = data['total_diagnoses'];

const option_disease = { labels: ["Total Diagnosis", "Patients with the disease"] };
const series_disease = [data['total_diagnoses'], data['diseased_patient_count']];

const option_age = {labels:["Total Patients with the disease", "Patients with in the age group"]}
const series_age = [data['diseased_patient_count'], data['by_age']];

const option_gender = {labels:['Total Patients with in the age group', 'Patients with the specified gender']}
const series_gender = [data['by_age'], data['by_gender']];
    return (

        <CardContent>
        <ReactApexChart options={option_disease}  series={series_disease} type='pie' width='400px' />
        {data['by_age'] ? <ReactApexChart options={option_age} series={series_age} type='pie' width='430px' /> : <div></div>}
        {data['by_gender'] ? <ReactApexChart options={option_gender} series={series_gender} type='pie' width='450px' /> : <div></div>}
       </CardContent>
    )
};
