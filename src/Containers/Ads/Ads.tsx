import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, ChangeEvent, useState } from 'react'
import { cities, City } from '../ServiceForm/ServiceForm'
import { getAds, Ad } from '../../Redux/adsSlice'
import { RootState } from '../../Redux/store'
import ButtonGroup from '../../Components/ButtonGroup/ButtonGroup'
import FormSelect from '../../Components/Form/FormSelect/FormSelect'
import Container from 'react-bootstrap/Container'
import Loader from '../../Components/Loader/Loader'
import Card from '../../Components/Card/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// const handleScroll = () => {
//   const pageHeight = Math.max(
//     document.body.scrollHeight,
//     document.documentElement.scrollHeight,
//     document.body.offsetHeight,
//     document.documentElement.offsetHeight,
//     document.body.clientHeight,
//     document.documentElement.clientHeight
//   )
//   const windowHeight = document.documentElement.clientHeight
//   const scrollTop = document.documentElement.scrollTop

//   if (pageHeight - scrollTop - 50 <= windowHeight) {
//   }
// }

export enum Sort {
  PRICE_UP = 'priceUp',
  PRICE_DOWN = 'priceDown',
  DATE = 'date',
}

const Ads = () => {
  const dispatch = useDispatch()
  const ads = useSelector<RootState, Ad[] | null>((state) => state.ads.ads)
  const loading = useSelector<RootState, boolean>((state) => state.ads.loading)
  const [city, setCity] = useState<City | undefined>(undefined)
  const [sorting, setSorting] = useState<null | Sort>(null)
  const [sortedAds, setSortedAds] = useState(ads)

  useEffect(() => {
    dispatch(getAds())
  }, [dispatch])

  useEffect(() => {
    setSortedAds(ads)
  }, [ads])

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value as City | 'all'
    if (city !== 'all') {
      setCity(city)
      dispatch(getAds(city))
      setSorting(null)
    } else {
      setCity(undefined)
      dispatch(getAds())
      setSorting(null)
    }
  }

  const sort = (criteria: Sort) => {
    setSorting(criteria)
    if (sortedAds && sortedAds.length > 1) {
      switch (criteria) {
        case Sort.DATE:
          setSortedAds(
            [...sortedAds].sort((a, b) => (new Date(a.date) as any) - (new Date(b.date) as any))
          )
          break
        case Sort.PRICE_UP:
          setSortedAds([...sortedAds].sort((a, b) => a.price - b.price))
          break
        case Sort.PRICE_DOWN:
          setSortedAds([...sortedAds].sort((a, b) => b.price - a.price))
          break
        default:
          break
      }
    }
  }

  // PAGINATION FOR THE FUTURE DEVELOPMENT
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <Container fluid="xl" className="pt-3 flex-grow-1">
      <Row className="justify-content-between">
        <FormSelect
          label="Избиране на град"
          values={cities}
          id="city"
          onChange={handleCityChange}
          value={city}
          blank
        />
        <ButtonGroup
          label="Сортирай по:"
          buttons={[
            { name: 'Цена ⬆', value: Sort.PRICE_UP },
            { name: 'Цена ⬇', value: Sort.PRICE_DOWN },
            { name: 'Дата', value: Sort.DATE },
          ]}
          value={sorting}
          onChange={(e) => sort(e.target.value as Sort)}
        />
      </Row>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <Row className="pt-3">
          {sortedAds && sortedAds.length > 0 ? (
            sortedAds.map((ad, index) => (
              <Col sm={12} md={6} lg={4} className="mb-4" key={index}>
                <Card
                  title={ad.title}
                  city={ad.city}
                  id={ad.id}
                  phone={ad.phone}
                  info={ad.info}
                  district={ad.district}
                  price={ad.price}
                  date={ad.date}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">Няма намерени обяви</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  )
}

export default Ads
