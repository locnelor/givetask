import { BaseEntity } from "src/baseEntity";
import { UserEntity } from "src/user/user.entity";
import { WorkEntity } from "src/work/work.entity";
import { Entity, ManyToOne } from "typeorm";




@Entity("task")
export class TaskEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, type => type.tasks)
    user: UserEntity

    @ManyToOne(() => WorkEntity)
    work: WorkEntity
}