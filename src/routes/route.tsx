import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.js";
import Home from "../pages/Home/Home.js";

const router= createBrowserRouter(
   [
    {
        path:"/",
        Component: MainLayout,
        children:[
            {index:true,
                Component:Home
            }
        ]
    }
   ]
);

export default router;