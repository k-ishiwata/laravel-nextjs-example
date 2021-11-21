import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useIssue } from '@/hooks/issue'
import { Button, Space, Table, LoadingOverlay } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'
import { getUrlParam } from '@/libs/libs'
import { status } from '@/const'

const IssueDetailPage: NextPage = () => {
    const router = useRouter()
    const { getItem } = useIssue()
    const { data: issue, error} = getItem(Number(getUrlParam('id')))

    const Content = () => {
        if (error) return <div>エラーが発生しました</div>
        if (!issue) return <LoadingOverlay visible={true} />

        return (
            <>
            <article>
                <Table>
                    <tbody>
                    <tr>
                        <td width={100}>ID</td>
                        <td>{issue.id}</td>
                    </tr>
                    <tr>
                        <td>タイトル</td>
                        <td>{issue.title}</td>
                    </tr>
                    <tr>
                        <td>内容</td>
                        <td style={{whiteSpace: 'pre-wrap'}}>{issue.body}</td>
                    </tr>
                    <tr>
                        <td>状態</td>
                        <td>{status[issue.status].label}</td>
                    </tr>
                    <tr>
                        <td>登録日</td>
                        <td>{ dayjs(issue.created_at).format('YYYY年MM月DD日 HH:mm') }</td>
                    </tr>
                    <tr>
                        <td>更新日</td>
                        <td>{ dayjs(issue.updated_at).format('YYYY年MM月DD日 HH:mm') }</td>
                    </tr>
                    </tbody>
                </Table>
            </article>
            <Space />
            <Link href={{
                pathname: '/issues/edit/',
                query: { id: issue.id },
            }}>
                <Button variant="outline" component="a">編集</Button>
            </Link>
            <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
            </>
        )
    }

    return (
        <Layout title="課題詳細">
            <Content />
        </Layout>
    )
}

export default IssueDetailPage
