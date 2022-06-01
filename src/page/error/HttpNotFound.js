import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error'
import { Button, CssBaseline } from '@material-ui/core'

const HttpNotFound = () => {
    const history = useNavigate()

    return (
        <div
            style={{
                width: '100%',
                height: '90vh',
                position: 'relative',
                textAlign: 'center'
            }}
        >
            <CssBaseline/>
            <div
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '37%',
                }}
            >
                <ErrorIcon style={{fontSize: '100px'}} className="text-danger"/>
                <h1>ไม่พบหน้าที่ท่านกำลังค้นหา</h1>
                <pre>
                    หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถเข้าถึงได้ชั่วคราว
                </pre>
                <Button
                    onClick={() => history('/application')}
                    variant="contained"
                    color="primary"
                >
                    HOME
                </Button>
            </div>
        </div>
    )
}

export default HttpNotFound