import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/session'


 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const  { isAuthenticated, user } = await verifySession()

  if(request.nextUrl.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL("/seeker/fsdf", request.nextUrl))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {

}