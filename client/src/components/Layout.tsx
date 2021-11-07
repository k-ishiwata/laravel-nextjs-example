import React from 'react'
import Head from 'next/head'
import { Container } from '@mantine/core'

type Props = {
    children?: React.ReactNode
    title?: string
}

export default function Layout ({ children, title }: Props) {
    const pageTitle = title || '課題管理'
    return (
        <Container>
            <Head>
                <title>{ pageTitle }</title>
            </Head>
            <header>
                <h1>{ pageTitle }</h1>
            </header>
            <main>{ children }</main>
        </Container>
    )
}