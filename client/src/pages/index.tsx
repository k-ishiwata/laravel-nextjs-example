import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'

const HomePage: NextPage = () => {
    return (
        <Layout title="ダッシュボード">
            <p><Link href="/issues/">課題一覧</Link></p>
            <p><Link href="/issue-statuses/">ステータス</Link></p>
        </Layout>
    )
}

export default HomePage
