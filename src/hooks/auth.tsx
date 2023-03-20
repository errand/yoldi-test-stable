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
