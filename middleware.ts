// import { clerkMiddleware } from "@clerk/nextjs/server";
//
// export default clerkMiddleware();
// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
//     publicRoutes: [
//         '/',
//         '/events/:id',
//         '/api/webhook/clerk',
//         '/api/webhook/stripe',
//         '/api/uploadthing'
//     ],
//     ignoredRoutes: [
//         '/api/webhook/clerk',
//         '/api/webhook/stripe',
//         '/api/uploadthing'
//     ]
// };




import {authMiddleware} from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing'
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing'
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};



