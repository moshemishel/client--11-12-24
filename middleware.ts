import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookie } from '@/context/cookieUtils';


export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const isStaticAsset = pathname.startsWith('/_next/static') || pathname === '/favicon.ico';

    if (isStaticAsset) {
        return NextResponse.next();
    }
 
    const publicPathsRegex = /^\/(login|register|checkout|superAdmin\/login|userConflict)$/;

if (publicPathsRegex.test(pathname)) {
    return NextResponse.next();
}
    
    // const user = getAuthCookie();
    const user = {name:'moshe', role: 100, id: 'moshe1'}
    

    if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'notLoggedIn');
        return NextResponse.redirect(loginUrl);
    }

    if (user.role !== 100 && pathname.startsWith('/superAdmin')) {
        console.log(`Access denied to ${pathname} for non-superAdmin user ${user.name}`);
        const redirectUrl = new URL(`/${user.name}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }
    
    console.log("pathname", pathname);
    const splittedPath = pathname.split('/');
    const dynamicUserName = splittedPath[1] == 'superAdmin' ? splittedPath[2]: splittedPath[1];
       
    if (dynamicUserName && dynamicUserName !== user?.name) {
        console.log(
            `Potential impersonation detected: Logged in as ${user.name} but attempting to access ${pathname}`
        );
        
        const notificationUrl = new URL('/userConflict', request.url);
        notificationUrl.searchParams.set('User', JSON.stringify(user));
        notificationUrl.searchParams.set('Requested-url', pathname);
        
        return NextResponse.redirect(notificationUrl);
    }
    
    return NextResponse.next();
}