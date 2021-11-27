import useSWR from 'swr'
import axios, { validateErrorNotice } from '@/libs/axios'
import { IssueStatus, IssueStatusCreate } from "@/types/IssueStatus"
import { toast } from 'react-toastify'

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

    const { data, error, mutate } = useSWR<IssueStatus[]>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    const createAction = async (issueStatus: IssueStatusCreate, callback?: () => void) => {
        await axios
            .post(APIURL, issueStatus)
            .then(() => {
                mutate()
                toast.success('登録に成功しました')
            })
            .catch(error => {
                validateErrorNotice(error)
            })
            .finally(() => {
                if (callback) callback()
            })
    }

    const updateAction = async (issueStatus: IssueStatus, callback?: () => void) => {
        const api = `${APIURL}/${issueStatus.id}`
        await axios
            .put(api, issueStatus)
            .then(() => {
                mutate()
                toast.success('更新に成功しました')
            })
            .catch(error => {
                validateErrorNotice(error)
            })
            .finally(() => {
                if (callback) callback()
            })
    }

    const deleteAction = async (issueStatus: IssueStatus) => {
        const api = `${APIURL}/${issueStatus.id}`
        await axios
            .delete(api)
            .then(() => {
                mutate()
                toast.success('削除に成功しました')
            })
            .catch(error => {
                toast.error('削除に失敗しました')
                console.log(error.message)
            })
    }

    return {
        data,
        error,
        createAction,
        updateAction,
        deleteAction
    }
}

