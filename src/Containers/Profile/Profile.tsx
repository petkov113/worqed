import React, { useState } from 'react'
import { Switch, Route, NavLink, HashRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Ad, getUserAds, deleteAd } from '../../Redux/adsSlice'
import { updateName, updatePhone } from '../../Redux/profileSlice'
import { RootState } from '../../Redux/store'
import DialogModal from '../../Components/Modal/DialogModal'
import Container from 'react-bootstrap/Container'
import Settings from './Settings'
import UserAds from './UserAds'
import Loader from '../../Components/Loader/Loader'
import Nav from 'react-bootstrap/Nav'

const Profile = () => {
  const dispatch = useDispatch()
  const defaultPhone = useSelector<RootState, null | string>((state) => state.profile.phone)
  const defaultName = useSelector<RootState, null | string>((state) => state.profile.name)
  const loading = useSelector<RootState, boolean>((state) => state.ads.loading)
  const token = useSelector<RootState, string>((state) => state.profile.token!)
  const ads = useSelector<RootState, null | Ad[]>((state) => state.ads.ads)
  const id = useSelector<RootState, string>((state) => state.profile.userId!)
  const [modal, setModal] = useState(false)
  const [phone, setPhone] = useState(defaultPhone || '')
  const [name, setName] = useState(defaultName || '')
  const [ad, setAd] = useState<null | string>(null)
  const user = { id, token }

  const handleClick = () => {
    dispatch(getUserAds(user))
  }

  const handleAdDeletion = (adId: string) => {
    dispatch(deleteAd({ adId, user }))
    setModal(false)
  }

  const confirm = (adId: string) => {
    setAd(adId)
    setModal(true)
  }

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name':
        if (name !== defaultName) dispatch(updateName({ name, user }))
        else setName(defaultName || '')
        break
      case 'phone':
        if (/^[0-9]{0,9}$/.test(phone)) {
          alert('Телефонът не може да съдържа по-малко от 10 цифри')
          setPhone(defaultPhone || '')
        } else if (phone && phone !== defaultPhone) {
          dispatch(updatePhone({ phone, user }))
        } else setPhone(defaultPhone || '')
        break
      default:
        break
    }
  }

  const handlePhoneChange = (phone: string) => {
    if (/^[0-9]{1,10}$/.test(phone)) {
      setPhone(phone)
    }
  }

  return (
    <HashRouter hashType='noslash'>
      <Container fluid='xl' className='flex-grow-1'>
        <DialogModal
          show={modal}
          title='Сигурни ли сте?'
          onClose={() => setModal(false)}
          onSubmit={() => handleAdDeletion(ad!)}
        />
        <Nav variant='tabs' className='mt-2 mb-4'>
          <Nav.Item>
            <NavLink to='/settings' className='nav-link'>
              Настройки
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to='/userads' className='nav-link' onClick={handleClick}>
              Моите обяви
            </NavLink>
          </Nav.Item>
        </Nav>
        {loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route
              path='/settings'
              exact
              render={() => (
                <Settings
                  nameValue={name}
                  phoneValue={phone}
                  onNameChange={(name) => setName(name)}
                  onPhoneChange={handlePhoneChange}
                  onBlur={handleFieldBlur}
                />
              )}
              key='settings'
            />
            ,
            <Route
              path='/userads'
              render={() => <UserAds ads={ads} onDelete={confirm} />}
              key='userads'
            />
          </Switch>
        )}
      </Container>
    </HashRouter>
  )
}

export default Profile
