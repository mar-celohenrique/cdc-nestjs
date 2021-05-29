import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    description: string;

    @CreateDateColumn({ nullable: false })
    creationDate: Date;

    constructor(name: string, email: string, description: string) {
        this.name = name;
        this.email = email;
        this.description = description;
    }
}
