import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.js";
import Home from "../pages/Home/Home.js";
import LoginPage from "@/pages/Auth/LoginPage.js";
import RegisterPage from "@/pages/Auth/RegisterPage.js";

const router= createBrowserRouter(
   [
    {
        path:"/",
        Component: MainLayout,
        children:[
            {index:true,
                Component:LoginPage
            },
            {
                path:"/home",
                Component:Home
            },
            {
                path:"register",
                Component:RegisterPage
            }
        ]
    }
   ]
);

export default router;