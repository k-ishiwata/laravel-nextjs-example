import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { IssueCreate }  from '@/types/Issue'
import { useIssue } from '@/hooks/issue'
import IssueForm from '@/components/issues/Form'

const IssueCreatePage: NextPage = () => {
    const { createAction } = useIssue()

    const issue: IssueCreate = {
        title: '',
        body: '',
        status_id: 1
    }

    return (
        <Layout title="新規登録">
            <IssueForm submitAction={createAction} issue={issue} />
        </Layout>
    )
}

export default IssueCreatePage
