import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CLOB_API = 'https://clob.polymarket.com'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tokenId = searchParams.get('token_id')

    if (!tokenId) {
      return NextResponse.json(
        { error: 'token_id is required' },
        { status: 400 }
      )
    }

    const url = `${CLOB_API}/book?token_id=${tokenId}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh orderbook
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch orderbook: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching orderbook:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orderbook' },
      { status: 500 }
    )
  }
}
