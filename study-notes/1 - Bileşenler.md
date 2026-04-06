# Modul 1: Bilesenler

## Unite 1: Temel Bilesen Mantigi

Bu unite'de React'in bilesen tabanli dusunme sekli, JSX ile arayuz tanimlama, props ile veri gecirme, kosullu render, listeleme, `key`, `props.children`, `main.jsx` uzerinden render, `StrictMode`, SPA mantigi ve `prop-types` konularini ele aldik.

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

## Unite 1 Terminoloji

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

## Unite 2: Stiller ve Stil Organizasyonu

Bu unite'de inline style, dinamik stiller, vanilla CSS, sinif yapilandirmasi, `clsx`, global namespace problemi, stillerin yeniden kullanimi, CSS Modules, `composes`, stil normalizasyonu ve React Icons konularini ele aldik.

## 1. Gömülü Stilller

React'te inline style, HTML'deki `style=""` mantigina benzer ama string yerine JavaScript object kullanilir.

```jsx
export const App = () => {
  return (
    <p
      style={{
        margin: 8,
        padding: '12px 16px',
        borderRadius: 4,
        backgroundColor: 'gray',
        color: 'white',
      }}
    >
      Please update your email!
    </p>
  );
};
```

Burada iki adet `{}` goruruz:

- Dis `{}` = JSX icinde JavaScript yazdigimizi belirtir
- Ic `{}` = stil object'inin kendisidir

Temel kurallar:

- CSS property adlari camelCase yazilir
- Tek sayisal degerlerde `px` cogu zaman otomatik eklenir
- Birden fazla deger veya farkli birim varsa string kullanilir

Dipnot:

- `...alertStyles` gibi object icinde kullanilan `...` = spread operatorudur
- Spread, var olan bir object'in alanlarini yeni object icine yayar
- Rest ise genelde parametre toplamak veya kalan alanlari ayirmak icin kullanilir

Kucuk fark:

```jsx
const base = { color: 'white' };
const next = { ...base, backgroundColor: 'blue' }; // spread

const { color, ...rest } = next; // rest
```

## 2. Stil Nesnesini Ayri Degiskene Alma

Inline style daha okunabilir olsun diye object ayri bir degiskende tutulabilir.

```jsx
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  backgroundColor: 'gray',
  color: 'white',
};

export const App = () => {
  return <p style={alertStyles}>Please update your email!</p>;
};
```

Bu yapi ayni stili birden fazla ogeye tekrar uygulamayi kolaylastirir.

## 3. Inline Style ile Ayrı `Alert` Bileseni

Stili daha moduler hale getirmek icin ayri bir bilesen yazilabilir.

```jsx
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  backgroundColor: 'gray',
  color: 'white',
};

export const Alert = ({ children }) => {
  return <p style={alertStyles}>{children}</p>;
};
```

Kullanim:

```jsx
<Alert>Please update your email!</Alert>
<Alert>Payment received, thank you for your purchase!</Alert>
```

Bu yapi:

- reusable olur
- kod tekrarini azaltir
- `children` kullanimini pratiklestirir

## 4. Dinamik Stilller

Bir veya daha fazla stil ozelligi prop'lara bagli olarak degistirilebilir.

```jsx
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  color: 'white',
};

const getBgColor = (variant) => {
  switch (variant) {
    case 'info':
      return 'blue';
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'warning':
      return 'orange';
    default:
      throw new Error(`Unsupported variant prop value - ${variant}`);
  }
};

export const Alert = ({ variant, children }) => {
  return (
    <p
      style={{
        ...alertStyles,
        backgroundColor: getBgColor(variant),
      }}
    >
      {children}
    </p>
  );
};
```

Onemli notlar:

- `variant` React'e ozel bir kelime degil, normal bir prop adidir
- `...alertStyles` burada `spread` operatorudur, `rest` degil
- Sonradan yazilan `backgroundColor`, ayni isimli eski degeri ezer

## 5. Inline Style Ne Zaman Kullanilir

Inline style kucuk orneklerde pratik olabilir ama ana stil yontemi olarak onerilmez.

Neden:

- pseudo-class ve media query gibi guclu CSS ozelliklerini dogrudan desteklemez
- buyuk projede bakimi zorlasir
- stil tekrarini artirabilir
- CSS tooling ekosisteminden daha az faydalanir

En uygun kullanim:

- dinamik olarak hesaplanan tekil degerler
- JavaScript ile anlik degisen width, color, backgroundImage gibi alanlar

Kucuk karsilastirma:

| Durum | Inline style uygun mu? | Neden |
| --- | --- | --- |
| Dinamik renk veya width hesabi | Evet | Deger JavaScript ile anlik hesaplanir |
| `:hover`, `:focus`, media query ihtiyaci | Hayir | Inline style bu CSS guclerini dogrudan sunmaz |
| Buyuk sayfa genel stil duzeni | Hayir | Bakim ve tekrar maliyeti artar |
| Tek bir ogeye ozel kisa stil | Evet | Kucuk durumda pratik olabilir |

## 6. Vanilla CSS

Vanilla CSS, normal `.css` dosyasi kullanarak stilleri ayri dosyada tutma yontemidir.

```css
/* Alert.css */
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}
```

Bu CSS dosyasi bilesen icinde import edilir:

```jsx
import './Alert.css';

export const Alert = ({ children }) => {
  return <p className="alert">{children}</p>;
};
```

Kisa not:

- HTML'deki `class` yerine JSX'te `className` kullanilir
- Vite gibi araclar CSS'i build surecine dahil eder
- CSS minify edilir ve uyumluluk araclari devreye girebilir

Mini not:

- Autoprefixer, bazi CSS ozelliklerine tarayici uyumlulugu icin gerekli prefixleri otomatik ekleyen aractir
- Polyfill mantigi ise, eski tarayicilarda eksik modern ozellikler icin destek katmani saglamayi ifade eder
- Bu araclar sayesinde modern CSS yazarken uyumluluk isi daha yonetilebilir hale gelir

## 7. Sınıf Yapilandirmasi

Variant mantigi bu kez CSS siniflariyla kurulur.

```css
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  color: white;
}

.alert.info {
  background-color: blue;
}

.alert.success {
  background-color: green;
}

.alert.error {
  background-color: red;
}

.alert.warning {
  background-color: orange;
}
```

JSX tarafinda birden fazla class bir dizi ile olusturulabilir:

```jsx
const Alert = ({ variant, children }) => {
  const classNames = ['alert', variant];

  return <p className={classNames.join(' ')}>{children}</p>;
};
```

Bu yapi ornegin `variant="success"` icin su stringi uretir:

```jsx
'alert success'
```

## 8. Boolean Prop ile Ek Siniflar

`outlined` ve `elevated` gibi prop'lar boolean olarak kullanilabilir.

```jsx
const Alert = ({ variant, outlined, elevated, children }) => {
  const classNames = ['alert', variant];

  if (outlined) {
    classNames.push('is-outlined');
  }

  if (elevated) {
    classNames.push('is-elevated');
  }

  return <p className={classNames.join(' ')}>{children}</p>;
};
```

JSX'te sadece prop adini yazmak, onu `true` yapmak demektir:

```jsx
<Alert variant="warning" outlined elevated>
  Please update your profile contact information
</Alert>
```

## 9. `clsx` Kutuphanesi

`clsx`, dinamik `className` uretimini sade ve okunur hale getiren bir yardimci kutuphanedir.

```jsx
import clsx from 'clsx';

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx('alert', variant, {
        'is-outlined': outlined,
        'is-elevated': elevated,
      })}
    >
      {children}
    </p>
  );
};
```

Ne saglar:

- `if`, `push`, `filter`, `join` tekrarini azaltir
- truthy olan class adaylarini birlestirir
- object yazimi ile `key = class`, `value = kosul` mantigi kurar

## 10. Küresel Isim Alani Problemi

Vanilla CSS'te dosyayi sadece ilgili bilesen icinde import etmek, onu otomatik olarak sadece o bilesene ozel yapmaz.

Ornek:

```css
/* FirstComponent.css */
.text {
  color: red;
}

/* SecondComponent.css */
.text {
  color: blue;
}
```

Bu iki sinif ayni global alanda yasadigi icin cakisabilir.

Bu sorunun sonuclari:

- zayif olceklendirilebilirlik
- naming convention ihtiyaci
- stil cakismaalari
- buyuk projede bakim zorlugu

## 11. Stillerin Yeniden Kullanimi

Farkli bilesenlerde ayni class'i tekrar tekrar kullanmak yerine ortak bir bilesen olusturmak daha iyidir.

```jsx
const Button = ({ variant, children }) => {
  return <button className={clsx('button', variant)}>{children}</button>;
};

const LoginButton = () => {
  return <Button variant="primary">Login</Button>;
};

const FollowButton = () => {
  return <Button variant="secondary">Follow</Button>;
};
```

Buradaki fikir:

- `Button` = ortak stil ve ortak gorunum mantigi
- `LoginButton` / `FollowButton` = daha ozel, anlamsal bilesenler

Bu, class tekrarindan daha moduler bir yaklasimdir.

## 12. CSS Modules

CSS Modules, `.module.css` dosyalari ile calisir ve class adlarini build sirasinda benzersiz hale getirir.

```css
/* Alert.module.css */
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}
```

JSX tarafinda import edilen sey bir esleme nesnesi gibi kullanilir:

```jsx
import css from './Alert.module.css';

export const Alert = ({ children }) => {
  return <p className={css.alert}>{children}</p>;
};
```

Burada:

- `css.alert` = yazdigimiz `alert` sinifinin uretilmis benzersiz karsiligi
- bu sayede farkli dosyalarda ayni class adi kullanilsa bile cakismaz

`css.alert` dot notation, `css[variant]` ise bracket notation kullanimidir.

Mini ornek:

```jsx
console.log(css.alert); // dot notation

const key = 'success';
console.log(css[key]); // bracket notation
```

Kisa mantik:

- Dot notation sabit property adlarinda kullanilir
- Bracket notation degiskenle gelen veya dinamik property adlarinda kullanilir

## 13. `composes` Ozelligi

`composes`, bir CSS Module sinifinin baska bir sinifin stillerini devralmasini saglar.

```css
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}

.success {
  composes: alert;
  background-color: green;
}
```

Anlam:

- `.success`, `.alert` stillerini de alsin
- sonra kendi `background-color` degerini uygulasin

Bu sayede JSX tarafinda temel class ile varyant class'i ayrica birlestirmek zorunda kalmayabiliriz:

```jsx
import css from './Alert.module.css';

const Alert = ({ variant, children }) => {
  return <p className={css[variant]}>{children}</p>;
};
```

## 14. CSS Modules + `clsx`

`composes` ile temel stiller varyantlara tasinabilir, `clsx` ile de opsiyonel class'lar eklenebilir.

```jsx
import clsx from 'clsx';
import css from './Alert.module.css';

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx(css[variant], {
        [css.isOutlined]: outlined,
        [css.isElevated]: elevated,
      })}
    >
      {children}
    </p>
  );
};
```

Burada:

- `css[variant]` = varyant class'i
- `[css.isOutlined]: outlined` = `outlined` true ise ilgili class eklenir
- camelCase sinif adlari, `css.isOutlined` gibi daha rahat erisim saglar

## 15. Stil Normalizasyonu

Tarayicilar HTML etiketlerini farkli varsayilan stillerle gosterebilir. Bunu dengelemek icin normalizasyon yapilir.

LMS'te onerilen paket:

```bash
npm install modern-normalize
```

Sonra `main.jsx` icinde global olarak import edilir:

```jsx
import 'modern-normalize';
import './index.css';
```

Bu import, uygulamanin giris noktasinda oldugu icin tum proje agacini etkiler.

Ek olarak `index.css` icinde temel global kurallar tanimlanabilir:

```css
body {
  font-family: sans-serif;
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
}

img {
  display: block;
  max-width: 100%;
}
```

## 16. React Icons

`react-icons`, farkli ikon setlerini React bileseni gibi kullanmamizi saglar.

Kurulum:

```bash
npm install react-icons
```

Kullanim:

```jsx
import { HiUser } from 'react-icons/hi';

const UserMenu = ({ name }) => {
  return (
    <div>
      <p>
        <HiUser className="my-icon" size={24} /> {name}
      </p>
    </div>
  );
};
```

Notlar:

- Ikonlar React bileseni gibi kullanilir
- `className` ile CSS verilebilir
- `size={24}` ikonu 24px yapar
- renk cogu zaman `color` ile kontrol edilir

## Unite 2 Terminoloji

- Inline style: Stilin JSX icinde object olarak yazilmasi
- Spread operator (`...`): Bir object'in alanlarini yeni object icine yayma
- Vanilla CSS: Normal `.css` dosyasi ile stil verme yontemi
- `className`: JSX'te CSS sinifi vermek icin kullanilan ozellik
- Boolean prop: `true`, `false` veya `undefined` mantigiyla calisan prop
- `clsx`: Dinamik className string'i ureten yardimci kutuphane
- Global namespace: Tum class adlarinin ayni global alani paylasmasi
- CSS Modules: Class adlarini benzersiz hale getiren build tabanli sistem
- `composes`: Bir CSS Module sinifinin diger bir sinifi icine almasi
- Normalization: Tarayicilar arasi varsayilan stil farklarini dengeleme
- `modern-normalize`: Stil normalizasyonu icin kullanilan kutuphane
- React Icons: Ikonlari React bileseni gibi kullanmaya yarayan kutuphane
