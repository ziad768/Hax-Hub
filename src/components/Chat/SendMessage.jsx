import React from 'react'

function SendMessage({message}) {
  return (
    <div className='m-4' >
          
    <div className="d-flex flex-row justify-content-start mb-4">
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1" style={{width:'45px', height: "100%"}}/>
    <div className="p-3 ms-3" style={{borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)"}}>
      <p className="small mb-0">{message}</p>
    </div>
  </div>
</div>  )
}

export default SendMessage