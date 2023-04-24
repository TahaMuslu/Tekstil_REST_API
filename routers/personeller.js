const router = require('express').Router();
let personeller = require('../data/personeller.json');
const fs = require('fs');


router.get('/', (req, res) => {
    res.statusCode = 200;
    res.json(personeller);
});

router.get('/:id', (req, res, next) => {
    const personel = personeller.find(m => m.personel_id === parseInt(req.params.id));
    if (!personel) {
        next({ statusCode: 404, message: 'Personel bulunamadı.' });
    } else {
        res.statusCode = 200;
        res.json(personel);
    }
});

router.post('/', (req, res, next) => {

    const eklenecekPersonel = req.body;
    let new_id = personeller.at(personeller.length - 1).personel_id + 1;
    const personel = {
        personel_id: new_id,
        ad: eklenecekPersonel.ad,
        soyad: eklenecekPersonel.soyad,
        ise_baslama_tarih: eklenecekPersonel.ise_baslama_tarih,
        unvan: eklenecekPersonel.unvan,
        adres: eklenecekPersonel.adres,
        sehir: eklenecekPersonel.sehir,
        ulke: eklenecekPersonel.ulke,
        telefon: eklenecekPersonel.telefon,
        dogum_tarihi: eklenecekPersonel.dogum_tarihi,
        maas: parseInt(eklenecekPersonel.maas),
        cinsiyet: eklenecekPersonel.cinsiyet
    };

    if (!personel.ad || !personel.soyad || !personel.ise_baslama_tarih || !personel.unvan ||
        !personel.adres || !personel.sehir || !personel.ulke || !personel.telefon ||
        !personel.dogum_tarihi || !personel.maas || !personel.cinsiyet) {
        next({ statusCode: 400, message: 'Personel bilgileri eksik.' });
    }
    else {
        personeller.push(personel);
        fs.writeFile('data/personeller.json', JSON.stringify(personeller), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Personel kaydedilemedi.' });
            }
        });
        res.statusCode = 201;
        res.json(personel);
    }
});


router.put('/:id', (req, res, next) => {
    const guncellenecekPersonel = req.body;
    let personel = personeller.find(m => m.personel_id === parseInt(req.params.id));
    if (!guncellenecekPersonel.ad || !guncellenecekPersonel.soyad || !guncellenecekPersonel.ise_baslama_tarih ||
        !guncellenecekPersonel.unvan || !guncellenecekPersonel.adres || !guncellenecekPersonel.sehir ||
        !guncellenecekPersonel.ulke || !guncellenecekPersonel.telefon || !guncellenecekPersonel.dogum_tarihi ||
        !guncellenecekPersonel.maas || !guncellenecekPersonel.cinsiyet || !personel) {
        next({ statusCode: 404, message: 'Personel bulunamadı.' });
    } else {
        personel.ad = guncellenecekPersonel.ad;
        personel.soyad = guncellenecekPersonel.soyad;
        personel.ise_baslama_tarih = guncellenecekPersonel.ise_baslama_tarih;
        personel.unvan = guncellenecekPersonel.unvan;
        personel.adres = guncellenecekPersonel.adres;
        personel.sehir = guncellenecekPersonel.sehir;
        personel.ulke = guncellenecekPersonel.ulke;
        personel.telefon = guncellenecekPersonel.telefon;
        personel.dogum_tarihi = guncellenecekPersonel.dogum_tarihi;
        personel.maas = parseInt(guncellenecekPersonel.maas);
        personel.cinsiyet = guncellenecekPersonel.cinsiyet;

        fs.writeFile('data/personeller.json', JSON.stringify(personeller), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Personel güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(personel);
    }
});

router.patch('/:id', (req, res, next) => {
    const guncellenecekPersonel = req.body;
    let personel = personeller.find(m => m.personel_id === parseInt(req.params.id));
    if (!guncellenecekPersonel || !personel) {
        next({ statusCode: 404, message: 'Personel bulunamadı.' });
    } else {
        guncellenecekPersonel.ad && (personel.ad = guncellenecekPersonel.ad);
        guncellenecekPersonel.soyad && (personel.soyad = guncellenecekPersonel.soyad);
        guncellenecekPersonel.ise_baslama_tarih && (personel.ise_baslama_tarih = guncellenecekPersonel.ise_baslama_tarih);
        guncellenecekPersonel.unvan && (personel.unvan = guncellenecekPersonel.unvan);
        guncellenecekPersonel.adres && (personel.adres = guncellenecekPersonel.adres);
        guncellenecekPersonel.sehir && (personel.sehir = guncellenecekPersonel.sehir);
        guncellenecekPersonel.ulke && (personel.ulke = guncellenecekPersonel.ulke);
        guncellenecekPersonel.telefon && (personel.telefon = guncellenecekPersonel.telefon);
        guncellenecekPersonel.dogum_tarihi && (personel.dogum_tarihi = guncellenecekPersonel.dogum_tarihi);
        guncellenecekPersonel.maas && (personel.maas = parseInt(guncellenecekPersonel.maas));
        guncellenecekPersonel.cinsiyet && (personel.cinsiyet = guncellenecekPersonel.cinsiyet);

        fs.writeFile('data/personeller.json', JSON.stringify(personeller), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Personel güncellenemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(personel);
    }
});

router.delete('/:id', (req, res, next) => {
    const personel = personeller.find(m => m.personel_id === parseInt(req.params.id));
    if (!personel) {
        next({ statusCode: 404, message: 'Müşteri bulunamadı.' });
    } else {
        const index = personeller.indexOf(personel);
        personeller.splice(index, 1);
        fs.writeFile('data/personeller.json', JSON.stringify(personeller), (err) => {
            if (err) {
                next({ statusCode: 500, message: 'Müşteri silinemedi.' });
            }
        });
        res.statusCode = 200;
        res.json(personel);
    }
});


module.exports = router;