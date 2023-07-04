import { validate } from "class-validator";
import { Request, Response } from "express";
import { Client } from "../Entities/Client";

export const createClient = async (req: Request, res: Response) => {
    try {
        const { name, lastName, cedula } = req.body;
        const existingClient = await Client.findOne({where: {cedula: cedula}})

        if (existingClient) {
            return res.status(400).json({ message: "Ya existe un cliente con ese número de cédula"})
        }

        const client = new Client();
        client.first_name = name;
        client.last_name = lastName;
        client.cedula = cedula;

        validate(client).then(errors => {
            if (errors.length > 0) {
                console.log('validacion fallida', errors)
                return res.status(401).json({message: "Errors"})
            } else {
                console.log("validacion existosa")
                client.save()
                return res.json(client);
            }

        })

    } catch (error){
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }

    }
    

}