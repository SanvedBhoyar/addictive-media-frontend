import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [userList, setUserList] = useState([]);
    const [sortBy, setSortBy] = useState(true);

    const updateList = () => {
        axios.get('https://cors-anywhere-proxy-app-heroku.herokuapp.com/https://addictive-media-backend-app.herokuapp.com/get-users')
            .then(({ data }) => setUserList(data));
    };


    useEffect(() => {
        updateList();
    }, []);

    const handleDelete = async (id) => {
        // delete the user
        try {
            await axios.get('https://cors-anywhere-proxy-app-heroku.herokuapp.com/https://addictive-media-backend-app.herokuapp.com/delete-user', {
                params: { id }
            });

            updateList();
        }
        catch (e) {
            console.error(e);
        }
    };


    return (
        <div className='userlist'>
            {!userList.length && (
                <p>No Users Yet.</p>
            )}

            {userList.length ? (
                <div>
                    <p>Sort by: </p>
                    <button
                        className="userlist__sort-btn"
                        onClick={() => setSortBy((prevState) => !prevState)}
                    >
                        {sortBy ? "Name" : "Date"}
                    </button>
                </div>
            ) : null}

            {userList?.map((user) => (
                <div key={user.id} className='user'>
                    <p>Name: {user.name}</p>
                    <p>DOB: {user.dob}</p>
                    <p>Country: {user.country}</p>
                    <p>Resume: {user.resume}</p>
                    <button
                        onClick={() => handleDelete(user.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default UserList;