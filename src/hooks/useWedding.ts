import { getWedding } from '@/api/wedding'
import { Wedding } from '@/models/wedding'
import { useQuery } from 'react-query'

function useWedding() {
  // const [wedding, setWedding] = useState<Wedding | null>(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)

  const { data, isLoading, error } = useQuery<Wedding>(
    ['wedding'],
    () =>
      getWedding().then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      }),
    { suspense: true },
  )

  // useEffect(() => {
  //   // 비동기 방법: callback, promise, async/await
  //   setLoading(true)
  //   getWedding()
  //     .then((res) => {
  //       if (res.ok === false) {
  //         throw new Error('청첩장 정보를 불러오지 못했습니다.')
  //       }
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setWedding(data)
  //       setLoading(false)
  //     })
  //     .catch((e) => {
  //       console.log('에러발생', e)
  //       setError(true)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])

  return { wedding: data, isLoading, error }
}

export default useWedding
