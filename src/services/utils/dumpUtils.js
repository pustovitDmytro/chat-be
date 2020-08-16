export function dumpUser(u) {
    return {
        id        : u.id,
        login     : u.login,
        role      : u.role,
        createdAt : u.createdAt
    };
}

export function dumpChat(u) {
    return {
        id        : u.id,
        name      : u.name,
        createdAt : u.createdAt
    };
}
