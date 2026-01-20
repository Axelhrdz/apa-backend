import express from 'express';


const app = express();
const PORT = 3000;


//define the route
app.get('/', (req, res) => {
    res.send(
        {message: 'APA Backend running from aperturas_masivas branch, other one here'}
    );
});



//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});