import { NextRequest, NextResponse } from 'next/server'

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

    const url = `${CLOB_API}/price?token_id=${tokenId}`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch price: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching price:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price' },
      { status: 500 }
    )
  }
}
