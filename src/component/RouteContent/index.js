import React, {useState} from "react"
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom"


export default function RouteContent() {  
  const { id } = useParams()
  const [search, setSearch] = useSearchParams()
  const navigate = useNavigate() // 编程式路由导航  navigate(路由， 对象)
  const state = useLocation()  // 拿不到为什么呢？？？？？？？？
  console.log(state);
   return (
       <div>
         消息{id}
         {search.get('title')}
         
       </div>
   )

}