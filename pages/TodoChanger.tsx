import { useRouter } from "next/router"
import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { CLIENT_ID, REDIRECT_URI } from "../variable/login"
import Head from '../components/head'
import Loading from '../components/Loading'
export default function Delete() {
    const router = useRouter()
    const { data, error } = useSWR('/api/todoChanger?todoid=' + router.query.todoid, fetcher, { revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false })
    if (error) {
        window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
        return (
          <Head/>
        )
    }
    if (!data) {
        return (<Loading/>)
    }else {
        if (data.success == true) {
            router.replace('/')
            return (
                <Head/>
            )
        } else {
            alert("오류")
            window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
            return (
                <Head/>
            )
        }
    }
}