// Importing modules
const express = require('express');
const musterilerRouter = require('./routers/musteriler');
const personellerRouter = require('./routers/personeller');
const urunlerRouter = require('./routers/urunler');
const swaggerRouter = require('./routers/swagger');
const errorHandling = require('./middlewares/error_handling');
const logger = require('./middlewares/logger');

// App
const app = express();

// Middlewares
app.use(express.json());
app.use(logger);


// Routers
app.use('/musteriler', musterilerRouter);
app.use('/personeller', personellerRouter);
app.use('/urunler', urunlerRouter);
app.use('/', swaggerRouter);


// Error Handling
app.use(errorHandling);

// Not Found
app.use((req, res, next) => {
    res.status(404).send("Üzgünüz, böyle bir sayfa bulunamadı.");
});

app.listen(5000, () => {
    console.log('REST API 5000 portunda çalışıyor!');
});
