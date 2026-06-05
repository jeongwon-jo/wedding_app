import Calendar from '@components/sections/Calendar'
import Heading from '@components/sections/Heading'
import ImageGallery from '@components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/Invitation'
import Video from '@components/sections/Video'
import { Wedding } from '@models/wedding'
import FullScreenMessage from '@shared/FullScreenMessage'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import Map from './components/sections/Map'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 1. wedding 데이터 호출
  useEffect(() => {
    // 비동기 방법: callback, promise, async/await
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log('에러발생', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (wedding == null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  if (loading) {
    return <FullScreenMessage type="loading" />
  }
  if (error) {
    return <FullScreenMessage type="error" />
  } else {
    return (
      <div className={cx('wrap')}>
        <div className={cx('container')}>
          <Heading date={date} />
          <Video />
          <Intro
            groomName={groom.name}
            brideName={bride.name}
            locationName={location.name}
            date={date}
            message={intro}
          />
          <Invitation message={invitation} />
          <ImageGallery images={galleryImages} />
          <Calendar date={date} />
          <Map location={location} />
        </div>
      </div>
    )
  }
}

export default App
