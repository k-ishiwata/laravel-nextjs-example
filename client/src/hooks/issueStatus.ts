import useSWR from 'swr'
import axios, { validateErrorNotice } from '@/libs/axios'
import { IssueStatus, IssueStatusCreate } from "@/types/IssueStatus"
import { useNotifications } from "@mantine/notifications"

const APIURL = '/api/issue-statuses'

export const useIssueStatusList = () => {
    const api = `${APIURL}/list`

    const { data, error } = useSWR<IssueStatus[]>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    return {
        data,
        error
    }
}

export const useIssueStatuses = () => {
    const api = `${APIURL}`

    const notifications = useNotifications()

    const { data, error, mutate } = useSWR<IssueStatus[]>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    const updateAction = async (issueStatus: IssueStatus, callback?: () => void) => {
        const api = `${APIURL}/${issueStatus.id}`
        await axios
            .put(api, issueStatus)
            .then(() => {
                mutate()
                notifications.showNotification({
                    title: '更新に成功しました',
                    message: '',
                    color: 'green'
                })

                if (callback) callback()
            })
            .catch(error => {
                validateErrorNotice(notifications, error, '更新に失敗しました')
            })
    }

    const deleteAction = async (issueStatus: IssueStatus) => {
        const api = `${APIURL}/${issueStatus.id}`
        await axios
            .delete(api)
            .then(() => {
                mutate()
                notifications.showNotification({
                    title: '削除に成功しました',
                    message: '',
                    color: 'green'
                })
            })
            .catch(error => {
                notifications.showNotification({
                    title: '削除に失敗しました',
                    message: error.message,
                    color: 'red'
                })
            })
    }

    const createAction = async (issueStatus: IssueStatusCreate, callback?: () => void) => {
        await axios
            .post(APIURL, issueStatus)
            .then(() => {
                mutate()
                notifications.showNotification({
                    title: '登録に成功しました',
                    message: '',
                    color: 'green'
                })

                if (callback) callback()
            })
            .catch(error => {
                validateErrorNotice(notifications, error, '登録に失敗しました')
            })
    }

    return {
        data,
        error,
        updateAction,
        createAction,
        deleteAction
    }
}

