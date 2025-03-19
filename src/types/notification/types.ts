export type Notification = {
    id: string;
    title: string;
    message: string;
    notification_type: "Job Application" | "Message";
    is_read: boolean;
}