const router = require('express').Router();
let urunler = require('../data/urunler.json');
const fs = require('fs');


router.get('/', (req, res) => {
    res.statusCode = 200;
    res.json(urunler);
});


router.get('/:id', (req, res, next) => {
    const urun = urunler.find(m => m.urun_id === parseInt(req.params.id));
    if (!urun) {
        next({ statusCode: 404, message: 'Ürün bulunamadı.' });
    } else {
        res.statusCode = 200;
        res.json(urun);
    }
});

router.post('/', (req, res, next) => {

    const eklenecekUrun = req.body;
    let new_id = urunler.at(urunler.length - 1).urun_id + 1;
    const urun = {
        urun_id: new_id,
        urun_adi: eklenecekUrun.urun_adi,
        paket_miktar: parseInt(eklenecekUrun.paket_miktar),
        paket_fiyat: parseInt(eklenecekUrun.paket_fiyat),
        stok: parseInt(eklenecekUrun.stok),
    };

    if (!urun.urun_adi || !urun.paket_miktar || !urun.paket_fiyat || !urun.stok) {
        next({ statusCode: 400, message: 'Ürün bilgileri eksik.' });
    }
    else {
        urunler.push(urun);
        fs.writeFile('data/urunler.json', JSON.stringify(urunler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Ürün kaydedilemedi.' });
            }
        });
        res.statusCode = 201;
        res.json(urun);
    }
});


router.put('/:id', (req, res, next) => {
    const guncellenecekUrun = req.body;
    let urun = urunler.find(m => m.urun_id === parseInt(req.params.id));
    if (!guncellenecekUrun.urun_adi || !guncellenecekUrun.paket_miktar || !guncellenecekUrun.paket_fiyat ||
        !guncellenecekUrun.stok || !urun) {
        next({ statusCode: 404, message: 'Ürün bulunamadı.' });
    } else {
        urun.urun_adi = guncellenecekUrun.urun_adi;
        urun.paket_miktar = parseInt(guncellenecekUrun.paket_miktar);
        urun.paket_fiyat = parseInt(guncellenecekUrun.paket_fiyat);
        urun.stok = parseInt(guncellenecekUrun.stok);

        fs.writeFile('data/urunler.json', JSON.stringify(urunler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Ürün güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(urun);
    }
});

router.patch('/:id', (req, res, next) => {
    const guncellenecekUrun = req.body;
    let urun = urunler.find(m => m.urun_id === parseInt(req.params.id));
    if (!guncellenecekUrun || !urun) {
        next({ statusCode: 404, message: 'Ürün bulunamadı.' });
    } else {
        guncellenecekUrun.urun_adi && (urun.urun_adi = guncellenecekUrun.urun_adi);
        guncellenecekUrun.paket_miktar && (urun.paket_miktar = parseInt(guncellenecekUrun.paket_miktar));
        guncellenecekUrun.paket_fiyat && (urun.paket_fiyat = parseInt(guncellenecekUrun.paket_fiyat));
        guncellenecekUrun.stok && (urun.stok = parseInt(guncellenecekUrun.stok));


        fs.writeFile('data/urunler.json', JSON.stringify(urunler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Ürün güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(urun);
    }
});

router.delete('/:id', (req, res, next) => {
    const urun = urunler.find(m => m.urun_id === parseInt(req.params.id));
    if (!urun) {
        next({ statusCode: 404, message: 'Ürün bulunamadı.' });
    } else {
        const index = urunler.indexOf(urun);
        urunler.splice(index, 1);
        fs.writeFile('data/urunler.json', JSON.stringify(urunler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Ürün silinemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(urun);
    }
});







module.exports = router;