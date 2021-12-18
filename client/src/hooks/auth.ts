import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios, { validateErrorNotice } from '@/libs/axios'
import { toast } from 'react-toastify'
import { User } from '@/types/User'

export const useAuth = () => {
    const router = useRouter()

    const { data: user, error } = useSWR('/api/me', async () =>
        await axios
            .get<User>('/api/me')
            .then(res => res.data)
            .catch(error => {
                throw error.response
            })
    )

    const register = async ({ ...props }) => {
        await axios
            .post('/api/register', props)
            .then(() => {
                window.location.href = '/'
            })
            .catch(error => {
                validateErrorNotice(error)
            })
    }

    const login = async ({ ...props }) => {
        const redirect = router.query.redirect || '/issues'
        await axios
            .post('/api/login', props)
            .then(() => {
                window.location.href = String(redirect)
            })
            .catch((error) => {
                validateErrorNotice(error)
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
        register,
        login,
        logout,
        loading,
        loggedIn
    }
}
