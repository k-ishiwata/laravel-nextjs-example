import Axios from 'axios'
import { NotificationsContextProps } from '@mantine/notifications/lib/types'

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
 * @param notifications
 * @param error
 * @param title
 */
export const validateErrorNotice = (
    notifications: NotificationsContextProps,
    error: any,
    title: string = '更新に失敗しました'
) => {
    if (error.response?.data.errors) {
        Object.values(error.response?.data.errors).map(
            (messages: any) => {
                messages.map((message: string) => {
                    notifications.showNotification({
                        title: title,
                        message: message,
                        color: 'red'
                    })
                })
            }
        )
    } else {
        notifications.showNotification({
            title: title,
            message: error.message,
            color: 'red'
        })
    }
}
