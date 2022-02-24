import React from 'react'
import UserDetail from '../components/UserDetail';
import { useParams } from 'react-router-dom';

const UserDetailPage: React.FC = () => {
  let { userLogin } = useParams<{userLogin: string}>();

  return (
    <>
        <UserDetail userLogin={userLogin}/>
    </>
  )
}

export default UserDetailPage;