import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

const listStr = `
23P1120108009	李天明
23P1120108017	郭世茂
23P1120108026	贾鑫博
23P1120108029	贾子文
23P1120108031	仝惠冉
23P1120108033	常含月
23P1120108035	刘帅龙
23P1120108038	王文慧
23P1120108039	董泽昶
23P1120108042	胡迎晓
23P1120108044	田野
23P1120108045	苑鑫辉
23P1120108047	李煦帆
23P1120108049	刘聪聪
23P1120108052	梁龙水
23P1120108053	刘晓楠
23P1120108056	秦子凡
23P1120108057	田绍雄
23P1120108060	胡少华
23P1120108062	张玉洁
23P1120108064	文秋生
23P1120108066	赵颖
23P1120108067	韩子航
23P1120108070	蒋仕瑄
23P1120108072	杜兵兵
23P1120108074	赵薇
23P1120108076	魏雨佳
23P1120108077	史雨辰
23P1120108080	孙玉容
23P1120108082	李婧怡
23P1120108084	贾欣瑶
23P1120108086	付文泉
23P1120108088	马紫彤
23P1120108090	刘睿
23P1120108092	李志颖
23P1120108093	刘海伦
23P1120108096	张浩楠
23P1120108097	李婉婷
23P1120108100	严雪飞
23P1120108101	王章玉
23P1120108104	常雨萱
23P1120108105	马益非
23P1120108107	陆雄伟
23P1120108110	纪小龙
23P1120108111	刘淼
`

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        public readonly user: Repository<UserEntity>
    ) { 
        this.init()
    }
    private async init() {
        const arr = listStr.split("\n").filter(e => !!e).map(e => {
            const [idcard, name] = e.split("\t")
            return { idcard, name }
        })
        const entitys = [];
        for (const { idcard, name } of arr) {
            if (!await this.user.exist({
                where: {
                    idcard
                }
            })) {
                const entity = this.user.create({
                    idcard,
                    name
                })
                entitys.push(entity)
            }
        }
        console.log(entitys)
        if(!!entitys.length){
            await this.user.save(entitys);
        }
    }
}
