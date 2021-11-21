import type { NextPage } from 'next'
import Link from 'next/link'

const HomePage: NextPage = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Index</h1>
            <p><Link href="/issues/">課題一覧</Link></p>
        </div>
    )
}

export default HomePage
