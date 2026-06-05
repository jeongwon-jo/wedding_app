import { Location } from '@/models/wedding'
import Section from '@shared/Section'
import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import styles from './Map.module.scss'

declare global {
  interface Window {
    naver: any
  }
}

const cx = classNames.bind(styles)

function Map({ location }: { location: Location }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      const position = new window.naver.maps.LatLng(location.lat, location.lng)
      const map = new window.naver.maps.Map(mapContainer.current, {
        center: position,
        zoom: 16,
      })
      new window.naver.maps.Marker({ position, map })
    }
  }, [location.lat, location.lng])

  return (
    <Section
      className={cx('contents__map')}
      title={
        <div className={cx('map_header')}>
          <span className={cx('map-title')}>오시는길</span>
          <span className={cx('map-name')}>{location.name}</span>
          <span className={cx('map-address')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('map_wrap')}>
        <div ref={mapContainer} className={cx('map')} />
        <a href={location.link} className={cx('btn_location')}>
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  return (
    <div className={cx('map_waytocome')}>
      <div className={cx('txt-label')}>[{label}]</div>
      <ul>
        {list.map((waytocome) => (
          <li>{waytocome}</li>
        ))}
      </ul>
    </div>
  )
}
export default Map
