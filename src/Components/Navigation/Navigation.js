import React from 'react';


const Navigation = ({onRouteChange , isSignedIn}) => {

        if(isSignedIn){
            return (
            <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className="underline link dim black pa3 f3 pointer">Sign Out</p>
            </nav>
            )
        } else {
            return (
                    <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                        <p onClick={() => onRouteChange('signin')} className="underline link dim black pa3 f3 pointer">Sign In</p>
                        <p onClick={() => onRouteChange('register')} className="underline link dim black pa3 f3 pointer">Register</p>
                    </nav>
            )
        }

}




export default Navigation 