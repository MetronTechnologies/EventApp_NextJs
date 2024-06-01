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




// noinspection TypeScriptValidateTypes

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    publicRoutes: [
        '/',
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
        "/api/webhooks(.*)"
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing'
    ],
    debug: true
});


export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};



