import Dimmed from '@components/common/Dimmed'
import classNames from 'classnames/bind'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ImageViewer.module.scss'
import './swiper.css'

const cx = classNames.bind(styles)

function ImageViewer({
  images,
  selectedIdx,
  onClose,
}: {
  images: string[]
  selectedIdx: number
  onClose: () => void
}) {
  if (selectedIdx == -1) {
    return null
  }
  return (
    <Dimmed>
      <div className={cx('swiper_inner')}>
        <button type="button" className={cx('btn_close')} onClick={onClose}>
          <img src="/assets/close.png" alt="닫기 버튼" />
        </button>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          initialSlide={selectedIdx}
        >
          {images.map((src, idx) => {
            return (
              <SwiperSlide key={idx}>
                <img src={src} alt="갤러리 이미지" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </Dimmed>
  )
}

export default ImageViewer
