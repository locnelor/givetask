

import { BaseEntity } from "src/baseEntity";
import { TaskEntity } from "src/task/task.entity";
import { Column, Entity, OneToMany } from "typeorm";




@Entity("work")
export class WorkEntity extends BaseEntity {
    @Column()
    name: string

    @OneToMany(() => TaskEntity, type => type.work)
    tasks: TaskEntity[]
}