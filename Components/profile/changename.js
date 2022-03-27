import classes from './profile-form.module.css';
import {useRef,useState} from 'react'
import LinearIndeterminate from "../ui/loading";
import CustomizedSnackbars from "../ui/alerts";
import { Modal, Button } from 'antd';
import {signOut} from "next-auth/client";

function NameChange(props) {
    const [loading,setloading]=useState(false)
    const [message,setmessage]=useState('')
    const [openn,setopen]=useState(false)
    const [color,setcolor]=useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);


const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    const newnameref=useRef()
async function hsubmit(e){
        setloading(true)
    e.preventDefault()
    const newname=newnameref.current.value
    const data={
        newName:newname
    }
    const res=await fetch('/api/user/Changename',{
        method:'PATCH',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    })
    const lastdata=await res.json()
    if (res.status!==200){
        setloading(false)
        setcolor('error')
    setmessage(lastdata.message)
    setopen(true)
 setopen(false)

    }
    if (res.status===200){
        setloading(false)
        setcolor('success')
    setmessage(lastdata.message)
    setopen(true)
 setopen(false)
         signOut()
    }

}
  return (
      <div>
           <div className={classes.action}>
               <button onClick={showModal}>Update Name</button>
      </div>
    <Modal title="Update Name" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <form className={classes.form} onSubmit={hsubmit}>
      <div className={classes.control}>
        <label htmlFor='new-name'>New Name</label>
        <input type='text' id='new-name' ref={newnameref} required />
      </div>

      <div className={classes.action}>
        <button>Change Name</button>
      </div>
        <p></p>
         {loading ? <LinearIndeterminate/> :""}
       {openn ? <CustomizedSnackbars color={color} mess={message}/>:'' }


    </form>  </Modal>
      </div>



  );
}

export default NameChange;
