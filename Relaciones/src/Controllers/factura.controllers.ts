import { Request, Response } from "express";
import { Client } from "../Entities/Client";
import { Factura } from "../Entities/Factura";

export const createFactura = async (req: Request, res: Response) => {
    try {
        const { valor, fecha, cedula } = req.body;
         
        const exist_client = await Client.findOne({
            where: {
                cedula: cedula
            }
        });

        if(!exist_client) {
            return res.status(401).json({ message: "No existe cliente"})
        } else {
            const factura = new Factura();
            factura.valorTotal = valor;
            factura.fecha = fecha;
            factura.client = exist_client;
            await factura.save();
            return res.json(factura);
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message})
        }

    }
}

export const getFacturasByClient = async (req: Request, res: Response) => {
    try {
        const { idClient } = req.params;
        const client = await Client.createQueryBuilder('client')
            .leftJoinAndSelect('client.facturas', 'facturas')
            .where('client.id = :id', { id: parseInt(idClient) })
            .getOne();
        if (client) {
            const facturas = client.getFacturas();
            return res.json(facturas); //nos devuelve las facturas
        } else {
            return res.status(400).json({ message: "No existe el cliente"}) //especifico el tipo de error en este caso 500 es para error en el servidor 
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message }) //especifico el tipo de error en este caso 500 es para error en el servidor 
        }
    }
}

 export const getFacturasByClientName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const facturas = await Client.findFacturasByClientName(name);
        return res.json(facturas);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message})
        }

    }
 }
