// didn't use this component
import { useState, useCallback, useRef, useEffect } from "react";
import React from 'react'

export const useHttpClient = () =>{ 

    const activeHttpRequets = useRef([])

    const sendRequest =useCallback( async (url , method = 'GET', body=null, headers ={}) => {

        const httpAbortCtrl = new AbortController()
        activeHttpRequets.current.push(httpAbortCtrl) 

        try {
            const response = await fetch(
                
                url,
                method,
                body,
                headers,
                //signal: httpAbortCtrl.signal
                );
            const responseData = await response.json();
             
           activeHttpRequets.current = activeHttpRequets.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl) 


            if (!response.ok) {
              throw new Error(responseData.message);
            }
            return responseData
          } catch (error) {
            console.log(error.message);
            throw error
          }
    },[])

    useEffect( () => {
        return () => {
            activeHttpRequets.current.forEach(abortCtrl => abortCtrl.abort())
        };
    },[])
    return sendRequest
}
