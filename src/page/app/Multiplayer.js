import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { Button, Card, TextField } from '@material-ui/core'
import { mapButtonImage } from '../../helper/Util'
import Rock from '../../asset/img/rock.png'
import Paper from '../../asset/img/paper.png'
import Scissors from '../../asset/img/scissors.png'
import { getIdFromCookie, getNameFromCookie } from '../../helper/AuthUtil'
import { axios } from '../../config/AxiosConfig'


const Multiplayer = () => {
    const id = getIdFromCookie()
    const name = getNameFromCookie()
    const [matchId, setMatchId] = useState('')
    const [result, setResult] = useState(null)

    const onClickChoose = async (value) => {
        try {
            const {data} = await axios.post('/play/multiplayer', {
                matchId: matchId,
                playerOne: matchId ? null : {
                    id: id,
                    name: name,
                },
                playerOneChoice: matchId ? null : value,
                playerTwo: matchId ? {
                    id: id,
                    name: name,
                } : null,
                playerTwoChoice: matchId ? value : null
            })
            console.log(data)
            setResult(data)
        } catch (e) {
            //handle in interceptor
        }
    }

    return (
        <MainLayout>
            <TextField
                value={matchId}
                type="number"
                className="mb-3"
                onChange={(e) => {
                    setMatchId(e.target.value)
                }}
                variant="outlined"
                fullWidth
            />
            <Card variant="outlined" style={{fontSize: '25px'}}>
                <p className="ml-3">PLAYER TWO CHOOSE :</p>
                <div
                    className={`text-center text-danger ${result && result.playerTwoChoice && 'rotateimg180'}`}
                >
                    {result && mapButtonImage(result.playerTwoChoice)}
                </div>
            </Card>
            <div className={`text-center ${result ? 'text-success' : 'text-danger'} my-3`} style={{fontSize: '50px'}}>
                {result ? `RESULT : ${result.result || 'No Result Yet'}` : 'VS'}
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
export default Multiplayer