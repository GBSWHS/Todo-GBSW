import { db } from "../../variable/database";
import { NextDatas } from "../../variable/Server";
import { verify } from "../../variable/token";
export default async function AccountCheck (req: NextDatas[0], res: NextDatas[1]) {
    const token = req.cookies.todotoken
    const todo = verify(token)
    if(!token || !todo) return res.send({ Success: false })
    const [user] = await db.select('*').from('users').where('id', todo.userid)
    if (!user) {
        await db.insert({ id: todo.userid, name: todo.name, grade: todo.grade, class: todo.class, class_number: todo.class_number }).from('users')
        return res.send({ Success: true })
    } else return res.send({ Success: true })
}