import { Container, Logo, LogoutBtn } from "../index";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth?.status);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
            disabled: location.pathname === "/"
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ];

    return (
        <header className='w-full py-4 shadow-md bg-gradient-to-r from-gray-700 to-gray-900 text-white'>
            <Container>
                <nav className="flex justify-between items-center">
                    <Link to='/'>
                        <Logo width="80px" />
                    </Link>
                    <ul className="flex space-x-6">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`px-5 py-2 rounded-lg transition duration-200 ${item.disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-600"}`}
                                        disabled={item.disabled}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;