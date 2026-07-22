import { NextRequest, NextResponse } from 'next/server'

const backendBaseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function proxyToBackend(req: NextRequest) {
  const targetUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, backendBaseUrl)

  const headers = new Headers()
  req.headers.forEach((value, key) => {
    if (!['host', 'content-length'].includes(key)) {
      headers.set(key, value)
    }
  })

  const method = req.method
  const body = ['GET', 'HEAD'].includes(method) ? undefined : await req.text()

  if (body && !headers.has('content-type') && req.headers.get('content-type')) {
    headers.set('content-type', req.headers.get('content-type')!)
  }

  const response = await fetch(targetUrl, {
    method,
    headers,
    body,
  })

  const responseText = await response.text()
  const responseHeaders = new Headers()
  response.headers.forEach((value, key) => {
    if (!['content-length', 'transfer-encoding'].includes(key)) {
      responseHeaders.set(key, value)
    }
  })

  if (response.headers.get('content-type')?.includes('application/json')) {
    const payload = responseText ? JSON.parse(responseText) : {}
    return NextResponse.json(payload, {
      status: response.status,
      headers: responseHeaders,
    })
  }

  return new NextResponse(responseText, {
    status: response.status,
    headers: responseHeaders,
  })
}
