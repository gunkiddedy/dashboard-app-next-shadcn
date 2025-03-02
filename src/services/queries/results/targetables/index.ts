import { useQuery } from 'react-query'
import api from '@/services/api'
import { errorToast, handleErrors } from '@/services/helper'
import queryKey from './keys'
import { type AxiosError } from 'axios'
import config from '@/lib/config'
import { type Targetables } from '@/app/api/results/targetables/types'

const BASE_URL = config.baseUrl + '/api/results/targetables'

const useRead = (options = {}) => {
  const response = useQuery(
    [queryKey.read],
    async () => await api.get({ url: `${BASE_URL}` }),
    {
      ...options,
      onSuccess: () => {},
      onError: (err: AxiosError) => {
        errorToast(handleErrors(err), { toastId: 'get' })
      }
    }
  )

  return {
    ...response,
    data: response.data?.data?.kpis as Targetables | undefined
  }
}

const queries = { read: useRead }

export default queries
