import Section from '@/components/common/Section'
import classNames from 'classnames/bind'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from './Share.module.scss'
declare global {
  interface Window {
    Kakao: any
  }
}
const cx = classNames.bind(styles)

function Share({
  groomName,
  brideName,
  date,
}: {
  groomName: string
  brideName: string
  date: string
}) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js'
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      console.log(window)
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY)
      }
    }
  }, [])

  const handleShareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 결혼합니다.`,
        description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
        imageUrl:
          'https://img.magnific.com/premium-vector/cute-asian-groom-bride-characters-flat-design-style-vector-illustration_540284-382.jpg?semt=ais_hybrid&w=740&q=80',
        link: {
          mobileWebUrl: window.location.origin, // localhost:3000
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.origin, // localhost:3000
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }

  return (
    <Section title="공유하기" className={cx('contents__share')}>
      <div className={cx('share__btns')}>
        <button onClick={handleShareKakao}>
          <img src="/assets/icon_kakao.png" alt="카카오톡 아이콘" />
        </button>
        <button>
          <CopyToClipboard
            text={`${window.location.origin}`}
            onCopy={() => alert('링크복사가 완료되었습니다.')}
          >
            <img src="/assets/icon_link.png" alt="링크 아이콘" />
          </CopyToClipboard>
        </button>
      </div>
    </Section>
  )
}

export default Share
