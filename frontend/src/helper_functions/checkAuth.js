import {Redirect, Route} from "react-router-dom";

/** Function which makes sure that the user is authnticated to access pages.*/
const RequireAuth = ({
    component: Component,
    ...rest
}) => {
    const token = localStorage.getItem('access_token');

    return <Route
        {...rest}
        render={(props) => (token !== null
        ? <Component {...props}/>
        : <Redirect to='/login'/>)}/>;
};

export default RequireAuth;