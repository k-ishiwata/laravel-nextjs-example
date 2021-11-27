import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import axios, { validateErrorNotice } from '@/libs/axios'
import { Issue, IssuePager, IssueCreate } from '@/types/Issue'
import { toast } from 'react-toastify'

const APIURL = '/api/issues'

export const useIssues = (pageIndex: number = 1) => {
    const api = `${APIURL}?page=${pageIndex}`

    const { data: issues, error, mutate } = useSWR<IssuePager>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    const deleteAction = async (issue: Issue) => {
        await axios
            .delete(`${APIURL}/${issue.id}`)
            .then(() => {
                toast.success('削除に成功しました')
                mutate(issues)
            })
            .catch(() => {
                toast.error('削除に失敗しました')
            })
    }

    return {
        issues,
        error,
        deleteAction
    }
}

export const useIssue = () => {
    const { mutate } = useSWRConfig()
    const router = useRouter()
    // ボタンローディング用タイマー
    let timer: number

    const getItem = (id: number) => {
        const api = `${APIURL}/${id}`
        return useSWR<Issue>(api, async () =>
            await axios
                .get(api)
                .then((res: any) => res.data)
        )
    }

    const createAction = async (issue: IssueCreate, callback?: () => void) => {
        await axios
            .post(APIURL, issue)
            .then(() => {
                toast.success('登録に成功しました')
                router.replace('/issues/')
            })
            .catch(error => {
                validateErrorNotice(error)
            })
            .finally(() => {
                if (callback) {
                    timer = window.setTimeout(() => {
                        callback()
                    }, 1000)
                }
            })
    }

    const updateAction = async (issue: Issue, callback?: () => void) => {
        const api = `${APIURL}/${issue.id}`
        await axios
            .put(api, issue)
            .then(() => {
                mutate(api)
                toast.success('更新に成功しました')
            })
            .catch(error => {
                validateErrorNotice(error)
            })
            .finally(() => {
                if (callback) {
                    timer = window.setTimeout(() => {
                        callback()
                    }, 1000)
                }
            })
    }

    const deleteAction = async (issue: Issue) => {
        const api = `${APIURL}/${issue.id}`
        await axios
            .delete(api)
            .then(() => {
                toast.success('削除に成功しました')
                router.replace('/issues/')
            })
            .catch(() => {
                toast.error('削除に失敗しました')
            })
    }

    useEffect(() => {
        return () => clearInterval(timer)
    }, [])

    return {
        getItem,
        createAction,
        updateAction,
        deleteAction
    }
}
