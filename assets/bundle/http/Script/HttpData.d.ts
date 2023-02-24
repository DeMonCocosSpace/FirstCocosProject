declare interface UserResult {
    objectId: string;
    username: string;
    updatedAt: string;
}

declare interface UserList {
    results: UserResult[];
}
