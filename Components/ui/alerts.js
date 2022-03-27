import React from 'react';
import { message, Space } from 'antd';
import 'antd/dist/antd.css';


export default function CustomizedSnackbars(props) {


  const {color,mess}=props

     if (color==='error'){
         return(
             <div>
                 {message.error({
    content: mess,
    className: 'custom-class',
    style: {
      marginTop: '85vh',
    },
  })}
             </div>
         )

     }
     if (color==='success'){
          return(
             <div>
                 {message.success({
    content: mess,
    className: 'custom-class',
    style: {
      marginTop: '85vh',
    },
  })}
             </div>
         )
     }



return(
         <div></div>
     )
}