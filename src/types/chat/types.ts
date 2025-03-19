export type ChatRoom = {
    id: string;
    name: string;
    profile_picture: string;
    type: string;
    slug: string;
}

export type ChatMessage = {
    id: string;
    message: string;
    sender: string;
    profile_picture: string;
}

export type ChatContact = {
    name: string;
    avatar: string;
}