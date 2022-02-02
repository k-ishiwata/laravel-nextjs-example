import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import IssueList from '@/components/issues/List'
import { Button, Space } from '@mantine/core'

const IssuePage: NextPage = () => {
    return (
        <Layout title="課題一覧">
            <div style={{ textAlign: 'right', marginTop: -50 }}>
                <Link href="/issues/create">
                    <Button>新規登録</Button>
                </Link>
            </div>
            <Space h="md" />
            <IssueList />
        </Layout>
    )
}

export default IssuePage
