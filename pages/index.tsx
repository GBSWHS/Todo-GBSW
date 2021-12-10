import { CLIENT_ID, REDIRECT_URI } from '../variable/login'
import Head from '../components/head'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Loading from '../components/Loading'
import Footer from '../components/footer'
import moment from 'moment'
import { useState } from 'react'
import router from 'next/router'

export default function Home() { 
  const date = new Date()
  const [Todo, setTodo] = useState("")
  const QueryhandleParam = (setValue: any) => (e: any) => setValue(e.target.value)
  
  async function insertTodo () {
    if (Todo.length < 1) return alert("1글자 이상")
    const res = await fetch('/api/todo', {
      method: 'post',
      body: JSON.stringify({
        todo: Todo
      })
    }).then((res) => res.json())
    if (!res.success) return alert("에러")
    else router.reload()
  }

  const { data, error } = useSWR('/api/GetData?Type=Main', fetcher)
  if (error) {
    window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
    return (
      <Head/>
    )
  }
  if (!data) {
    return (
      <Loading/>
    )
  } else {
    if (data.UserStatus == false) {
      window.location.replace(`https://auth.gbsw.hs.kr/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`)
      return (
        <>
          <Head/>
        </>
      )
    } else {
      return (
        <div>
          <Head/>
          <div className="box1">
            <span className="block_mb-1">TODO</span>
            <span className="block_mb-2">{"Today: " + moment(date).format('YYYY년 MM월 DD일')}</span>
            <br/>
            {Object.values(data.log).map((log: any) => (
              <span className="block_mb-2" key={1}>{log.data}<br/><a href={"/TodoChanger?todoid=" + log.id}><button className={log.todo == 1?"GreenBtn":"GrayBtn"}>✔</button></a><a href={"/delete?todoid=" + log.id}><button className="RedBtn">삭제</button></a></span>
            ))}
            <input type="text" onChange={QueryhandleParam(setTodo)} className='todoSend' placeholder="TODO - GBSW"></input><button className="GrayBtn" onClick={insertTodo}>Todo!</button>
          </div>
          <div>{`${data.user.grade}학년 ${data.user.class}반 ${data.user.name}님으로 로그인 됨`}</div><br/>
          <Footer/>
        </div>
      )
    }
  }
}
