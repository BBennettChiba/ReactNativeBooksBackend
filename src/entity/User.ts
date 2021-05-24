import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Book } from "./Book";

@Entity("User")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable()
  ownedBooks: Book[];

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable()
  booksToRead: Book[];

  @CreateDateColumn({ name: "createdAt" }) "createdAt": Date;
  @UpdateDateColumn({ name: "updatedAt" }) "updatedAt": Date;
}
