import { useState } from "react"
import { DataContextI } from "../context/DataContext"
import { get, post } from "../fcn/httpFetch"

export const useData = () => {

    const [logged, setLogged] = useState(false)
    const [res, setRes] = useState({'ans': 'default'})

    const log = async () => {
        if (!logged) {
            const res: {online: boolean} = await get('http://localhost:6841/log/')
            setLogged(res.online)
            console.log('Logged. Server online.', res)
        }
    }

    const query = async (q: string) => {
        if (logged) {
            await post('http://localhost:6841/query/', {q: q}).then(async (res: {ans: string}) => {
                console.log('Got result:', res)
                setRes(res)
            }).catch(() => { 
                console.log('Unable to fetch Env data.')
                setRes({'ans': 'def1'})
            })
        } else {
            setRes({'ans': 'def2'})
        }
    }

    const dataContext: DataContextI = {
        logged: logged,
        log: log,
        query: query,
        res: res
    }

    return dataContext
}

export default useData
