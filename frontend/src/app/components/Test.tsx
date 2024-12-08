"use client";

import React, { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        console.log("Attempting API call");
        try {
            const res = await fetch("/api/home"); // This is proxied to Express.js
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return <div>this is test</div>;
};

export default Test;
