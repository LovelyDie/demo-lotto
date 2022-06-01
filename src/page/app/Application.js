import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { axios } from '../../config/AxiosConfig'
import { Button, Card } from '@material-ui/core'
import Paper from '../../asset/img/paper.png'
import Rock from '../../asset/img/rock.png'
import Scissors from '../../asset/img/scissors.png'
import { getIdFromCookie, getNameFromCookie } from '../../helper/AuthUtil'
import { mapButtonImage } from '../../helper/Util'

const Application = () => {
    const id = getIdFromCookie()
    const name = getNameFromCookie()
    const [result, setResult] = useState(null)

    const onClickChoose = async (value) => {
        try {
            const {data} = await axios.post('/play/single', {
                playerOne: {
                    id: id,
                    name: name
                },
                playerOneChoice: value
            })
            setResult(data)
        } catch (e) {
            //handle in interceptor
        }
    }

    return (
        <MainLayout>
            <Card variant="outlined" style={{fontSize: '25px'}}>
                <p className="ml-3">PLAYER TWO CHOOSE :</p>
                <div className="text-center rotateimg180">{result && mapButtonImage(result.playerTwoChoice)}</div>
            </Card>
            <div className={`text-center ${result ? 'text-success' : 'text-danger'} my-3`} style={{fontSize: '50px'}}>
                {result ? `RESULT : ${result.result}` : 'VS'}
            </div>
            <Card variant="outlined" style={{fontSize: '25px'}}>
                <div className="text-center">{result && mapButtonImage(result.playerOneChoice)}</div>
                <p className="ml-3">PLAYER ONE CHOOSE :</p>
            </Card>
            <Card variant="outlined">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => onClickChoose('ROCK')}
                    >
                        <img src={Rock} style={{width: '200px'}}/>
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => onClickChoose('PAPER')}
                    >
                        <img src={Paper} style={{width: '200px'}}/>
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => onClickChoose('SCISSORS')}
                    >
                        <img src={Scissors} style={{width: '200px'}}/>
                    </Button>
                </div>
            </Card>
        </MainLayout>
    )
}
export default Application