import { SearchAutocompleteSuggestions } from '@services/CRUD'
import type { SuggestionResponse } from 'types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') as string | null

    // Check if a query param was passed
    // Example: /api/videos?q=algorithms
    if (!query) {
      return Response.json(
        { error: 'Bad Request: Query is required' },
        { status: 400 }
      )
    }

    // Search autocomplete suggestions
    const results = await SearchAutocompleteSuggestions(query)

    return Response.json({
      count: results.length,
      suggestions: results,
    } as SuggestionResponse)
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
