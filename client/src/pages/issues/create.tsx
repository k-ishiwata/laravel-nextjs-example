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
        status: 1
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createAction(issue)
    }

    return (
        <Layout title="新規登録">
            <IssueForm handleSubmit={handleSubmit} issue={issue} />
        </Layout>
    )
}

export default IssueCreatePage
