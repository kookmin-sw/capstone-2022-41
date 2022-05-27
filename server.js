const express = require('express');
const app = express();
const port = process.env.PORT || 80;

const getRouter = require('./routes/get_rfid');
// const postRouter = require('./routes/post_rfid');
const gettest = require('./routes/test_rfid');

app.use('/id', getRouter);
// app.use('/rfid', postRouter);
app.use('/test/newtest', gettest);

app.get('/', (req, res)=> {
    console.log('who get in root');
});

app.use((req, res, next) => {
    res.status(404).send('Nottttt Found');
});

app.listen(port, ()=>{
    console.log('Server is running on' + port);
});
