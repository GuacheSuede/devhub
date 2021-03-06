import React from 'react'

import { CommitRow } from './CommitRow'
import { RenderItem, RowList } from './RowList'

import { GitHubPushedCommit } from '@devhub/core/src/types'

export interface CommitListRowProps {
  isRead: boolean
  maxHeight?: number
  commits: GitHubPushedCommit[]
}

export const CommitListRow = React.memo((props: CommitListRowProps) => {
  const renderItem: RenderItem<GitHubPushedCommit> = ({
    showMoreItemsIndicator,
    item: commit,
  }) => {
    if (!(commit && commit.sha && commit.message)) return null

    return (
      <CommitRow
        key={`commit-row-${commit.sha}`}
        {...props}
        authorEmail={commit.author.email}
        authorName={commit.author.name}
        message={commit.message}
        showMoreItemsIndicator={showMoreItemsIndicator}
        url={commit.url}
      />
    )
  }

  const { commits, ...otherProps } = props

  if (!(commits && commits.length > 0)) return null

  return <RowList {...otherProps} data={commits} renderItem={renderItem} />
})
