import { body, validationResult, matchedData } from 'express-validator';

const validateData = [
    body('folio').notEmpty().trim().escape().withMessage('Folio is required'),
    body('file').custom((value, { req }) => {
        if (!req.files?.file) throw new Error('File is required');
        const file = req.files.file;
        if (file.size === 0) throw new Error('File must not be empty');
        const name = (file.name || '').toLowerCase();
        if (!name.endsWith('.xlsx')) throw new Error('Only .xlsx files are allowed');
        return true;
      }),
    body('tipo_servicio').notEmpty().escape().withMessage('Tipo de servicio is required'),
    body('conexiones').notEmpty().escape().withMessage('Conexiones is required'),
    body('cobros').notEmpty().escape().withMessage('Cobros is required'),
    body('baldio').notEmpty().escape().withMessage('Baldio is required'),
]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('express-validator working', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    req.validatedData = matchedData(req);
    // req.validatedfile = matchedFile(req.files.file);
    next();
}


export { validateData, validate };