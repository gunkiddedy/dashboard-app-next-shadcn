import { useMutation } from 'react-query'
import api from '@/services/api'
import { errorToast, handleErrors } from '@/services/helper'
import queryKey from './keys'
import { type AxiosError } from 'axios'
import config from '@/lib/config'
import { type Survey } from './types'

const BASE_URL = config.baseUrl + '/api/survey'

const useCreate = (options = { onSuccess: () => { } }) => {
  const { mutate: post, ...response } = useMutation(api.post, {
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: async () => {
      options.onSuccess()
    },
    onError: (err: AxiosError) => {
      errorToast(handleErrors(err))
    }
  })

  return {
    ...response,
    mutate: (body: Partial<Survey>) => {
      post({ url: `${BASE_URL}`, body })
    }
  }
}

const queries = { create: useCreate }

export default queries
