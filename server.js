const express = require('express');
const app = express();
const port = process.env.PORT || 80;

const getRouter = require('./routes/get_rfid');
const gettest = require('./routes/test_rfid');

app.use('/id', getRouter);
app.use('/test/newtest', gettest);

app.get('/', (req, res)=> {
    console.log('who get in root');
<<<<<<< HEAD
    res.send('/root');
=======
>>>>>>> 93065986ebb1c4a17b3bd81084ddf63ff88e4d31
});

app.use((req, res, next) => {
    res.status(404).send('Nottttt Found');
});

app.listen(port, ()=>{
    console.log('Server is running on' + port);
});
