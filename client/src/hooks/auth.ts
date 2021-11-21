import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '@/libs/axios'
import { useNotifications } from '@mantine/notifications'


export const useAuth = () => {
    const router = useRouter()
    const notifications = useNotifications()

    const { data: user, error } = useSWR('/api/user', async () =>
        await axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                throw error.response
            })
    )

    const login = async ({ ...props }) => {

        const redirect = router.query.redirect
            ? String(router.query.redirect)
            : '/issues'

        await
            axios
                .post('/api/login', props)
                .then(() => {
                    window.location.href = redirect
                })
                .catch(error => {
                    notifications.showNotification({
                        title: 'ログインに失敗しました。',
                        message: error.message,
                        color: 'red'
                    })
                })
    }

    const logout = async () => {
        await
        axios
            .post('/api/logout').then(() => {
                window.location.href = '/login'
            })
            .catch(error => {
                notifications.showNotification({
                    title: 'ログアウトに失敗しました。',
                    message: error.message,
                    color: 'red'
                })
            })
    }

    const loading = !user && !error
    const loggedIn = !error && user

    return {
        user,
        error,
        login,
        logout,
        loading,
        loggedIn
    }
}
