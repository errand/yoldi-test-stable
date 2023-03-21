import useSWR, {mutate} from "swr";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {useCookies} from "react-cookie";

interface profileType {
    url: string;
    cookies: cookiesType;
}

interface cookiesType {
    yoldiToken: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(["yoldiToken"])

    const { data: user, mutate } = useSWR(
        { url: `https://frontend-test-api.yoldi.agency/api/profile`, cookies },
        ({url, cookies}: profileType) => {
        return fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-API-KEY": cookies.yoldiToken,
            },
        })
            .then((res) => res.json());
        }
    );

    const register = ({...props }) => {
        return fetch("https://frontend-test-api.yoldi.agency/api/auth/sign-up", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(data => setCookie("yoldiToken", data.value))
            .then(() => mutate());
    }

    const login = ({setErrors, ...props }) => {
        setErrors([]);
        return fetch("https://frontend-test-api.yoldi.agency/api/auth/login", {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(data => {
                if(data.statusCode !== 401) {
                    setCookie("yoldiToken", data.value)
                } else {
                    setErrors(data.message)
                }
            })
            .then(() => mutate());
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && cookies.yoldiToken)
            router.push(redirectIfAuthenticated)
        //if (middleware === 'auth') logout()
    }, [user])

    return {
        user,
        login,
        register
    }
}
