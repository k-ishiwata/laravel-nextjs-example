import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Issue, IssueCreate } from '@/types/Issue'
import { InputWrapper, Input, Textarea, Button, Space, Grid, Col, Group } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import UserSelectList from '@/components/users/SelectList'
import IssueStatusSelectList from '@/components/issueStatuses/SelectList'

type Props = {
    issue: Issue|IssueCreate,
    children?: React.ReactNode,
    submitAction: (issue: Issue, callback?: () => void) => Promise<void>
}

const IssueForm: React.VFC<Props> = ({
    issue,
    children,
    submitAction
}) => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<Issue>()
    const [ isButtonLoading, setIsButtonLoading ] = useState(false)

    useEffect(() => {
        return () => {
            // Unmount時ボタンアニメーションを止める
            setIsButtonLoading(false)
        }
    }, [])

    const onSubmit: SubmitHandler<Issue> = data => {
        setIsButtonLoading(true)
        const updateData: Issue = {...issue, ...data}

        return submitAction(updateData, () => {
            setIsButtonLoading(false)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper
                id="input-title"
                required
                label="タイトル"
                error={errors.title?.message}
            >
                <Input
                    defaultValue={issue.title}
                    {...register('title', {
                        required: '必ず入力してください。',
                        maxLength: {
                            value: 255,
                            message: '255文字以内で入力してください。'
                        }
                    })}
                    invalid={errors.title !== undefined}
                />
            </InputWrapper>
            <Space h="sm"  />
            <Textarea
                label="内容"
                required
                minRows={6}
                defaultValue={issue.body}
                {...register('body', {
                    maxLength: {
                        value: 1000,
                        message: '1000文字以内で入力してください。'
                    }
                })}
                error={errors.body?.message}
            />
            <Space h="sm"  />
            <Grid>
                <Col span={6}>
                    <IssueStatusSelectList
                        control={control}
                        selectedId={issue.status_id}
                        errorMessage={errors.status_id?.message}
                    />
                </Col>
                <Col span={6}>
                    <UserSelectList
                        control={control}
                        selectedId={issue.user_id}
                        errorMessage={errors.user_id?.message}
                    />
                </Col>
            </Grid>
            <Space h="sm"  />
            { children }
            <Group spacing="xs">
                <Button type="submit" loading={isButtonLoading}>保存</Button>
                <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
            </Group>
        </form>
    )
}

export default IssueForm
