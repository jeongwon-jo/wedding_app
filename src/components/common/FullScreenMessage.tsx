import classNames from 'classnames/bind'
import styles from './FullScreenMessage.module.scss'

const cx = classNames.bind(styles)

interface FullScreenMessageProps {
  type: 'loading' | 'error'
}
function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <div className={cx('container')}>
      {type === 'loading' ? (
        <Heart />
      ) : (
        <div className={cx('error_wrap')}>
          <Error />
          <p>에러가 발생했어요. 잠시후 다시 실행해 주세요.</p>
        </div>
      )}
    </div>
  )
}

function Heart() {
  return (
    <img
      className={cx('heartbeat')}
      src="/assets/loading.png"
      alt="로딩 이미지"
      width={40}
    />
  )
}

function Error() {
  return <img src="/assets/error.png" alt="에러 이미지" width={40} />
}

export default FullScreenMessage
