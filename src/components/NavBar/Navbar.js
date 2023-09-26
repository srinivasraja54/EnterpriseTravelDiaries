import React from "react";
import { useState } from "react"
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../SignInButton";
import { SignOutButton } from "../SignOutButton";
import "./navbar.css"

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */

const Navbar = (props) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            <nav className="navigation">
                <a href="/" className="brand-name">
                    Enterprise Travel Diaries
                </a>
                <button className="hamburger">
                    {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div
                    className="navigation-menu">
                    <ul >
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/post">Post</a>
                        </li>
                        <li>
                            <a href="/view">View</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>

                    </ul>

                </div>
                <div className="pl-30">
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </div>
            </nav>
            {props.children}
        </>
    );
}

export default Navbar