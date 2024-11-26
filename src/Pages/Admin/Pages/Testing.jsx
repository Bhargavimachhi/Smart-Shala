import React from 'react'
import { useAuth } from '../../../context/auth'
const Testing = () => {
    const [auth , setAuth ] = useAuth();
  return (
    <>
        <div>Testing</div>
<pre>{JSON.stringify(auth)}</pre>


    </>

  )
}

export default Testing