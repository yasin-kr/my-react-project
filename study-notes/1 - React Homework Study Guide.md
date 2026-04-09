# 1. Odev - React Homework Study Guide

Bu dosya, projeyi daha rahat okuyup anlaman icin hazirlanmis ozet bir rehberdir.
AmaÃ§: yarin tabletten acip projeyi hizli ama bilincli sekilde tekrar edebilmen.

## 1. Projenin Amaci

Bu proje React 1. modul odevine ait 3 gorevi tek bir sayfada gosteren bir uygulamadir:

1. `Profile`
2. `FriendList`
3. `TransactionHistory`

Tum veri sabit olarak JSX icine yazilmak yerine JSON dosyalarindan alinmistir.

## 2. Genel Dosya Yapisi

```text
src/
  components/
    App/
      App.jsx
      App.module.css
    Profile/
      Profile.jsx
      Profile.module.css
    FriendList/
      FriendList.jsx
      FriendList.module.css
    FriendListItem/
      FriendListItem.jsx
      FriendListItem.module.css
    TransactionHistory/
      TransactionHistory.jsx
      TransactionHistory.module.css
  userData.json
  friends.json
  transactions.json
  main.jsx
  index.css
```

## 3. Uygulama Nasil Calisiyor

Akis soyle:

1. `main.jsx` uygulamayi baslatir.
2. `App.jsx` kok bileseni render eder.
3. `App.jsx` JSON dosyalarindan verileri alir.
4. Bu veriler prop olarak ilgili bilesenlere gonderilir.
5. Her bilesen kendi verisini ekrana basar.

## 4. main.jsx

Dosya: `src/main.jsx`

Gorevi:

- React uygulamasini baslatmak
- global stil dosyasini eklemek
- `App` bilesenini `root` icine render etmek

Mantik:

- `createRoot(document.getElementById('root'))`
- `App` bilesenini ekrana yerleÅŸtirir

Burasi genelde uygulamanin giris noktasi olarak dusunulur.

## 5. App.jsx

Dosya: `src/components/App/App.jsx`

Bu projenin en onemli dosyasidir.

Gorevi:

- tum gorevleri tek sayfada gostermek
- JSON verilerini import etmek
- ilgili bilesenlere prop gecmek

Bu dosyada sunlar import edilir:

- `Profile`
- `FriendList`
- `TransactionHistory`
- `userData.json`
- `friends.json`
- `transactions.json`

### App mantigi

`App` icinde:

- `Profile` bilesenine `name`, `tag`, `location`, `image`, `stats` prop'lari gecilir
- `FriendList` bilesenine `friends` prop'u gecilir
- `TransactionHistory` bilesenine `items` prop'u gecilir

Bu, React'te en onemli konulardan biri olan `props ile veri aktarma` mantigidir.

## 6. Profile Bileseni

Dosya: `src/components/Profile/Profile.jsx`

Bu bilesen tek bir kullaniciyi gosterir.

Bekledigi prop'lar:

- `name`
- `tag`
- `location`
- `image`
- `stats`

### JSX yapisi

Iki ana bolum vardir:

1. Ust kisim:
   - avatar
   - isim
   - tag
   - location

2. Alt kisim:
   - followers
   - views
   - likes

### Dikkat edilmesi gereken mantik

`stats` bir nesnedir. Yani:

- `stats.followers`
- `stats.views`
- `stats.likes`

sekilde kullanilir.

Bu, nested object kullaniminin guzel bir ornegidir.

## 7. FriendList Bileseni

Dosya: `src/components/FriendList/FriendList.jsx`

Bu bilesen bir dizi alir:

- `friends`

ve bu diziyi liste halinde ekrana basar.

### En onemli konu: `.map()`

Buradaki temel mantik:

- dizi icindeki her eleman icin bir `li` olusturulur
- her `li` icinde bir `FriendListItem` render edilir

Yani bu dosya liste olusturur, tek karti ise `FriendListItem` cizer.

### Neden `key` kullaniliyor?

React, listedeki elemanlari takip edebilmek icin `key` ister.

Bu projede:

- `key={friend.id}`

kullanilir.

Bu, liste render ederken cok onemlidir.

## 8. FriendListItem Bileseni

Dosya: `src/components/FriendListItem/FriendListItem.jsx`

Bu bilesen tek bir arkadas kartini gosterir.

Bekledigi prop'lar:

- `avatar`
- `name`
- `isOnline`

### JSX yapisi

Kart icinde:

- avatar resmi
- isim
- durum yazisi

bulunur.

### Kosullu render mantigi

Buradaki en onemli kisim:

```jsx
{isOnline ? 'Online' : 'Offline'}
```

ve

```jsx
className={isOnline ? css.isOnline : css.isOffline}
```

Bu iki satir sayesinde:

- eger `isOnline` true ise yazi `Online` olur
- eger false ise yazi `Offline` olur
- ayni anda uygun renk sinifi uygulanir

Bu, React'te `ternary operator` kullaniminin cok guzel bir ornegidir.

## 9. TransactionHistory Bileseni

Dosya: `src/components/TransactionHistory/TransactionHistory.jsx`

Bu bilesen bir tablo olusturur.

Bekledigi prop:

- `items`

Bu prop bir dizi islem nesnesidir.

### JSX yapisi

Iki bolumden olusur:

1. `thead`
   - tablo basliklari
   - Type / Amount / Currency

2. `tbody`
   - `items.map()` ile satirlar olusturulur

### En onemli mantik

Her islem icin bir `tr` olusur:

- `item.type`
- `item.amount`
- `item.currency`

Bu da yine `map()` ile veri render etmenin baska bir ornegidir.

## 10. JSON Dosyalari Neden Kullaniliyor?

Bu projede 3 farkli JSON dosyasi var:

- `userData.json`
- `friends.json`
- `transactions.json`

Bunlarin amaci:

- `App.jsx` icini daha temiz tutmak
- veriyi component disinda saklamak
- sabit veriyi daha duzenli yonetmek

Bu odevin en onemli gereksinimlerinden biri de buydu.

## 11. CSS Module Mantigi

Bu projede klasik CSS yerine CSS Modules kullaniliyor.

Ornek:

```jsx
import css from './Profile.module.css';
```

ve sonra:

```jsx
className={css.profile}
```

Bu yontemin avantajlari:

- class isimleri cakÄ±ÅŸmaz
- stiller component'e ozel olur
- proje daha duzenli olur

## 12. Bu Projede Ogrenilen Ana Konular

Bu projeyi bilirsen su konulari da biliyor olursun:

- React component yapisi
- props kullanimi
- JSON import etme
- liste render etme
- `map()` kullanimi
- `key` mantigi
- kosullu yazi ve kosullu class yazma
- tablo render etme
- CSS Modules ile stillendirme
- component klasor yapisi kurma

## 13. Yarinki Tekrar Icin Okuma Sirasi

Tabletten okurken su sirayla gitmen cok faydali olur:

1. `main.jsx`
2. `App.jsx`
3. `userData.json`
4. `Profile.jsx`
5. `friends.json`
6. `FriendList.jsx`
7. `FriendListItem.jsx`
8. `transactions.json`
9. `TransactionHistory.jsx`
10. ilgili `.module.css` dosyalari

Bu sirayla bakarsan veri akis mantigi cok daha kolay oturur.

## 14. Kendine Sorabilecegin Sorular

Projeyi iyice anlamak icin kendine sunlari sor:

1. `App` neden kok bilesen?
2. Neden verileri direkt JSX icine yazmadik?
3. `map()` neden kullaniliyor?
4. `key` neden gerekli?
5. `FriendList` ile `FriendListItem` neden ayrildi?
6. `isOnline` nasil hem yazi hem renk degistiriyor?
7. `TransactionHistory` neden tablo ile yazildi?
8. CSS Module neden normal CSS'ten daha duzenli?

## 15. Ezberlenecek Kucuk Kaliplar

### Component import

```jsx
import Profile from '../Profile/Profile';
```

### JSON import

```jsx
import userData from '../../userData.json';
```

### Prop gonderme

```jsx
<Profile name={userData.username} />
```

### Liste render etme

```jsx
items.map(item => ...)
```

### Kosullu ifade

```jsx
isOnline ? 'Online' : 'Offline'
```

### CSS Module kullanimi

```jsx
import css from './File.module.css';
className={css.className}
```

## 16. Son Not

Bu projeyi anlamanin en iyi yolu kodu sadece okumak degil, her dosya icin su cumleyi kurmaktir:

`Bu dosya ne aliyor, ne yapiyor, ne render ediyor?`

Eger bu 3 soruya cevap verebiliyorsan, projeyi gercekten anlamaya baslamissin demektir.

