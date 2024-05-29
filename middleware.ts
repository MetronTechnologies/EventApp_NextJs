import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    publicRoutes: [
        "/",
        "/events/:id",
        "/api/webhook/clerk",
        "/api/webhook/stripe",
        "/api/uploadthing"
    ],
    ignoredRoutes: [
        "/api/webhook/clerk",
        "/api/webhook/stripe",
        "/api/uploadthing"
    ]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// export default clerkMiddleware({
//     publicRoutes: ["/", "/api/webhook/clerk", "/admin", "/api/webhooks/user"],
//     ignoredRoutes: ["/api/webhook/clerk"],
// });



