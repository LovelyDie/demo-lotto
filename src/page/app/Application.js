import MainLayout from '../../layout/MainLayout'
import { axios } from '../../config/AxiosConfig'
import { Button, Card } from '@material-ui/core'
import { getIdFromCookie } from '../../helper/AuthUtil'
import { useState } from 'react'

const Application = () => {
    const id = getIdFromCookie()
    const [result, setResult] = useState(null)

    const onClickChoose = async (value) => {
        try {
            const user = await axios.get(`/play/player/${id}`)
            const {data} = await axios.post('/play/single', {
                playerOne: {...user.data},
                playerOneChoice: value
            })
            setResult(data)
        } catch (e) {

        }
    }

    return (
        <MainLayout>
            <Card variant="outlined" style={{fontSize: '25px'}}>
                <p className="ml-3">PLAYER TWO CHOOSE : {result && result.playerTwoChoice}</p>
            </Card>
            <div className={`text-center ${result ? 'text-success' : 'text-danger'} my-3`} style={{fontSize: '50px'}}>
                {result ? `RESULT : ${result.result}` : 'VS'}
            </div>
            <Card variant="outlined" style={{fontSize: '25px'}}>
                <p className="ml-3">PLAYER TWO CHOOSE : {result && result.playerOneChoice}</p>
            </Card>
            <Card variant="outlined">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => onClickChoose('ROCK')}
                    >
                        ROCK
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => onClickChoose('PAPER')}
                    >
                        PAPER
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => onClickChoose('SCISSORS')}
                    >
                        SCISSORS
                    </Button>
                </div>
            </Card>
        </MainLayout>
    )
}
export default Application