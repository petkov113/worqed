import * as yup from 'yup'

const city = yup.string().required()
const district = yup
  .string()
  .required('Моля, въведете район')
  .min(3, 'Районът не може да съдържа по малко от 3 символа')

const title = yup
  .string()
  .required('Моля, въведете вид на услуга')
  .min(10, 'Полето трябва да съдържа поне 10 символа')

const price = yup.number().required('Моля, въведете цена').moreThan(0, 'Цената не може да е нула')

const terms = yup.bool().oneOf([true])

export const schema = yup.object({
  city,
  district,
  title,
  price,
  phone: yup
    .string()
    .required('Полето е задължително')
    .matches(
      /\b[0-9]{10}\b/,
      'Номерът не може да е по-малък или по-голям от 10 цифри и да съдържа букви'
    ),
  terms,
})

export const noPhoneSchema = yup.object({
  city,
  district,
  title,
  price,
  terms,
})
