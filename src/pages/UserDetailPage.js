import React from 'react'
import UserDetail from '../components/UserDetail';
import { useParams } from 'react-router-dom'

export default function UserDetailPage() {
    let { userLogin } = useParams();
    return (
        <div>
            <UserDetail userLogin={userLogin}/>
        </div>
    )
}
