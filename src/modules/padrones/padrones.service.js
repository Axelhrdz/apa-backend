import dotenv from 'dotenv';
import padronesOld from './padronesOld.model.js';

dotenv.config();


const padronOldService = async () => {
    try {
        const padrones = await padronesOld.find().sort({ _id: 1 }).limit(2).lean();
        return {
            padrones,
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