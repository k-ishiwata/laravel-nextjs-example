import Axios from 'axios'
import { toast } from 'react-toastify'

/**
 * Axios初期設定
 */
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios

/**
 * バリデーションエラー表示
 *
 * @param error
 */
export const validateErrorNotice = (
    error: any
) => {
    if (error.response?.data.errors) {
        Object.values(error.response?.data.errors).map(
            (messages: any) => {
                messages.map((message: string) => {
                    toast.error(message)
                })
            }
        )
    } else {
        toast.error(error.message)
    }
}
