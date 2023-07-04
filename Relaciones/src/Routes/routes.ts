import { Router } from "express";
import { createClient } from "../Controllers/client.controllers";
import { createFactura, getFacturasByClientName, getFacturasByClient } from "../Controllers/factura.controllers";

const router = Router()

router.post('/createClient', createClient)
router.post('/createFactura', createFactura)
router.get('/getFacturaByIdClient/:idClient', getFacturasByClient);
router.get('/getFacturaByClientName/:name', getFacturasByClientName);

export default router;
