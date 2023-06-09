<!-- omit in toc -->
# Tekstil_REST_API Projesi
---
Bu proje, örnek bir tekstil şirketinin REST API'sidir. Uygulama içinde yapabileceğiniz işlemler şunlardır:
- Müşteriler CRUD işlemleri
- Personeller CRUD işlemleri
- Ürünler CRUD işlemleri
---
# Kullanılan Teknolojiler
- [Node.js](https://nodejs.org/tr/)
- [Express.js](https://expressjs.com/)
- [Swagger](https://swagger.io/)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
---
# Kurulum

Bilgisayarınızda [Docker](https://www.docker.com/) **kurulu olmalıdır**. Docker kurulumu için [Docker Desktop](https://www.docker.com/products/docker-desktop) adresini ziyaret edebilirsiniz.

1-İlk olarak projeyi klonlayın.
```sh
git clone https://github.com/TahaMuslu/Tekstil_REST_API.git
```

2-Daha sonra projenin bulunduğu dizine girin.
```sh
cd Tekstil_REST_API
```

3-Projeyi build edin.
```sh
docker build -t tekstil_rest_api .
```
>Projenin docker imajına [tahamuslu/tekstil_rest_api](https://hub.docker.com/repository/docker/tahamuslu/tekstil_rest_api/general) adresinden ulaşabilirsiniz.

4-Projeyi çalıştırın.
```sh
docker run -d --rm --name tekstil_rest_api -p 5000:5000 tekstil_rest_api
```
5-Uygulamayı çalıştırdıktan sonra `http://localhost:5000` adresine giderek uygulamayı kullanabilirsiniz.
>Uygulama default olarak 5000 portunda çalışmaktadır. Portu değiştirmek için `Dockerfile` dosyasını düzenleyin.


Uygulamayı Sonlandırmak İçin
```sh
docker stop tekstil_rest_api
```

#LİSANS
[MIT © Taha Yasin Muslu](https://mit-license.org/)

