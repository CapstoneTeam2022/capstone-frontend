import { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button, Typography, Chip } from '@mui/material'
import LabResultFrom from './form-components/LabResultForm'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import requests from 'src/utils/repository'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


// import Magnify from 'mdi-material-ui/Magnify'
// import InputAdornment from '@mui/material/InputAdornment'

const ResultView = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = (param: any) => {
    // console.log(req)
    console.log(param)
    setCurrentInvReq(param)
    setOpen(true)
  }
  const { data: session } = useSession();

  const handleClickClose = () => setOpen(false)
  const router = useRouter()
  const [currentInvReq, setCurrentInvReq] = useState()
  const handleViewClick = () => {
    console.log("id", currentInvReq)
    router.push({pathname: '/patient/view/results/list/',
    query: {
      currId: currentInvReq
    }})
  }
  const [invReqs, setInvReqs] = useState([
    ])

  useEffect(() => {
    requests.post(`/investigation-request/doctor`,{},  session ? session.accessToken.toString() : "").then(response => {
      console.log(response.data)
      setInvReqs(response.data)
    })
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
      field: 'note',
      headerName: 'Note',
      width: 450,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      type: 'number',
      width: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <p> {new Date(params.value).toLocaleDateString("en-US")}</p>
      )
    },
    {
      field: 'remainingTests',
      headerName: 'Number of Tests',
      type: 'number',
      width: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams<Array<any>>) => (
        <Chip color='primary' label={params.value} sx={{px: 5}}/>
      )
    },
    {
      field: 'Action',
      headerName: 'Action',
      description: '',
      sortable: false,
      width: 160,
      renderCell: () => (
        <strong>
          <Button onClick={handleViewClick} variant='outlined' color='primary' size='small' style={{ marginLeft: 16 }}>
            View Results
          </Button>
        </strong>
      )
    }
  ]

  return (
    <div>
      <Typography variant='h5' sx={{ marginLeft: 2, marginBottom: 4 }}>
        Investigative Requests
      </Typography>
      <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={invReqs}
          columns={columns}
          pageSize={5}
          onCellClick={(params) => {
            console.log(params.row)
            handleClickOpen(params.row)
          }}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={newSelectionModel => {
            console.log(
              'new',
              Number(newSelectionModel[0]),
              invReqs.find(i => i.id === newSelectionModel[0])
            )

            setCurrentInvReq(Number(newSelectionModel[0]))
          }}
          selectionModel={currentInvReq}

        />
      </div>

    </div>
  )
}

export default ResultView
