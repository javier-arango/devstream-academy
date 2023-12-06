import { baseURL } from '@lib/index'
import type { SuggestionResponse } from 'types'

export async function searchSuggestedKeywords(
  query?: string
): Promise<SuggestionResponse> {
  try {
    const res = await fetch(`${baseURL}/api/search/suggestions?q=${query}`)

    if (!res.ok) {
      return {
        count: 0,
        suggestions: [],
      }
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return {
      count: 0,
      suggestions: [],
    }
  }
}
