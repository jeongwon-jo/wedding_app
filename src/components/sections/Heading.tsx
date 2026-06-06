import Section from '@/components/common/Section'
import classNames from 'classnames/bind'
import { format, getDay, parseISO } from 'date-fns'
import styles from './Heading.module.scss'

const cx = classNames.bind(styles)

function Heading({ date }: { date: string }) {
  const weddingDate = parseISO(date)
  const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return (
    <Section className={cx('heading__date')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}

export default Heading
