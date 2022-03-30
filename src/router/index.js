import Computer from "../component/Computer/Computer";
import TestHook from "../component/TestHook";
import RouteTest from "../component/RouteTest";
import RouteContent from "../component/RouteContent";
import { Navigate } from "react-router-dom";

const routerList = [
    {
        path: "/computer",
        element: <Computer/>
    },
    {
        path: "/hook",
        element: <TestHook/>,
        children: [
           {
            path: "message",
            element: <RouteTest/>,
            children:[
                {
                    path:"detail/:id",
                    element:<RouteContent/>
                }
            ]
           }
        ]
    },
    {
        path: "/",
        element: <Navigate to="/hook"></Navigate>
    }
]

export {
    routerList
}