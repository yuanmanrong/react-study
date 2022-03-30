import React, {useState} from "react"
import { Link, Outlet } from "react-router-dom"


export default function RouteTest() {
   const [message] = useState([
       {id:"1",title:"ymar0",content: "0hhhhhhhhhhhh"},
       {id:"2",title:"ymar1",content: "1hhhhhhhhhhhh"},
       {id:"3",title:"ymar2",content: "2hhhhhhhhhhhh"},
       {id:"4",title:"ymar3",content: "3hhhhhhhhhhhh"},
       {id:"5",title:"ymar4",content: "4hhhhhhhhhhhh"},
   ])
   
   return (
       
       <div className="message">
         { 
            message.map((item,index) => {
                return(
                    <li key={index}>
                       <Link 
                       to={`detail/${item.id}?title=${item.title}`}
                       state={{
                           content: item.content
                       }}
                       >{item.title}</Link>
                    </li>
                )
            }) 
         }
         <Outlet></Outlet>
       </div>
   )

}