import { NextDatas } from '../../variable/Server'
import { SECRETHASH, TokenData, verify } from '../../variable/token'
import { db } from '../../variable/database'
export default async function GETDATA(req: NextDatas[0], res:NextDatas[1]) {
	const { Type } = req.query
	if (!req.cookies.todotoken) return res.send({ Success: false, UserStatus: false, msg: '로그인이 필요한 시스템 입니다.'})
	const users = verify(req.cookies.todotoken)
  	const [user] = await db.select('*').from('users').where('id', users.userid)
	if (!users || !user) return res.send({ Success: false, UserStatus: false, msg: '로그인이 필요한 시스템 입니다.'})
	if (Type === 'Main') {
		const log = await db.select('*').from('logs').where('user', user.id).orderBy('id', 'asc')
		return res.send({ 
			Success: true, 
			UserStatus: true, 
			user, 
			log 
		})
	} else return res.send({ Success: false, UserStatus: true, msg: '잘못된 요청 입니다.'})
}
