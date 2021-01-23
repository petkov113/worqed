import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../Redux/store'
import { Formik, Form } from 'formik'
import { Container } from 'react-bootstrap'
import { useFadeIn } from '../../utils/utils'
import { animated } from 'react-spring'
import { auth } from '../../Redux/profileSlice'
import FormField from '../../Components/Form/FormField/FormField'
import * as Yup from 'yup'
import Button from 'react-bootstrap/Button'
import Loader from '../../Components/Loader/Loader'
import Col from 'react-bootstrap/Col'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Пощата не е валидна').required('Полето е задължително'),
  password: Yup.string()
    .min(6, 'Паролът трябва да съдържа поне 6 символа')
    .required('Полето е задължително'),
})

const initialValues = {
  email: '',
  password: '',
}

export type AuthFormValues = typeof initialValues

const Auth = () => {
  const loading = useSelector<RootState, boolean>((state) => state.profile.loading)
  const dispatch: AppDispatch = useDispatch()
  const fadeIn = useFadeIn()
  return (
    <Container fluid="xl" className="flex-grow-1">
      <animated.div style={fadeIn}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setStatus, setSubmitting }) =>
            dispatch(auth({ values, setStatus, setSubmitting, isLogin: true }))
          }
          validationSchema={validationSchema}
        >
          {({
            errors,
            values,
            dirty,
            setStatus,
            setSubmitting,
            isValid,
            status,
            handleBlur,
            handleChange,
            touched,
          }) => (
            <Form className="row-6 mt-5">
              <FormField
                label="Поща"
                type="email"
                name="email"
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
                size={6}
              />
              <FormField
                label="Парола"
                type="password"
                name="password"
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
                size={6}
              />
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Col xs={12} md={6} className="mb-3 mx-auto mt-4">
                    <Button type="submit" variant="primary" disabled={!(isValid && dirty)} block>
                      Влез
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className="mb-3 mx-auto">
                    <Button
                      variant="secondary"
                      disabled={!(isValid && dirty)}
                      block
                      onClick={() =>
                        dispatch(auth({ values, setStatus, setSubmitting, isLogin: false }))
                      }
                    >
                      Регистрирай
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className="mb-3 text-center mx-auto">
                    {status && <span>{status.generall}</span>}
                  </Col>
                </>
              )}
            </Form>
          )}
        </Formik>
      </animated.div>
    </Container>
  )
}

export default Auth
