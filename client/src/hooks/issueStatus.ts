import useSWR from 'swr'
import axios from '@/libs/axios'
import { IssueStatus } from "@/types/IssueStatus"

const APIURL = '/api/issue-statuses'

export const useIssueStatus = () => {
    const api = `${APIURL}/list`

    const { data, error, mutate } = useSWR<IssueStatus[]>(api, () =>
        axios
            .get(api)
            .then((res: any) => res.data)
    )

    return {
        data,
        error
    }
}
