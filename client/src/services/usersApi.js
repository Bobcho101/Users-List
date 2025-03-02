const baseUrl = 'http://localhost:3030/jsonstore/users';

export const fetchUsers = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return Object.values(result);
};

export const createUser = async (data) => {
    await fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data})
    });
}
export const deleteUser = async (userId) => {
    await fetch(`${baseUrl}/${userId}`, {
        method: "DELETE",
    }); 
}
export const editUser = async (userId, newData) => {
    await fetch(`${baseUrl}/${userId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newData})
    })
}