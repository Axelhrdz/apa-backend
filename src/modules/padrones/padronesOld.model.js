import mongoose from 'mongoose';

const padronOldSchema = new mongoose.Schema({
    clave_apa: {
        type: String,
        required: true,
        unique: true,
    },
    propietario: {
        type: String,
        required: true,
    },
    calle: {
        type: String,
    },
    exterior: {
        type: String,
    },
    interior: {
        type: String,
    },
    poblacion: {
        type: String
    },
    localidad: {
        type: String,
    },
    tipo_de_servicio: {
        type: String
    },
    tipo_de_tarifa: {
        type: String
    },
    adeudo_agua: {
        type: String
    },
    adeudo_colectores: {
        type: String
    },
    adeudo_infraestructura: {
        type: String
    },
    actualizacion: {
        type: String
    },
    conexion: {
        type: String
    },
    conexion_drenaje: {
        type: String 
    },
    descuento: {
        type: Number
    },
    recargos: {
        type: Number
    },
    descuento_recargos: {
        type: Number
    },
    multa: {
        type: Number
    },
    descuento_multa: {
        type: Number
    },
    gastos: {
        type: Number
    },
    saldo: {
        type: Number
    },
    periodo_desde: {
        type: String
    },
    periodo_hasta: {
        type: String
    },
    recaudadora: {
        type: Number
    },
    tipo_predio: {
        type: String
    },
    cuenta: {
        type: String
    },
    recamaras: {
        type: Number
    },
    banios: {
        type: Number
    },
    medidor: {
        type: String
    },
    id_convenio: {
        type: Number
    },
    capturo: {
        type: String
    },
    fecha: {
        type: String
    },
    cobros_a_considerar: {
        type: Number
    },
    lectura_real: {
        type: String
    },
    fecha_lectura: {
        type: String
    },
    autosuficiente: {
        type: String
    },
    manzana_lote: {
        type: String
    },
    uso_especifico: {
        type: String
    },
    estatus: {
        type: String
    },
    fecha_inicio: {
        type: String
    },
    fecha_fin: {
        type: String
    },
    indeterminado: {
        type: String
    },
    baldio: {
        type: String
    },
    observaciones: {
        type: String
    },
    id_apa: {
        type: Number
    }

}, { timestamps: true });


     

const padron_old = mongoose.model('padron_old', padronOldSchema, 'padron_old');

export default padron_old;