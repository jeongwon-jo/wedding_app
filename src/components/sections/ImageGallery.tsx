import Section from '@/components/common/Section'
import classNames from 'classnames/bind'
import { useState } from 'react'
import ImageViewer from '../ImageViewer'
import styles from './ImageGallery.module.scss'

const cx = classNames.bind(styles)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진첩" className={cx('image__gallery')}>
        <ul className={cx('image_grid')}>
          {images.map((src, idx) => (
            <li key={idx} onClick={() => setSelectedIdx(idx)}>
              <img src={src} alt="사진첩 이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageGallery
