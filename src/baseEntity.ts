import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: "timestamp" })
    createAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date
}