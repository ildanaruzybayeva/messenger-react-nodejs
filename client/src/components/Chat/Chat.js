import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT =
        'https://5000-a718c52f-341a-4136-9028-09197414e7ca.ws-eu01.gitpod.io/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    return <h1>Chat</h1>;
};

export default Chat;
