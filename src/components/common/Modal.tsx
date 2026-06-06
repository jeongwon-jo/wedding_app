import classNames from 'classnames/bind'
import Dimmed from './Dimmed'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

interface ModalProps {
  open: boolean
  title?: string
  body: React.ReactNode
  rightButtonLabel?: string
  onRightButtonClick?: () => void
  leftButtonLabel?: string
  onLeftButtonClick?: () => void
}
function Modal({
  open,
  title,
  body,
  leftButtonLabel = '닫기',
  rightButtonLabel = '확인',
  onLeftButtonClick,
  onRightButtonClick,
}: ModalProps) {
  if (open === false) {
    return null
  }

  return (
    <Dimmed>
      <div className={cx('modal_wrap')}>
        <div className={cx('modal_inner')}>
          <div className={cx('modal_content')}>
            {title == null ? null : (
              <div className={cx('modal_title')}>{title}</div>
            )}
            <div className={cx('modal_body')}>{body}</div>
          </div>
          <div className={cx('modal_btns')}>
            <button onClick={onLeftButtonClick} className={cx('btn_left')}>
              {leftButtonLabel}
            </button>
            <button onClick={onRightButtonClick} className={cx('btn_right')}>
              {rightButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </Dimmed>
  )
}

export default Modal
