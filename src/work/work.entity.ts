import { existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { BaseEntity } from "src/baseEntity";
import { TaskEntity } from "src/task/task.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BinaryLike, createHash } from 'crypto';

export const md5 = (data: BinaryLike) => createHash("md5").update(data.toString()).digest("hex")
export const sha1 = (data: BinaryLike) => createHash("sha1").update(data.toString()).digest("hex")
export const cryptoPassword = (data: BinaryLike) => {
    return md5(sha1(`${data}`));
}
export const createUid = (args = [] as string[]) => {
    return md5(sha1(`${Math.random()}_${Date.now()}_${args.join("_")}`))
}
export const DeepMakeDir = (path: string) => {
    if (existsSync(path)) return path
    const before = join(path, "..")
    DeepMakeDir(before);
    mkdirSync(path);
    return path;
}
export const DeepUnlinkDir = (path: string) => {
    const stat = statSync(path);
    if (stat.isFile()) {
        unlinkSync(path);
        return;
    }
    const filenames = readdirSync(path);
    for (const name of filenames) DeepUnlinkDir(join(path, name))
    rmdirSync(path)
}

@Entity("work")
export class WorkEntity extends BaseEntity {
    @Column()
    name: string

    @OneToMany(() => TaskEntity, type => type.work)
    tasks: TaskEntity[]

    @Column({
        type: 'timestamp',
        nullable: true
    })
    deadline: Date

    @Column({
        type: 'longtext',
        nullable: true
    })
    comment: string

    public static getUserWorkDir(work: WorkEntity, user: UserEntity) {
        return join(WorkEntity.getWorkDir(work), `${user.idcard}-${user.name}`)
    }
    public static getWorkDir(work: WorkEntity) {
        return join(cwd(), "public", work.id.toString())
    }
}