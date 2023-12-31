
import AdminChat from '../components/Chats'
import SidbarAdmin from '../components/ٍSidbar/SidbarAdmin'

function ChatPage() {
  return (
    <div className="col-11 m-auto   d-lg-flex justify-content-between">
     <SidbarAdmin/>
   <div className="col-12 flex-grow-1 col-lg-8  py-4">
     <AdminChat/>
   </div>

   </div>
)

}

export default ChatPage
