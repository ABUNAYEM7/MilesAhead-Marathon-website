import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import CardSkeleton from '../../components/Skeleton/LoadingSkeleton'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)

    if(loading){
        return <div className='my-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
        </div>
    }

    if(user){
        return children
    }


  return <Navigate to={'/LogIn'} />
}

export default PrivateRoute
