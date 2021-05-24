import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Book extends BaseEntity{
  @Column()
  title: string;

  @PrimaryColumn()
  isbn: string;

  @Column()
  coverURL: string;

  @Column()
  language: string;

  @Column()
  pageCount: number;

  @Column()
  publisher: string;

  @Column()
  publishedDate: string;

  @Column()
  description: string;

  @Column("text", { array: true })
  categories: string[];

  @Column("text", { array: true })
  authors: string[];

  @CreateDateColumn({ name: "createdAt" }) "createdAt": Date;
  @UpdateDateColumn({ name: "updatedAt" }) "updatedAt": Date;
}
