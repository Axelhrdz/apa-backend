import dotenv from 'dotenv';
import padronesOld from './padronesOld.model.js';

dotenv.config();


const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 500;
const MAX_PAGE_SIZE = 500;

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
};

const padronOldService = async (req) => {
    try {
        const page = parsePositiveInt(req?.query?.page, DEFAULT_PAGE);
        const requestedPageSize = parsePositiveInt(req?.query?.pageSize, DEFAULT_PAGE_SIZE);
        const pageSize = Math.min(requestedPageSize, MAX_PAGE_SIZE);
        const skip = (page - 1) * pageSize;

        const total = await padronesOld.countDocuments();

        const padrones = await padronesOld
            .find()
            .select('-_id clave_apa propietario calle exterior interior poblacion localidad tipo_de_servicio tipo_de_tarifa adeudo_agua adeudo_colectores adeudo_infraestructura actualizacion conexion conexion_drenaje descuento recargos descuento_recargos multa descuento_multa gastos saldo periodo_desde periodo_hasta recaudadora tipo_predio cuenta recamaras banios medidor id_convenio capturo fecha cobros_a_considerar lectura_real fecha_lectura autosuficiente manzana_lote uso_especifico estatus fecha_inicio fecha_fin indeterminado baldio observaciones id_apa')
            .sort({ _id: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();

        const totalPages = Math.ceil(total / pageSize);
        const hasNext = page < totalPages;

        return {
            padrones,
            pagination: {
                page,
                pageSize,
                total,
                totalPages,
                hasNext
            },
            status: 200
        }
    } catch (error) {
        console.log('Error in padronesOldService', error);
        return {
            message: 'Error in padronesOldService',
            error: error.message,
            status: 500
        }
    }
}



export { padronOldService };