import { createContext, useContext, useEffect, useState } from "react";

const user_URL = "http://localhost:5000/api/auth/user";
const service_URL = "http://localhost:5000/api/data/service";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [service, setService] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    }

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    let isLoggedIn = !!token;
    // console.log("Is Login",isLoggedIn);

    // JWT Authentication -> to get  the currently loged in user data

    const userAuthentication = async() => {
        try {
            setIsLoading(true);
            const response = await fetch( user_URL, {
                methods: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            
            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Error fetching user data");
        }
    };

    // to fetch the service data from the dataBase
    const getServices = async() => {
        try {
            const response = await fetch(service_URL,{
                method: "GET",
            });

            if(response.ok){
                const data = await response.json();
                setService(data.msg);
            }
            
        } catch (error) {
            console.log(`service frontend error:${error}`)
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[]);


    return( <AuthContext.Provider value={{
         isLoggedIn, isLoading, storetokenInLS, LogoutUser, user, service, authorizationToken }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};