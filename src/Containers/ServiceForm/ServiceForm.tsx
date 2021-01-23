import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { schema, noPhoneSchema } from './schema'
import { postAd, FormAd } from '../../Redux/adsSlice'
import { termsContent } from '../../Components/Footer/Footer'
import { RootState } from '../../Redux/store'
import { useFadeIn } from '../../utils/utils'
import { animated } from 'react-spring'
import FormSelect from '../../Components/Form/FormSelect/FormSelect'
import FormField from '../../Components/Form/FormField/FormField'
import Container from 'react-bootstrap/Container'
import FormDate from '../../Components/Form/FormDate/FormDate'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import FormB from 'react-bootstrap/Form'
import Title from '../../Components/Title/Title'
import Modal from '../../Components/Modal/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormTextarea from '../../Components/Form/FormTextarea/FormTextarea'
import FormCheckbox from '../../Components/Form/FormCheckbox/FormCheckbox'

export const cities = [
  'София',
  'Благоевград',
  'Бургас',
  'Варна',
  'Велико Търново',
  'Видин',
  'Враца ',
  'Габрово',
  'Добрич',
  'Кърджали',
  'Кюстендил',
  'Ловеч',
  'Монтана',
  'Пазарджик',
  'Плевен',
  'Перник',
  'Пловдив',
  'Разград',
  'Русе',
  'Силистра',
  'Сливен',
  'Смолян',
  'Стара Загора',
  'Търговище',
  'Хасково',
  'Шумен',
  'Ямбол',
] as const

export type City = typeof cities[number]

export type FormValues = FormAd & { terms: boolean }

const initialValues: FormValues = {
  city: cities[0],
  title: '',
  district: '',
  terms: false,
  price: 0,
  phone: '',
  info: '',
}

const ServiceForm = () => {
  const dispatch = useDispatch()
  const loading = useSelector<RootState, boolean>((state) => state.ads.loading)
  const token = useSelector<RootState, null | string>((state) => state.profile.token)
  const phone = useSelector<RootState, null | string>((state) => state.profile.phone)
  const id = useSelector<RootState, null | string>((state) => state.profile.userId)
  const fadeIn = useFadeIn()
  const [content, setContent] = useState('')
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())

  const handleTermsClick = () => {
    setTitle('Общи Условия и Политика за поверителност')
    setContent(termsContent)
    setModal(true)
  }

  const handleSumbit = (values: FormValues) => {
    setTitle('Готово')
    setContent('Обявата Ви скоро ще бъде разгледана и публикувана!')
    setModal(true)
    const ad: FormAd & { date: Date } = {
      ...values,
      date,
      authorId: id,
      phone: phone || values.phone,
    }
    if (id && token) {
      const user = { id, token }
      dispatch(postAd({ ad, user }))
    } else {
      dispatch(postAd({ ad, user: null }))
    }
  }

  return (
    <Container fluid="xl" className="pt-5 flex-grow-1">
      <animated.div style={fadeIn}>
        <Modal
          title={title}
          show={modal}
          onClose={() => setModal(false)}
          content={content}
          backButton={true}
        />
        <Title title="Попълнете следните данни:" />
        <Formik
          validationSchema={phone ? noPhoneSchema : schema}
          onSubmit={handleSumbit}
          initialValues={initialValues}
        >
          {({ handleChange, handleBlur, values, touched, isValid, errors, dirty }) => (
            <Form>
              <FormB.Row>
                <FormDate label="Кога" date={date} onDateChange={(date) => setDate(date)} />
                <FormSelect
                  label="Къде"
                  id="city"
                  onChange={handleChange}
                  values={cities}
                  value={values.city}
                />
                <FormField
                  name="district"
                  label="Район"
                  type="text"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  id="district"
                  placeholder="напр. Люлин 8"
                />
                <FormField
                  name="title"
                  label="Услуга"
                  type="text"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  id="title"
                  placeholder="напр. почистване на дом"
                />
                <FormField
                  name="price"
                  label="Колко сте готови да заплатите?"
                  type="number"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  name="phone"
                  label="Телефон за връзка"
                  type="tel"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  disabled={!!phone}
                  value={phone || values.phone}
                />
              </FormB.Row>
              <FormTextarea id="info" label="Допълнителна информация" onChange={handleChange} />
              <FormCheckbox
                id="terms"
                label="Съгласен съм с"
                link="Общите Условия и Политиказа за Поверителност"
                errors={errors}
                onLinkClick={handleTermsClick}
                onChange={handleChange}
              />
              <Row>
                <Col xs={12} md={3} className="mb-3">
                  {loading ? (
                    <Button variant="primary" disabled block>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" disabled={!(isValid && dirty)} block>
                      Публикувай
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </animated.div>
    </Container>
  )
}

export default ServiceForm
