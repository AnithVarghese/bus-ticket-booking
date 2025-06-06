import React from 'react'
import {busimage1} from '../../assets/busimage1.jpg'
const Userlogin = () => {
  return (
    <div>
      <aside>
        <img src={busimage1} alt="" />
      </aside>
      <aside>
        <form action="Login">
          <input type="text" name="" id="" />
          <input type="password" name="" id="" />
          <button>Login</button>
        </form>
        <span>Dont'have an account? Signup</span>
      </aside>
    </div>
  )
}

export default Userlogin
