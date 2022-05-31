import MainLayout from '../../layout/MainLayout'
import { axios } from '../../config/AxiosConfig'
import { Button } from '@material-ui/core'
import { getIdFromCookie } from '../../helper/AuthUtil'

const Application = () => {
    const id = getIdFromCookie()

    const onClickChoose = async (value) => {
        try {
            const user = await axios.get(`/play/player/${id}`)
            const {data} = await axios.post('/play/single', {
                playerOne: {...user.data},
                playerOneChoice: value
            })
            console.log(data)
        } catch (e) {

        }
    }

    return (
        <MainLayout>
            <div>
                
            </div>
            <Button variant="outlined" onClick={onClickChoose}>TEST</Button>
        </MainLayout>
    )
}
export default Application