import React, { Component } from 'react';
import UserList from './UserList';

export default function Result({data}) {
    if(!data.items) {
        return false;
    }
    return (
        <div className="result">
            {
                data.items.map((item) => (
                    <UserList key={item.id} {...item}/>
                ))
            }
        </div>
    )
}
