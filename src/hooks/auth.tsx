import useSWR, {mutate} from "swr";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {useCookies} from "react-cookie";

interface registerProps {
    email: string;
    name: string;
    password: string;
}

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

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && cookies.yoldiToken)
            router.push(redirectIfAuthenticated)
        //if (middleware === 'auth') logout()
    }, [user])

    return {
        user,
        register
    }
}

/*
const { data: profile } = useSWR(
    { url: `https://frontend-test-api.yoldi.agency/api/profile`, cookies },
    getProfile
);
*/

export async function register(
    url: string,
    { arg }: { arg: registerProps }
) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function getProfile({url, cookies}: profileType) {
    return fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-API-KEY": cookies.yoldiToken,
        },
    }).then((res) => res.json());
}
