import React from 'react'
import { useRouter } from 'next/router'
import { Issue, IssueCreate } from '@/types/Issue'
import { InputWrapper, Input, Textarea, Button, Space, Grid, Col } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import UserSelectList from '@/components/users/SelectList'
import IssueStatusSelectList from '@/components/issueStatuses/SelectList'

type Props = {
    issue: Issue|IssueCreate,
    children?: React.ReactNode,
    submitAction: (issue: Issue) => Promise<void>
}

const IssueForm: React.VFC<Props> = ({
    issue,
    submitAction,
    children
}) => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<Issue>()

    const onSubmit: SubmitHandler<Issue> = data => {
        const updateData: Issue = {...issue, ...data}
        return submitAction(updateData)
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
                        required: "必ず入力してください。",
                        maxLength: {
                            value: 255,
                            message: "255文字以内で入力してください。"
                        }
                    })}
                    invalid={errors.title !== undefined}
                />
            </InputWrapper>
            <Space />
            <Textarea
                label="内容"
                required
                minRows={6}
                defaultValue={issue.body}
                {...register('body', {
                    maxLength: {
                        value: 1000,
                        message: "1000文字以内で入力してください。"
                    }
                })}
                error={errors.body?.message}
            />
            <Space />
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
            <Space />
            { children }
            <Button type="submit">保存</Button>
            <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
        </form>
    )
}

export default IssueForm
