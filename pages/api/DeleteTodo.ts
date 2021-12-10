import { NextDatas } from '../../variable/Server'
import { SECRETHASH, TokenData, verify } from '../../variable/token'
import { db } from '../../variable/database'
export default async function insertodo(req: NextDatas[0], res:NextDatas[1]) {
    const { todoid } = req.query
    const { todotoken } = req.cookies
    const token = verify(todotoken)
    const todocheck = await db.select('*').from('logs').where('id', Number(todoid))
    if (!todotoken || !token || !todoid || !todocheck) return res.send({ success: false })
    else{
        await db.delete().from('logs').where('id', Number(todoid))
        return res.send({ success: true })
    }
}
