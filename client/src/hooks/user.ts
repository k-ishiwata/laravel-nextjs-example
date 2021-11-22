import useSWR from 'swr'
import axios from '@/libs/axios'

const APIURL = '/api/users'

export const useUserList = () => {
    const api = `${APIURL}/list`

    const { data, error } = useSWR<{[key: number]: string}>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    return {
        data,
        error
    }
}
