import useSWR from "swr";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {useCookies} from "react-cookie";
import {useSearchParams} from "next/navigation";

interface profileType {
    url: string;
    cookies: cookiesType;
}

interface cookiesType {
    yoldiToken: string
}

interface authType {
    middleware?: string,
    redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }:authType = {}) => {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(["yoldiToken"])
    const searchParams = useSearchParams();
    const searchId = searchParams.get("id");

    const { data: profile, mutate } = useSWR(
        { url: `https://frontend-test-api.yoldi.agency/api/profile`, cookies },
        ({url, cookies}: profileType) => {
        return fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-API-KEY": cookies.yoldiToken,
            },
        })
            .then((res) => res.json())
            .catch(error => {
                if (error.response.status !== 409) throw error
            });
        }
    );

    const { data: user } = useSWR(
        { url: `https://frontend-test-api.yoldi.agency/api/user/${searchId}`, searchId },
        ({url}: profileType) => {
        return fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .catch(error => {
                if (error.response.status !== 409) throw error
            });
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
    /**
     * TODO: refactor Edit to useSWR
     */
    /*    const edit = ({...props }) => {
            return fetch("https://frontend-test-api.yoldi.agency/api/profile", {
                method: "PATCH",
                body: JSON.stringify(props),
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-API-KEY": cookies.yoldiToken,
                },
            })
                .then((res) => res.json())
        }*/

    const login = ({setErrors, ...props }: any) => {
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

    const logout = async () => {
        await router.push('/')
        await removeCookie("yoldiToken");
    }

    /**
     * TODO: refactor to use as hook
     */
    /*const { data: userList } = useSWR(`/api/user`, () => {
        return fetch(`https://frontend-test-api.yoldi.agency/api/user`).then((res) => res.json()).then(data => console.log(data))
    })*/

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && cookies.yoldiToken)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && !cookies.yoldiToken) router.push('/login')
    }, [profile])

    return {
        profile,
        user,
        login,
        register,
        logout
    }
}
