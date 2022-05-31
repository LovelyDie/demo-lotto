import { Card, Container, CssBaseline } from '@material-ui/core'
import LoginBG from '../asset/img/giphy.gif'

const PublicLayout = ({children}) => {
    return (
        <Container
            style={{
                height: '100vh',
                background: `url(${LoginBG}) center`,
                overflow: 'auto',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            maxWidth
        >
            <CssBaseline/>
            <Card
                style={{
                    height: '50%',
                    width: '50%',
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                }}
            >
                {children}
            </Card>
        </Container>
    )
}

export default PublicLayout