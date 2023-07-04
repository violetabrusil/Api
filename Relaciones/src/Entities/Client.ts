import { NotEquals } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";

@Entity('client')
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string;

    @Column()
    last_name: string

    @NotEquals("")
    @Column({
        unique: true,
        nullable: true
    })
    cedula: string;

    @OneToMany(() => Factura, (factura: Factura) => factura.client)
    facturas: Factura[];

    getFacturas(): Factura[] {
        return this.facturas
    }

    static async findFacturasByClientName(clientName: string): Promise<Factura[]> {
        const clients = await this.find({ where: {first_name:clientName }, relations: ["facturas"]});
        if (clients.length > 0) {
            const facturas: Factura[] = []
            clients.forEach(client => {
                facturas.push(...client.facturas);
            });
            return facturas
        } else {
            return [];
        }
    }
}