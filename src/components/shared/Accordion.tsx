import classNames from 'classnames/bind'
import { PropsWithChildren, useState } from 'react'
import styles from './Accordion.module.scss'
const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
}
function Accordion({ label, children }: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }
  return (
    <div className={cx('accordion', expanded ? 'open' : '')}>
      <div className={cx('accordion_header')} onClick={handleToggle}>
        <span>{label}</span>
        <button className={cx('btn_arrow')}>
          <img src="/assets/icon_arrow_down.png" alt="아코디언 화살표 버튼" />
        </button>
      </div>
      <div className={cx('accordion_contents')}>{children}</div>
    </div>
  )
}

export default Accordion
