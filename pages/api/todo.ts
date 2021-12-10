import { NextDatas } from '../../variable/Server'
import { SECRETHASH, TokenData, verify } from '../../variable/token'
import { db } from '../../variable/database'
export default async function insertodo(req: NextDatas[0], res:NextDatas[1]) {
    const { todotoken } = req.cookies
    const { todo } = JSON.parse(req.body)
    const token = verify(todotoken)
    if (!todotoken || !token) return res.send({ success: false })
    else{
        await db.insert({ user: token.userid, data: todo, todo: 0 }).from('logs')
        return res.send({ success: true })
    }
}
