import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/session'

const authRoutes = [
  '/notifications',
  '/chat',
  '/chats'
]
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const  { isAuthenticated, user } = await verifySession()

  const getRole = user.role === "user" ? "/seeker" : "/company"

  if((request.nextUrl.pathname === getRole + "/login") && isAuthenticated) {
    return NextResponse.redirect(new URL(getRole + "/" + user.slug, request.nextUrl))
  }

  for (const route of authRoutes) {
    if (request.nextUrl.pathname.startsWith(route) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/seeker/login", request.nextUrl))
    }
  }
  
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {

}