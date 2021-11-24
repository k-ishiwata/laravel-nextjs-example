import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container, LoadingOverlay, Anchor, Header, Space } from '@mantine/core'
import { useAuth } from '@/hooks/auth'
import { useRouter } from "next/router"
import Link from 'next/link'

type Props = {
    children?: React.ReactNode
    title?: string
    isGuest?: boolean
}

export default function Layout ({ children, title, isGuest = false }: Props) {
    const pageTitle = title || '課題管理'
    const router = useRouter()
    const { logout, user, error } = useAuth()

    useEffect(() => {
        // ログイン必須ページはログインしていなかったらログイン画面へリダイレクト
        if (!isGuest && !user && error) {
            const redirectUrl = router.pathname
                ? '?redirect=' + router.pathname + window.location.search
                : ''

            router.push('/login' + redirectUrl)
        }
    }, [user, error])

    if (!user) return <LoadingOverlay visible={true} />

    return (
        <>
            <Header height={50} padding="md" fixed>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Link href="/"><Anchor>ダッシュボード</Anchor></Link>
                    <Space />
                    <Link href="/issues/"><Anchor>課題一覧</Anchor></Link>
                    <Space />
                    <Link href="/issue-statuses/"><Anchor>ステータス</Anchor></Link>
                    <div style={{ marginLeft: 'auto' }}>
                        <Anchor onClick={logout}>ログアウト</Anchor>
                    </div>
                </div>
            </Header>
            <Container style={{ paddingTop: 60, paddingBottom: 40 }}>
                <Head>
                    <title>{ pageTitle }</title>
                </Head>
                <header>
                    <h1>{ pageTitle }</h1>
                </header>
                <main>{ children }</main>
            </Container>
        </>
    )
}
