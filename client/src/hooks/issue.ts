import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import axios, { validateErrorNotice } from '@/libs/axios'
import { Issue, IssuePager, IssueCreate } from '@/types/Issue'
import { useNotifications } from '@mantine/notifications'

const APIURL = '/api/issues'

export const useIssues = (pageIndex: number = 1) => {
    const api = `${APIURL}?page=${pageIndex}`
    const notifications = useNotifications()

    const { data: issues, error, mutate } = useSWR<IssuePager>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    const deleteAction = async (issue: Issue) => {
        await axios
            .delete(`${APIURL}/${issue.id}`)
            .then(() => {
                notifications.showNotification({
                    title: '削除に成功しました',
                    message: '',
                    color: 'green'
                })
                mutate(issues)
            })
            .catch(error => {
                notifications.showNotification({
                    title: '削除に失敗しました',
                    message: error.message,
                    color: 'red'
                })
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
    const notifications = useNotifications()
    const router = useRouter()

    const getItem = (id: number) => {
        const api = `${APIURL}/${id}`
        return useSWR<Issue>(api, async () =>
            await axios
                .get(api)
                .then((res: any) => res.data)
        )
    }

    const updateAction = async (issue: Issue) => {
        const api = `${APIURL}/${issue.id}`
        await axios
            .put(api, issue)
            .then(() => {
                mutate(api)
                notifications.showNotification({
                    title: '更新に成功しました',
                    message: '',
                    color: 'green'
                })
            })
            .catch(error => {
                validateErrorNotice(notifications, error, '更新に失敗しました')
            })
    }

    const deleteAction = async (issue: Issue) => {
        const api = `${APIURL}/${issue.id}`
        await axios
            .delete(api)
            .then(() => {
                notifications.showNotification({
                    title: '削除に成功しました',
                    message: '',
                    color: 'green'
                })
                router.replace('/issues/')
            })
            .catch(error => {
                notifications.showNotification({
                    title: '削除に失敗しました',
                    message: error.message,
                    color: 'red'
                })
            })
    }

    const createAction = async (issue: IssueCreate) => {
        await axios
            .post(APIURL, issue)
            .then(() => {
                notifications.showNotification({
                    title: '登録に成功しました',
                    message: '',
                    color: 'green'
                })
                router.replace('/issues/')
            })
            .catch(error => {
                validateErrorNotice(notifications, error, '登録に失敗しました')
            })
    }

    return {
        getItem,
        createAction,
        updateAction,
        deleteAction
    }
}
