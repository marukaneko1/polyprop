import { NextRequest, NextResponse } from 'next/server'

const GAMMA_API = 'https://gamma-api.polymarket.com'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || '100'
    const offset = searchParams.get('offset') || '0'
    const active = searchParams.get('active') || 'true'
    const closed = searchParams.get('closed') || 'false'
    const order = searchParams.get('order') || 'volume'
    const ascending = searchParams.get('ascending') || 'false'

    const url = `${GAMMA_API}/markets?limit=${limit}&offset=${offset}&active=${active}&closed=${closed}&order=${order}&ascending=${ascending}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch markets: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching markets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch markets' },
      { status: 500 }
    )
  }
}
