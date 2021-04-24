import React, {useEffect} from "react";
import axiosInstance from "../../axios";

/*
    Component which displays the landing page to the user.
*/

function LandingPage() {
    useEffect(() => {
        axiosInstance.get("api/user/")
            .then((res) => {
                console.log(res.data);
                if (res.data.is_instructor === false) {
                    window.location = '/player';
                }
                else {
                    window.location = '/instructor';
                }
            }
        );
    }, []);

    return (

        <div className="container w-50 " style={{
            marginTop: 150
        }}>
            <h1 className="text-lighten-3 text-center">Redirecting...</h1>
        </div>
    )
}

export default LandingPage;