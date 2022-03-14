import { Column, CreateDateColumn, Entity, PrimaryColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Entity({ name: 'category' })
@Tree('materialized-path')
export class Category {
    @PrimaryColumn({ generated: true })
    id: number;
    
    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    description: string;

    @TreeChildren()
    children?: Category[];

    @TreeParent()
    parent?: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
