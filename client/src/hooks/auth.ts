import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '@/libs/axios'
import { toast } from 'react-toastify'

export const useAuth = () => {
    const router = useRouter()

    const { data: user, error } = useSWR('/api/user', async () =>
        await axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                throw error.response
            })
    )

    const login = async ({ ...props }) => {
        const redirect = router.query.redirect || '/issues'
        await axios
            .post('/api/login', props)
            .then(() => {
                window.location.href = String(redirect)
            })
            .catch(() => {
                toast.error('ログインに失敗しました')
            })
    }

    const logout = async () => {
        await axios
            .post('/api/logout').then(() => {
                window.location.href = '/login'
            })
            .catch(() => {
                toast.error('ログアウトに失敗しました')
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
