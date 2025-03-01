const baseUrl = 'http://localhost:3030/jsonstore/users';

export const fetchUsers = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return Object.values(result);
};