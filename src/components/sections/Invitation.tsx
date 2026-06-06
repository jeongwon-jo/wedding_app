import Section from '@/components/common/Section'
import classNames from 'classnames/bind'
import Text from '../common/Text'
import styles from './Invitation.module.scss'

const cx = classNames.bind(styles)

function Invitation({ message }: { message: string }) {
  return (
    <Section className={cx('contents__invitation')}>
      <img
        className={cx('icon_message')}
        src="/assets/message.png"
        alt="부케 이미지"
        width={24}
      />
      <Text>{message}</Text>
    </Section>
  )
}

export default Invitation
