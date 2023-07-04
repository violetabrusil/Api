import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity('factura')
export class Factura extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    valorTotal: number

    @Column()
    fecha: string
    

    @ManyToOne(() => Client, (client: Client) => client.facturas)
    client: Client;

}