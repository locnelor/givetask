import { BaseEntity } from "src/baseEntity";
import { TaskEntity } from "src/task/task.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity("user")
export class UserEntity extends BaseEntity {
    @Column()
    name: string

    @Column({ unique: true })
    idcard: string

    @OneToMany(() => TaskEntity, type => type.user)
    tasks: TaskEntity[]
}