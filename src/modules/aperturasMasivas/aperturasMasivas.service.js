const aperturasMasivasService = async (req) => {

    const file = req.files.file;
    const formData = req.body;

    // console.log('Data received from service');
    // console.log(file);
    // console.log(formData);


    



    return {
        file,
        formData
    }
    // return 'testing service';


    // return 'Apertura masiva service working, test number 2!!';
}

export default aperturasMasivasService;