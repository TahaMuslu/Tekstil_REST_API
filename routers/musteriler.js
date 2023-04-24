const router = require('express').Router();
let musteriler = require('../data/musteriler.json');
const fs = require('fs');


router.get('/', (req, res) => {
    res.statusCode = 200;
    res.json(musteriler);
});

router.get('/:id', (req, res, next) => {
    const musteri = musteriler.find(m => m.musteri_id === parseInt(req.params.id));
    if (!musteri) {
        next({ statusCode: 404, message: 'Müşteri bulunamadı.' });
    } else {
        res.statusCode = 200;
        res.json(musteri);
    }
});

router.post('/', (req, res, next) => {

    const eklenecekMusteri = req.body;
    let new_id = musteriler.at(musteriler.length - 1).musteri_id + 1;
    const musteri = {
        musteri_id: new_id,
        ad: eklenecekMusteri.ad,
        soyad: eklenecekMusteri.soyad,
        unvan: eklenecekMusteri.unvan,
        adres: eklenecekMusteri.adres,
        sehir: eklenecekMusteri.sehir,
        ulke: eklenecekMusteri.ulke,
        telefon: eklenecekMusteri.telefon,
        sirket_ad: eklenecekMusteri.sirket_ad
    };

    if (!musteri.ad || !musteri.soyad || !musteri.unvan ||
        !musteri.adres || !musteri.sehir || !musteri.ulke || !musteri.telefon || !musteri.sirket_ad) {
        next({ statusCode: 400, message: 'Müşteri bilgileri eksik.' });
    }
    else {
        musteriler.push(musteri);
        fs.writeFile('data/musteriler.json', JSON.stringify(musteriler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Müşteri kaydedilemedi.' });
            }
        });
        res.statusCode = 201;
        res.json(musteri);
    }
});

router.put('/:id', (req, res, next) => {
    const guncellenecekMusteri = req.body;
    let musteri = musteriler.find(m => m.musteri_id === parseInt(req.params.id));
    if (!guncellenecekMusteri.ad || !guncellenecekMusteri.soyad || !guncellenecekMusteri.unvan ||
        !guncellenecekMusteri.adres || !guncellenecekMusteri.sehir || !guncellenecekMusteri.ulke ||
        !guncellenecekMusteri.telefon || !guncellenecekMusteri.sirket_ad || !musteri) {
        next({ statusCode: 404, message: 'Müşteri bulunamadı.' });
    } else {
        musteri.ad = guncellenecekMusteri.ad;
        musteri.soyad = guncellenecekMusteri.soyad;
        musteri.unvan = guncellenecekMusteri.unvan;
        musteri.adres = guncellenecekMusteri.adres;
        musteri.sehir = guncellenecekMusteri.sehir;
        musteri.ulke = guncellenecekMusteri.ulke;
        musteri.telefon = guncellenecekMusteri.telefon;
        musteri.sirket_ad = guncellenecekMusteri.sirket_ad;

        fs.writeFile('data/musteriler.json', JSON.stringify(musteriler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Müşteri güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(musteri);
    }
});

router.patch('/:id', (req, res, next) => {
    const guncellenecekMusteri = req.body;
    let musteri = musteriler.find(m => m.musteri_id === parseInt(req.params.id));
    if (!guncellenecekMusteri || !musteri) {
        next({ statusCode: 404, message: 'Müşteri bulunamadı.' });
    } else {
        guncellenecekMusteri.ad && (musteri.ad = guncellenecekMusteri.ad);
        guncellenecekMusteri.soyad && (musteri.soyad = guncellenecekMusteri.soyad);
        guncellenecekMusteri.unvan && (musteri.unvan = guncellenecekMusteri.unvan);
        guncellenecekMusteri.adres && (musteri.adres = guncellenecekMusteri.adres);
        guncellenecekMusteri.sehir && (musteri.sehir = guncellenecekMusteri.sehir);
        guncellenecekMusteri.ulke && (musteri.ulke = guncellenecekMusteri.ulke);
        guncellenecekMusteri.telefon && (musteri.telefon = guncellenecekMusteri.telefon);
        guncellenecekMusteri.sirket_ad && (musteri.sirket_ad = guncellenecekMusteri.sirket_ad);

        fs.writeFile('data/musteriler.json', JSON.stringify(musteriler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Müşteri güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(musteri);
    }
});

router.delete('/:id', (req, res, next) => {
    const musteri = musteriler.find(m => m.musteri_id === parseInt(req.params.id));
    if (!musteri) {
        next({ statusCode: 404, message: 'Müşteri bulunamadı.' });
    } else {
        const index = musteriler.indexOf(musteri);
        musteriler.splice(index, 1);
        fs.writeFile('data/musteriler.json', JSON.stringify(musteriler), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Müşteri silinemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(musteri);
    }
});







module.exports = router;