import Section from '@/components/common/Section'
import classNames from 'classnames/bind'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import styles from './Calendar.module.scss'
const cx = classNames.bind(styles)

const css = `
  .rdp-months {
    justify-content: center;
  }
  .rdp {
    margin: 0
  }
  .rdp-caption {
    display: none;
  }
  .rdp-cell {
    cursor: default;
  }
  .rdp-head_cell {
    font-weight: 500;
    font-size: 14px;
  }
  .rdp-day_selected {
    background-color: var(--red);
  }
  .rdp-day_selected:hover {
    background-color: var(--red);
    font-weight: bold
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: transparent;
    cursor: default
  }
`
function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section
      className={cx('calendar')}
      title={
        <div className={cx('calendar_header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          mode="single"
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}

export default Calendar
