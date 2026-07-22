import { NextRequest } from 'next/server'
import { proxyToBackend } from '@/lib/backend'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  return proxyToBackend(req)
}

export async function POST(req: NextRequest) {
  return proxyToBackend(req)
}

export async function PUT(req: NextRequest) {
  return proxyToBackend(req)
}

export async function PATCH(req: NextRequest) {
  return proxyToBackend(req)
}

export async function DELETE(req: NextRequest) {
  return proxyToBackend(req)
}

export async function OPTIONS(req: NextRequest) {
  return proxyToBackend(req)
}
