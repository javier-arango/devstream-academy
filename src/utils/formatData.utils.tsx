import { Link } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

/**
 * Format a number to english format
 * Example 1000 -> 1,000
 * @param number
 * @returns
 */
export function formatToCompactNumber(number: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(number)
}

export function formatPublishedAt(publishedAt: Date): string {
  return formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  })
}

export function formatDescription(description: string): JSX.Element[] {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi

  const findUrls = (text: string) => {
    const urls = []
    let match

    while ((match = urlRegex.exec(text))) {
      urls.push({
        url: match[0],
        index: match.index,
      })
    }

    return urls
  }

  const renderTextWithLinks = (text: string) => {
    const urls = findUrls(text)
    if (urls.length === 0) {
      return text
    }

    const elements = []
    let lastIndex = 0

    urls.forEach((urlInfo, index) => {
      // Text before the URL
      if (urlInfo.index > lastIndex) {
        elements.push(text.substring(lastIndex, urlInfo.index))
      }

      // URL
      elements.push(
        <Link
          key={index}
          href={urlInfo.url}
          isExternal
          size="sm"
          showAnchorIcon
        >
          {urlInfo.url}
        </Link>
      )

      lastIndex = urlInfo.index + urlInfo.url.length
    })

    // Text after the last URL
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex))
    }

    return elements
  }

  return description.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {renderTextWithLinks(line)}
      <br />
    </React.Fragment>
  ))
}
