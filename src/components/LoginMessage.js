import React from 'react';
import { UnauthenticatedTemplate } from '@azure/msal-react';
import './common.css'
import Background from '../assets/background.jpeg'

export default function LoginMessage() {

    const backgroundStyle = {
        backgroundImage: `url(${Background})`, // Set the background image
        backgroundSize: 'cover', // Adjust to your needs
        backgroundRepeat: 'no-repeat', // Adjust to your needs
        backgroundPosition: 'center center',
        minHeight: '104vh', // Set a minimum height to cover the viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'red', // Text color
        width: '100%'
        // height: 1000px; /* You can adjust the height as needed */
    };

    return (
        <div>
            <UnauthenticatedTemplate>
                <div >
                    <h5>
                        <center>
                            Please sign-in to Portal using AD account.
                        </center>
                    </h5>
                </div>
            </UnauthenticatedTemplate>
        </div>
    )
}