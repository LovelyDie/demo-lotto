import PublicLayout from '../../layout/PublicLayout'
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { axios } from '../../config/AxiosConfig'

const Register = () => {
    const navigate = useNavigate()
    const formValidator = Yup.object().shape({
        username: Yup.string()
            .required('Please enter your username'),
        password: Yup.string()
            .required('Please enter your password')
            .min(8, 'minimum length is 8 characters')
    })

    const onClickRegister = async (value) => {
        try {
            await axios.post('/public/register', {
                name: value.username,
                password: value.password
            })
            navigate('/login')
        } catch (e) {
            //handle in interceptor
        }
    }

    return (
        <PublicLayout>
            <div className="text-center p-5" style={{display: 'block'}}>
                <Formik
                    initialValues={{username: '', password: ''}}
                    validationSchema={formValidator}
                    onSubmit={onClickRegister}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleSubmit,
                          handleChange
                      }) => (
                        <Form onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
                            <h1>REGISTER</h1>
                            <TextField
                                name="username"
                                placeholder="Enter Username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange}
                                variant="outlined"
                                className="mb-3"
                                fullWidth
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                            />
                            <TextField
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                label="Password"
                                variant="outlined"
                                className="mb-3"
                                fullWidth
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                className="mb-3"
                                fullWidth
                                type="submit"
                            >
                                REGISTER
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                className="mb-3"
                                fullWidth
                                onClick={() => navigate('/login')}
                            >
                                CANCEL
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </PublicLayout>
    )
}
export default Register