declare interface PostResult {
    objectId?: string;
    content: string;
    pubUser: string;
    updatedAt?: string;
    createdAt?: string;
}

declare interface PostList {
    results: PostResult[];
}
