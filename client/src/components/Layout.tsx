import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container, LoadingOverlay, Anchor } from '@mantine/core'
import { useAuth } from '@/hooks/auth'
import { useRouter } from "next/router"

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
            <div style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}>
                <Anchor onClick={logout}>ログアウト</Anchor>
            </div>
            <Container>
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
