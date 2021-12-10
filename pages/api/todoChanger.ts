import { NextDatas } from '../../variable/Server'
import { SECRETHASH, TokenData, verify } from '../../variable/token'
import { db } from '../../variable/database'
export default async function TODOCHANGER(req: NextDatas[0], res:NextDatas[1]) {
    const { todoid } = req.query
    const { todotoken } = req.cookies
    const token = verify(todotoken)
    const [todos] = await db.select('*').from('logs').where('id', todoid)
    if (!todos || !todotoken || !token) return res.send({ success: false })
    else{
        if (todos.todo == 1) {
            await db.update({ todo: 0 }).where('id', todoid).where('user', Number(token.userid)).from('logs')
        }else {
            await db.update({ todo: 1 }).where('id', todoid).where('user', Number(token.userid)).from('logs')
        }
        return res.send({ success: true })
    }
}
