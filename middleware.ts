import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookie } from '@/context/cookieUtils';


export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const isStaticAsset = pathname.startsWith('/_next/static') || pathname === '/favicon.ico';

    if (isStaticAsset) {
        return NextResponse.next();
    }
 
    const publicPathsRegex = /^\/(login|register|checkout|userConflict)$/;

if (publicPathsRegex.test(pathname)) {
    return NextResponse.next();
}
    
    // const user = getAuthCookie();
    const user = {name:'moshe', role: 100, id: 'moshe1'}
    

    if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'login_required');
        return NextResponse.redirect(loginUrl);
    };

    if (user.role !== 0 && pathname.startsWith('/superAdmin')) {
        // console.log(`Access denied to ${pathname} for non-superAdmin user ${user.name}`);
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'unauthorized');
        return NextResponse.redirect(loginUrl);
    };
    
    console.log("pathname", pathname);
    const splittedPath = pathname.split('/');
    const dynamicUserName = splittedPath[1] == 'superAdmin' ? splittedPath[2]: splittedPath[1];
       
    if (dynamicUserName && dynamicUserName !== user?.name) {
        // console.log(
        //     `Potential impersonation detected: Logged in as ${user.name} but attempting to access ${pathname}`
        // );
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('reason', 'account_mismatch');
        return NextResponse.redirect(loginUrl);
    };
    
    return NextResponse.next();
}