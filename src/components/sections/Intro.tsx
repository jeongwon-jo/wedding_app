import Section from '@shared/Section'
import Text from '@shared/Text'
import classNames from 'classnames/bind'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import styles from './Intro.module.scss'

const cx = classNames.bind(styles)

function Intro({
  groomName,
  brideName,
  locationName,
  date,
  message,
}: {
  groomName: string
  brideName: string
  locationName: string
  date: string
  message: string
}) {
  return (
    <Section className={cx('contents__intro')}>
      <div className={cx('wedding_persons')}>
        <span>{groomName}</span>
        <span className={cx('icon_heart')}>
          <img src="/assets/icon_heart.png" alt="" />
        </span>
        <span>{brideName}</span>
      </div>
      <div className={cx('wedding_location')}>
        <span className={cx('date')}>
          {format(parseISO(date), 'yyyy년 M월 d일 eeee', { locale: ko })}
        </span>
        <span className={cx('location')}>{locationName}</span>
      </div>
      {/* <div
        className={cx('wedding_message')}
        dangerouslySetInnerHTML={{ __html: message }}
      ></div> */}
      <img
        className={cx('icon_bouquet')}
        src="/assets/bouquet.png"
        alt="부케 이미지"
        width={30}
      />
      <div className={cx('wedding_message')}>
        <Text children={message}></Text>
      </div>
    </Section>
  )
}

export default Intro
