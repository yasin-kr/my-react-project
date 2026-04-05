# Modul 1: Bilesenler

## Bugun Ne Isledik

Bu modulde React'in bilesen tabanli dusunme sekli, JSX ile arayuz tanimlama, props ile veri gecirme, kosullu render, listeleme, `key`, `props.children`, `main.jsx` uzerinden render, `StrictMode`, SPA mantigi ve `prop-types` konularini ele aldik.

## 1. Bilesen Mantigi

React'te arayuz kucuk parcalara bolunur. Her parca bir bilesendir ve genelde fonksiyon olarak yazilir.

```jsx
export const Product = () => {
  return <h2>Tacos</h2>;
};
```

Bir bilesen ekranda kullanildiginda React bu fonksiyonu calistirir ve `return` edilen JSX'i render eder.

```jsx
import { Product } from './Product';

export default function App() {
  return <Product />;
}
```

Ozet:

- `App` ust bilesendir.
- `Product` alt bilesendir.
- `<Product />` yazimi, bilesenin kullanildigi ve render sirasina girdigi yerdir.

## 2. JSX Kurallari

JSX, HTML'e benzer ama JavaScript icinde kullanilan daha kati bir yapidir.

```jsx
export const Product = () => {
  return (
    <div>
      <h2>Tacos</h2>
      <img
        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        alt="Tacos With Lime"
        width="640"
      />
      <p>Price: 999 credits</p>
    </div>
  );
};
```

Temel kurallar:

- Bos etiketler `/>` ile kapanir.
- Bilesen etiketleri de JSX oldugu icin `<Product />` ya da `<Product></Product>` seklinde yazilir.
- Bir bilesen tek bir kok oge dondurmelidir.

Gereksiz sarmalayici kullanmak istemedigimizde `Fragment` kullaniriz:

```jsx
return (
  <>
    <h2>Tacos</h2>
    <p>Price: 999 credits</p>
  </>
);
```

`Fragment`, DOM'a ekstra bir etiket eklemeden cocuklarini birlikte dondurur.

## 3. JSX Icinde JavaScript Kullanimi

JSX icinde JavaScript ifadeleri suslu parantez ile yazilir.

```jsx
export const Product = () => {
  const price = 999;

  return <p>Price: {price} credits</p>;
};
```

Oz niteliklerde de ayni kural gecerlidir:

```jsx
const imgUrl = 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product';

<img src={imgUrl} alt="Product" width={480} />;
```

Kisa not:

- Duz string ise `""`
- JavaScript ifadesi, degisken, sayi ya da boolean ise `{}`

## 4. Props ile Veri Gecirme

Props, ust bilesenden alt bilesene veri tasir.

```jsx
import { Product } from './Product';

export default function App() {
  return (
    <>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?dpr=2&h=480&w=640"
        price={14.29}
      />
    </>
  );
}
```

Alt bilesen bu verileri `props` nesnesi uzerinden alir:

```jsx
export const Product = ({ name, imgUrl, price }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={imgUrl} alt={name} width={480} />
      <p>Price: {price} credits</p>
    </div>
  );
};
```

Onemli:

- `props` bir nesnedir.
- Ister `props.name` diye kullanilir.
- Ister destructuring ile `{ name, imgUrl, price }` seklinde ayrilir.

## 5. Varsayilan Prop Degeri

Bir prop gelmezse deger `undefined` olur. Bunun icin JavaScript varsayilan parametreleri kullanilabilir.

```jsx
export const Product = ({
  name,
  imgUrl = 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder',
  price,
}) => {
  return (
    <div>
      <img src={imgUrl} alt={name} width={480} />
      <h2>{name}</h2>
      <p>Price: {price} credits</p>
    </div>
  );
};
```

Bu varsayilan deger sadece prop `undefined` oldugunda devreye girer.

## 6. Kosullu Render

React'te bir sey sadece belirli kosullarda gosterilecekse kosullu render kullanilir.

`&&` operatoru:

```jsx
const Mailbox = ({ username, messages }) => {
  return (
    <>
      <p>Hello {username}</p>
      {messages.length > 0 && (
        <p>You have {messages.length} unread messages</p>
      )}
    </>
  );
};
```

Anlami:

- Kosul `true` ise sag taraf render edilir.
- Kosul `false` ise React `false` degerini render etmez.

Ternary operatoru iki farkli ciktidan birini secmek icin uygundur:

```jsx
{messages.length > 0 ? (
  <p>You have unread messages</p>
) : (
  <p>No unread messages</p>
)}
```

## 7. Listeler ve `key`

Bir dizi uzerinden UI uretmek icin `map` kullanilir.

```jsx
const favouriteBooks = [
  { id: 'id-1', name: 'JS for beginners' },
  { id: 'id-2', name: 'React basics' },
  { id: 'id-3', name: 'React Router overview' },
];

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};
```

`key` neden gerekir:

- React listedeki ogeleri ayirt eder.
- Hangi ogenin eklendigini, silindigini ya da yer degistirdigini anlamayi kolaylastirir.

Iyi `key` ozellikleri:

- Ayni koleksiyon icinde essiz olmali
- Render'lar arasinda kararliligini korumali

Kacinilmasi gerekenler:

- `index`
- `Math.random()`
- `Date.now()`

`index` ancak liste tamamen statikse son care olarak dusunulmelidir.

## 8. `props.children`

Bir bilesen acilis ve kapanis etiketi ile kullanildiginda aradaki icerik otomatik olarak `props.children` icine gelir.

```jsx
const Card = ({ children }) => {
  return <div>{children}</div>;
};
```

Kullanim:

```jsx
<Card>
  <h2>Card title</h2>
  <p>Text between opening and closing tag</p>
</Card>
```

`children` sadece metin degil, etiketler ve baska bilesenler de olabilir.

## 9. Uygulamanin DOM'a Render Edilmesi

React uygulamasi genelde `main.jsx` icinde DOM'a baglanir.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Burada:

- `document.getElementById('root')` HTML icindeki kok alandir.
- `createRoot(...)` React kokunu olusturur.
- `render(<App />)` en ust bileseni DOM'a basar.

Tek bir `render` cagrisi yeterlidir. `App` icindeki tum alt bilesenler bu agacla birlikte render edilir.

## 10. StrictMode

`StrictMode`, gelistirme sirasinda potansiyel sorunlari fark etmeye yardim eden bir yardimci bilesendir.

```jsx
<StrictMode>
  <App />
</StrictMode>
```

Ne saglar:

- Kullanimi kalkmakta olan API'lere dair uyari
- Yan etkileri fark etmeyi kolaylastirma
- Daha guvenli ve temiz bir gelistirme deneyimi

`<React.StrictMode>` ile `<StrictMode>` ayni seydir. Fark sadece import bicimidir.

## 11. SPA Mantigi

React uygulamalari genelde SPA mantigi ile calisir.

SPA = Single Page Application

Temel mantik:

- Ilk yuklemede tek bir ana HTML sayfasi kullanilir.
- Sonraki gorunum degisiklikleri tarayici tarafinda yapilir.
- Her sayfa gecisinde yeni tam HTML dosyasi istemek gerekmez.

Bu sayede arayuz daha akici hissedilir.

## 12. Prop Types Notu

LMS'te `prop-types` anlatiyor, ancak burada guncel bir not dusmek onemli:

- Eski React egitimlerinde `prop-types` ile function component'ler icin gelistirme uyari sistemi anlatilir.
- React 19 ile function component'lerde `propTypes` ve `defaultProps` artik yok sayiliyor.
- Varsayilan prop ihtiyaci icin JavaScript varsayilan parametreleri kullaniliyor.
- Tip guvenligi icin modern yaklasim daha cok TypeScript tarafina kaymis durumda.

Yani konu kavramsal olarak faydali, fakat yeni React projelerinde davranis eski kaynaklarla birebir ayni olmayabilir.

## Terminoloji

- Component: Arayuzun kucuk ve bagimsiz parcasi
- JSX: JavaScript icinde HTML benzeri yapi
- Render: Bilesenin arayuz olarak ekrana basilmaya hazir hale gelmesi
- DOM: Tarayicidaki gercek HTML agaci
- Root: React uygulamasinin baglandigi ana DOM noktasi
- Props: Ust bilesenden alt bilesene aktarilan veri
- Destructuring: Nesne alanlarini daha kisa yazimla ayirma
- Fragment: DOM'a ekstra etiket eklemeden birden fazla ogeyi gruplama
- Conditional Rendering: Bir seyi sadece belli kosullarda gosterme
- `map`: Dizi uzerinden yeni bir dizi veya JSX listesi uretme
- `key`: React'in listedeki ogeleri ayirt etmek icin kullandigi kimlik
- `children`: Bilesenin acilis ve kapanis etiketi arasindaki icerik
- StrictMode: Gelistirme sirasinda sorunlari fark etmeye yardim eden arac
- SPA: Tek bir HTML uzerinden dinamik arayuz guncelleyen uygulama modeli
