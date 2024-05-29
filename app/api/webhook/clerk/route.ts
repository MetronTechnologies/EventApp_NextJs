import {Webhook, WebhookRequiredHeaders} from 'svix'
import { headers } from 'next/headers';
import {clerkClient, WebhookEvent} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {createUser, deleteUser, updateUser} from "@/lib/actions/user.action";
import {CreateUserParams, UpdateUserParams} from "@/types";
import {IncomingHttpHeaders} from "http";

type EventType =
    | "user.created"
    | "user.updated"
    | "user.deleted";

type Event = {
    data: Record<string, string | number | Record<string, string>[]>;
    object: "event";
    type: EventType;
};

export const POST = async (request: Request) => {
    const payload = await request.json();
    const header = headers();

    const heads = {
        "svix-id": header.get("svix-id"),
        "svix-timestamp": header.get("svix-timestamp"),
        "svix-signature": header.get("svix-signature"),
    };

    // Activate Webhook in the Clerk Dashboard.
    // After adding the endpoint, you'll see the secret on the right side.
    console.log("Env ---> " + process.env.NEXT_CLERK_WEBHOOK_SECRET);
    const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

    let evnt: Event | null = null;

    try {
        evnt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch (err) {
        return NextResponse.json(
            { message: err },
            // { status: 400 }
        );
    }

    const eventType: EventType = evnt?.type!;

    if(eventType === 'user.created') {
        console.log("Action is created");
        const { id, email_addresses, image_url, first_name, last_name, username } = evnt.data;

        const user= <CreateUserParams>{
            clerkId: id,
            email: email_addresses[0].email_address,
            username: username!,
            firstName: first_name,
            lastName: last_name,
            photo: image_url,
        }
        const newUser = await createUser(user);

        if(newUser) {
            await clerkClient.users.updateUserMetadata(id!, {
                publicMetadata: {
                    userId: newUser._id
                }
            })
        }

        return NextResponse.json({
            message: 'OK',
            user: newUser
        })
    }


    // if (eventType === 'user.updated') {
    //     const {id, image_url, first_name, last_name, username } = evt.data
    //     const user = {
    //         firstName: first_name!,
    //         lastName: last_name!,
    //         username: username!,
    //         photo: image_url!,
    //     }
    //
    //     const updatedUser = await updateUser(id, user);
    //
    //     return NextResponse.json({ message: 'OK', user: updatedUser })
    // }

    if (eventType === 'user.deleted') {
        const { id } = evnt?.data

        const deletedUser = await deleteUser(id!)

        return NextResponse.json({ message: 'OK', user: deletedUser })
    }

    return new Response('', { status: 200 })
}
