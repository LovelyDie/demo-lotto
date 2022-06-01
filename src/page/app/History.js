import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { axios } from '../../config/AxiosConfig'
import { getIdFromCookie } from '../../helper/AuthUtil'
import { Card, CardContent, Grid, Paper, styled, Typography } from '@material-ui/core'
import Rock from '../../asset/img/rock.png'
import Scissors from '../../asset/img/scissors.png'
import PaperImg from '../../asset/img/paper.png'
import NoChoice from '../../asset/img/noChoice.png'

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    minWidth: '40%',
    color: theme.palette.text.secondary,
}))

const History = () => {
    const id = getIdFromCookie()
    const [historyList, setHistoryList] = useState(null)

    useEffect(() => {
        id && fetchHistory()
    }, [])

    const mapImage = (value) => {
        if (value === 'ROCK') {
            return <img width={100} src={Rock} alt="Rock"/>
        } else if (value === 'PAPER') {
            return <img width={100} src={PaperImg} alt="Paper"/>
        } else if (value === 'SCISSORS') {
            return <img width={100} src={Scissors} alt="Scissors"/>
        } else {
            return <img src={NoChoice} alt="No Choice" width={100}/>
        }
    }

    const fetchHistory = async () => {
        try {
            const {data} = await axios.get(`/play/match/history/${id}`)
            setHistoryList(data)
        } catch (e) {
            setHistoryList(null)
            // handle in interceptor
        }

    }

    return (
        <MainLayout>
            {historyList &&
                historyList.map(value =>
                    <Card variant="outlined" className="mb-3">
                        <CardContent className="text-center">
                            <Typography sx={{fontSize: 14}} gutterBottom>
                                MATCH #{value.id}
                            </Typography>
                            <Typography variant="h5" className="text-success mb-2" component="div">
                                RESULT : {value.result || 'No Result Yet'}
                            </Typography>
                            <Grid
                                container
                                spacing={2}
                                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                            >
                                <Item>
                                    <Typography color="textPrimary">
                                        PLAYER ONE
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="textSecondary">
                                        Name : {value.playerOne.name || ''}
                                        <br/>
                                        {mapImage(value.playerOneChoice)}
                                    </Typography>
                                </Item>
                                <Item>
                                    <Typography color="textPrimary">
                                        PLAYER Two
                                    </Typography>
                                    <Typography
                                        sx={{mb: 1.5}}
                                        color="textSecondary"
                                        className={!value.playerTwo && 'text-danger'}
                                    >
                                        Name : {value.playerTwo ? value.playerTwo.name : 'No Player Yet'}
                                        <br/>
                                        {mapImage(value.playerTwoChoice)}
                                    </Typography>
                                </Item>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            }
        </MainLayout>
    )
}
export default History