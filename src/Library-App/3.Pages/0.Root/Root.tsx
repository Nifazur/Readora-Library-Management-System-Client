import Footer from "@/Library-App/2.Layout/Footer";
import Navbar from "@/Library-App/2.Layout/Navbar";
import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;