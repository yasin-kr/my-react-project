# Modul 5: React Router

Bu dosya, `5.Ders-1.pdf` ve `5.Ders-2.pdf` icindeki React Router konularini basit, bolunmus ve tekrar edilebilir sekilde anlatir.

Bu modulde ana fikir sudur:

- URL'ye gore farkli React bilesenleri gostermek
- Sayfalar arasinda yenileme olmadan gezinmek
- Dinamik URL parametreleri kullanmak
- Nested route yapisi kurmak
- Query string ile filtreleme bilgisini URL'de tutmak
- Programatik navigasyon yapmak
- `useLocation`, `location.state`, `React.lazy` ve `Suspense` mantigini anlamak

---

## Unite 1: Routing Temelleri

Routing, uygulamada hangi URL'de hangi sayfanin gosterilecegini belirleyen yapidir.

Ornek:

```txt
/          -> Home
/about     -> About
/products  -> Products
```

React'in icinde routing sistemi yerlesik olarak gelmez. Bu yuzden React uygulamalarinda genelde `react-router-dom` kullanilir.

---

## 1. Routing Nedir?

Routing, URL ile ekranda gosterilecek bileseni eslestirmektir.

Kullanici `/about` adresine giderse About sayfasi gosterilir.

Kullanici `/products` adresine giderse Products sayfasi gosterilir.

Mini fikir:

```txt
URL degisir.
React Router bu URL'ye bakar.
Eslesen component'i ekranda gosterir.
```

### Sorular ve Cevaplar

1. Routing ne demektir?
   Cevap: URL'ye gore hangi bilesenin gosterilecegini belirlemektir.
2. React'te routing yerlesik olarak var mi?
   Cevap: Hayir.
3. React'te routing icin hangi kutuphane kullanilir?
   Cevap: `react-router-dom`
4. `/about` adresi neyi temsil edebilir?
   Cevap: About sayfasini.
5. Routing neden onemlidir?
   Cevap: Kullanici farkli sayfalara URL ile ulasabilsin diye.

---

## 2. URL Yapisi

URL, uygulamadaki adres gibidir.

Ornek URL:

```txt
https://mysite.com/books/e3q76gm9lzk?category=adventure&status=unread#comments
```

Parcalari:

- `https://`: protokol
- `mysite.com`: host
- `/books/e3q76gm9lzk`: path
- `e3q76gm9lzk`: URL parametresi olabilir
- `?category=adventure&status=unread`: query string
- `category=adventure`: parametre-deger cifti
- `&`: query parametrelerini ayirir
- `#comments`: hash/ankraj

### Sorular ve Cevaplar

1. URL neyi temsil eder?
   Cevap: Uygulamada bulunulan adresi.
2. Path nedir?
   Cevap: Hosttan sonra gelen yol kismidir.
3. Query string hangi sembolle baslar?
   Cevap: `?`
4. Query parametreleri hangi sembolle ayrilir?
   Cevap: `&`
5. Hash hangi sembolle baslar?
   Cevap: `#`

---

## 3. Navigasyon Gecmisi

Tarayici, kullanicinin gezdigi sayfalari history stack icinde saklar.

Basit benzetme:

```txt
Her yeni sayfa, kagit yigininin ustune eklenir.
Geri tusu, ustteki kagidi kaldirip onceki sayfaya doner.
```

React Router, tarayicinin History API mantigini kullanarak sayfa yenilemeden URL degistirir.

### Sorular ve Cevaplar

1. Navigasyon gecmisi neyi saklar?
   Cevap: Kullanicinin gezdigi URL kayitlarini.
2. Geri tusu ne yapar?
   Cevap: Onceki history kaydina doner.
3. React Router sayfayi her seferinde yeniden yukler mi?
   Cevap: Hayir.
4. History stack neye benzetilebilir?
   Cevap: Ust uste konan kagitlara.
5. React Router hangi tarayici ozelliginden yararlanir?
   Cevap: History API.

---

## 4. BrowserRouter

`BrowserRouter`, React Router sisteminin uygulamadaki kapsayicisidir.

Uygulama genelde `main.jsx` icinde `BrowserRouter` ile sarilir.

Mini kod:

```jsx
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Burada:

- `BrowserRouter` URL bilgisini takip eder
- Altindaki tum bilesenlere router bilgisi saglar
- `Routes`, `Route`, `Link`, `NavLink` gibi yapilarin calismasini saglar

### Sorular ve Cevaplar

1. `BrowserRouter` ne ise yarar?
   Cevap: Router sistemini uygulamaya saglar.
2. `BrowserRouter` genelde nerede kullanilir?
   Cevap: `main.jsx` icinde.
3. `App` neden `BrowserRouter` ile sarilir?
   Cevap: App icindeki route ve link yapilari calissin diye.
4. `BrowserRouter` URL'yi takip eder mi?
   Cevap: Evet.
5. `BrowserRouter` olmadan `Routes` kullanmak dogru mu?
   Cevap: Hayir.

---

## 5. Routes ve Route

`Route`, bir URL ile bir component'i eslestirir.

`Routes`, tum route listesini saran kapsayicidir.

Mini kod:

```jsx
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};
```

Burada:

- `path="/"`: ana sayfa
- `element={<Home />}`: bu URL'de gosterilecek component
- `Routes`: mevcut URL'ye en uygun `Route`u secer

### Sorular ve Cevaplar

1. `Route` ne yapar?
   Cevap: URL ile component eslestirir.
2. `Routes` ne yapar?
   Cevap: Route listesinden uygun olani secer.
3. `path` prop'u neyi belirtir?
   Cevap: URL yolunu.
4. `element` prop'u neyi belirtir?
   Cevap: Gosterilecek JSX/component'i.
5. `Route` tek basina `Routes` disinda kullanilir mi?
   Cevap: Kullanilmamalidir.

---

## 6. Sayfa Bilesenleri

Sayfa bilesenleri, uygulamadaki ana sayfalari temsil eder.

Ornek:

```txt
Home.jsx
About.jsx
Products.jsx
NotFound.jsx
```

Genelde sayfa bilesenleri `src/pages` klasorunde tutulur. Bu projede dersleri ayri tutmak icin `src/components/React-5` icinde tutulabilir.

Mini kod:

```jsx
const Home = () => {
  return <h1>Home page</h1>;
};

export default Home;
```

### Sorular ve Cevaplar

1. Sayfa bileseni nedir?
   Cevap: Bir URL'de gosterilen ana componenttir.
2. Home sayfasi hangi URL'de gosterilebilir?
   Cevap: `/`
3. About sayfasi hangi URL'de gosterilebilir?
   Cevap: `/about`
4. Sayfa bilesenleri genelde nerede tutulur?
   Cevap: `src/pages` veya projeye gore ayrilmis sayfa klasorunde.
5. Sayfa bileseni JSX dondurur mu?
   Cevap: Evet.

---

## 7. NotFound Sayfasi

Kullanici tanimli olmayan bir URL'ye giderse bos ekran gormemelidir.

Bu durumda `path="*"` kullanilir.

Mini kod:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

`*` su anlama gelir:

```txt
Onceki rotalardan hicbiri eslesmezse bunu goster.
```

### Sorular ve Cevaplar

1. `NotFound` sayfasi ne icin kullanilir?
   Cevap: Tanimsiz URL'lerde kullaniciyi bilgilendirmek icin.
2. Her URL ile eslesebilen path nedir?
   Cevap: `*`
3. `path="*"` genelde route listesinin neresinde olur?
   Cevap: En sonunda.
4. Yanlis URL'ye gidilirse ne gosterilir?
   Cevap: NotFound sayfasi.
5. NotFound olmadan ne olabilir?
   Cevap: Kullanici bos veya anlamsiz ekran gorebilir.

---

## 8. Link ve NavLink

Normal HTML'de sayfalar arasi gecis icin `<a>` etiketi kullanilir.

Ama React Router uygulamasinda genelde `Link` veya `NavLink` kullanilir.

Neden?

```txt
<a> sayfayi yeniden yukleyebilir.
Link/NavLink sayfa yenilemeden URL degistirir.
```

Mini kod:

```jsx
import { Link, NavLink } from 'react-router-dom';

<Link to="/products">Products</Link>
<NavLink to="/about">About</NavLink>
```

Fark:

- `Link`: normal gezinme linki
- `NavLink`: aktif sayfayi stillendirmek icin kullanisli

### Sorular ve Cevaplar

1. React Router'da sayfa yenilemeden link vermek icin ne kullanilir?
   Cevap: `Link` veya `NavLink`
2. `to` prop'u neyi belirtir?
   Cevap: Gidilecek URL'yi.
3. `NavLink` ne fark saglar?
   Cevap: Aktif link bilgisini verir.
4. `<a href>` neden her zaman tercih edilmez?
   Cevap: Sayfayi yeniden yukleyebilir.
5. Aktif linke stil vermek icin hangisi daha uygundur?
   Cevap: `NavLink`

---

## 9. NavLink ile Aktif Stil

`NavLink`, `className` prop'una fonksiyon verebilir.

Bu fonksiyon `isActive` bilgisi alir.

Mini kod:

```jsx
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx('link', isActive && 'active');
};

<NavLink to="/about" className={buildLinkClass}>
  About
</NavLink>
```

Burada:

- Link aktifse `active` class'i eklenir
- Aktif degilse sadece `link` class'i kalir

### Sorular ve Cevaplar

1. `NavLink` aktif olup olmadigini bilir mi?
   Cevap: Evet.
2. `isActive` neyi ifade eder?
   Cevap: Linkin mevcut URL ile eslesip eslesmedigini.
3. `clsx` ne icin kullanilir?
   Cevap: Kosullu class birlestirmek icin.
4. Aktif linke farkli renk verilebilir mi?
   Cevap: Evet.
5. `Link` otomatik aktif class verir mi?
   Cevap: Hayir, bunun icin `NavLink` daha uygundur.

---

## 10. URL Parametreleri

URL parametresi, URL'nin degisebilen parcasidir.

Ornek route:

```jsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

Bu route su URL'lerle eslesebilir:

```txt
/products/1
/products/2
/products/abc
```

Burada:

- `:productId` parametre adidir
- URL'deki gercek deger `1`, `2` veya `abc` olabilir

### Sorular ve Cevaplar

1. URL parametresi ne ise yarar?
   Cevap: Tek route ile farkli detay sayfalarini gostermeye yarar.
2. Parametre tanimlamak icin hangi sembol kullanilir?
   Cevap: `:`
3. `/products/:productId` icin `/products/5` eslesir mi?
   Cevap: Evet.
4. Parametre adi anlamli olmali mi?
   Cevap: Evet.
5. Parametre degeri genelde ne olur?
   Cevap: ID gibi benzersiz bir deger.

---

## 11. useParams Hook'u

`useParams`, URL'deki dinamik parametreleri okumak icin kullanilir.

Route:

```jsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

Component:

```jsx
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();

  return <p>Now showing product with id - {productId}</p>;
};
```

URL:

```txt
/products/2
```

Sonuc:

```txt
productId = "2"
```

### Sorular ve Cevaplar

1. `useParams` ne dondurur?
   Cevap: URL parametrelerini iceren bir nesne.
2. Parametre degeri hangi isimle okunur?
   Cevap: Route'ta verilen parametre adi ile.
3. `/products/:productId` icin hangi degisken okunur?
   Cevap: `productId`
4. Parametre degeri string midir?
   Cevap: Evet, URL'den geldigi icin string olur.
5. Parametre ile backend'e istek atilabilir mi?
   Cevap: Evet.

---

## 12. Nested Routes

Nested route, bir ana sayfanin icinde alt sayfalar gostermektir.

Ornek:

```txt
/about
/about/mission
/about/vision
/about/team
```

Burada `/about` ana sayfadir.

`mission`, `vision`, `team` ise About icinde gosterilen alt route'lardir.

Mini kod:

```jsx
<Route path="/about" element={<About />}>
  <Route path="mission" element={<Mission />} />
  <Route path="vision" element={<Vision />} />
  <Route path="team" element={<Team />} />
</Route>
```

Onemli:

```txt
Alt route path'i basinda / olmadan yazilir.
path="mission" dogru.
path="/mission" bu senaryo icin yanlis.
```

### Sorular ve Cevaplar

1. Nested route ne demektir?
   Cevap: Bir route icinde alt route tanimlamaktir.
2. `/about/mission` hangi yapida kullanilabilir?
   Cevap: About altindaki nested route olarak.
3. Alt route path'i nasil yazilir?
   Cevap: Goreceli olarak, basinda `/` olmadan.
4. `path="team"` tam olarak hangi URL'ye denk gelir?
   Cevap: `/about/team`
5. Nested route neden kullanilir?
   Cevap: Ana sayfa sabit kalirken alt icerigi degistirmek icin.

---

## 13. Outlet

Nested route'un ekranda nerede gosterilecegini `Outlet` belirler.

About component:

```jsx
import { Outlet } from 'react-router-dom';

const About = () => {
  return (
    <main>
      <h1>About</h1>
      <Outlet />
    </main>
  );
};
```

`Outlet` su anlama gelir:

```txt
Eslesen alt route burada render edilsin.
```

Eger `/about/mission` acilirsa `Mission` component'i `Outlet` yerinde gosterilir.

### Sorular ve Cevaplar

1. `Outlet` ne ise yarar?
   Cevap: Nested route component'ini render eder.
2. `Outlet` nerede kullanilir?
   Cevap: Parent route component'inde.
3. `/about/mission` acilinca Mission nerede gorunur?
   Cevap: About icindeki `Outlet` yerinde.
4. Alt route eslesmezse `Outlet` ne render eder?
   Cevap: Genelde null.
5. Nested route icin `Outlet` gerekli midir?
   Cevap: Evet, alt icerigin gorunmesi icin.

---

## 14. Relative Link

Nested route icinde linkler goreceli yazilabilir.

About `/about` adresinde oldugu icin:

```jsx
<Link to="mission">Misyon</Link>
```

su adrese gider:

```txt
/about/mission
```

Eger tam baska sayfaya gitmek istiyorsan:

```jsx
<Link to="/products">Products</Link>
```

### Sorular ve Cevaplar

1. Relative link nedir?
   Cevap: Mevcut route'a gore hesaplanan linktir.
2. About icinde `to="mission"` nereye gider?
   Cevap: `/about/mission`
3. Tam yol vermek icin ne kullanilir?
   Cevap: Basinda `/` olan yol.
4. `to="/products"` relative midir?
   Cevap: Hayir, absolute/tam yoldur.
5. Nested linklerde relative yol kullanmak okunabilir mi?
   Cevap: Evet.

---

## 15. Vercel ve SPA Yonlendirme

React Router ile calisan uygulama genelde SPA'dir.

SPA:

```txt
Single Page Application
Tek HTML dosyasi vardir: index.html
URL degisse bile React Router dogru component'i gosterir.
```

Sorun:

```txt
Vercel /about adresinde about.html arayabilir.
Ama React projesinde sadece index.html vardir.
```

Cozum:

Proje kokune `vercel.json` eklenebilir.

Mini kod:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Bu su demektir:

```txt
Her rota icin index.html dondur.
React Router gerisini halletsin.
```

### Sorular ve Cevaplar

1. SPA ne demektir?
   Cevap: Single Page Application.
2. React Router uygulamasinda kac ana HTML dosyasi vardir?
   Cevap: Genelde bir tane, `index.html`.
3. Vercel neden ayar isteyebilir?
   Cevap: Alt rotalarda ayri HTML dosyasi arayabilecegi icin.
4. `vercel.json` ne ise yarar?
   Cevap: Tum rotalari index.html'e yonlendirmek icin.
5. Bu ayar olmazsa ne olabilir?
   Cevap: Sayfa yenilenince 404 gorulebilir.

---

## Unite 2: Gelismis Navigasyon

Bu unite'de link disinda navigasyon, query string, location bilgisi ve kod bolme anlatilir.

Ana konular:

- `useNavigate`
- `Navigate`
- `useSearchParams`
- `useLocation`
- `location.state`
- `React.lazy`
- `Suspense`

---

## 16. Programatik Navigasyon

Programatik navigasyon, kod ile yonlendirme yapmaktir.

Ornek durum:

```txt
Kullanici login formunu gonderir.
HTTP istegi basarili olur.
Kod kullaniciyi /profile sayfasina yollar.
```

Bu is icin `useNavigate` kullanilir.

Mini kod:

```jsx
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // login istegi basarili oldu varsayalim
    navigate('/profile');
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Sorular ve Cevaplar

1. Programatik navigasyon nedir?
   Cevap: Kod ile sayfa degistirmektir.
2. Programatik navigasyon icin hangi hook kullanilir?
   Cevap: `useNavigate`
3. `useNavigate` ne dondurur?
   Cevap: `navigate` fonksiyonu.
4. `navigate('/profile')` ne yapar?
   Cevap: Kullanici profil sayfasina yonlenir.
5. Form sonrasi yonlendirme icin kullanilabilir mi?
   Cevap: Evet.

---

## 17. navigate ve replace

`navigate` ikinci arguman olarak ayar nesnesi alabilir.

Mini kod:

```jsx
navigate('/profile', { replace: true });
```

Normal durumda:

```txt
Yeni sayfa history stack'in ustune eklenir.
Geri tusu onceki sayfaya doner.
```

`replace: true` durumunda:

```txt
Yeni sayfa mevcut history kaydinin yerine gecer.
Geri tusu o onceki sayfaya donmeyebilir.
```

Login sonrasi kullanisli olabilir:

```txt
Kullanici giris yaptiktan sonra geri tusu ile login sayfasina donmesin.
```

### Sorular ve Cevaplar

1. `replace` varsayilan olarak nedir?
   Cevap: `false`
2. `replace: true` ne yapar?
   Cevap: Yeni rotayi mevcut history kaydinin yerine koyar.
3. Login sonrasi `replace` mantikli olabilir mi?
   Cevap: Evet.
4. `navigate` sadece path mi alir?
   Cevap: Hayir, ikinci arguman olarak options alabilir.
5. Geri tusu davranisi `replace` ile etkilenir mi?
   Cevap: Evet.

---

## 18. Navigate Bileseni

`Navigate`, render aninda yonlendirme yapan componenttir.

Mini kod:

```jsx
import { Navigate } from 'react-router-dom';

const PrivatePage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <h1>Private page</h1>;
};
```

Fark:

- `useNavigate`: fonksiyon ile, event/logic icinde kullanilir
- `Navigate`: JSX ile, render sirasinda kullanilir

### Sorular ve Cevaplar

1. `Navigate` ne yapar?
   Cevap: Render aninda yonlendirme yapar.
2. `Navigate` hangi yapiya daha yakindir?
   Cevap: Deklaratif yapiya.
3. `useNavigate` hangi yapiya daha yakindir?
   Cevap: Imperatif yapiya.
4. Korunan sayfa icin `Navigate` kullanilabilir mi?
   Cevap: Evet.
5. `Navigate` hangi prop ile hedef alir?
   Cevap: `to`

---

## 19. Query String

Query string, URL'de ek durum bilgisi tasir.

Ornek:

```txt
/products?name=hoodie&maxPrice=500&inStock=true
```

Burada:

- `name=hoodie`
- `maxPrice=500`
- `inStock=true`

Query string su islerde kullanilir:

- Arama
- Filtreleme
- Siralama
- Sayfalama

Fayda:

```txt
Filtrelenmis URL baskasiyla paylasilabilir.
```

### Sorular ve Cevaplar

1. Query string hangi sembolle baslar?
   Cevap: `?`
2. Query parametreleri hangi formatta olur?
   Cevap: `key=value`
3. Birden fazla parametre ne ile ayrilir?
   Cevap: `&`
4. Query string ne icin kullanilabilir?
   Cevap: Arama ve filtreleme bilgisi icin.
5. Query bilgisi URL'de oldugu icin paylasilabilir mi?
   Cevap: Evet.

---

## 20. useSearchParams

`useSearchParams`, query string okumak ve degistirmek icin kullanilir.

Mini kod:

```jsx
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  const updateFilter = (value) => {
    setSearchParams({ name: value });
  };

  return (
    <input
      value={name}
      onChange={(event) => updateFilter(event.target.value)}
    />
  );
};
```

Burada:

- `searchParams.get('name')`: URL'deki `name` parametresini okur
- `setSearchParams({ name: value })`: query string'i gunceller

### Sorular ve Cevaplar

1. Query string okumak icin hangi hook kullanilir?
   Cevap: `useSearchParams`
2. `useSearchParams` kac elemanli dizi dondurur?
   Cevap: Iki elemanli.
3. Ilk eleman ne ise yarar?
   Cevap: Parametreleri okumak icin.
4. Ikinci eleman ne ise yarar?
   Cevap: Parametreleri guncellemek icin.
5. Parametre okumak icin hangi metod kullanilir?
   Cevap: `get()`

---

## 21. Query Parametre Deger Tipleri

Query parametreleri URL'den geldigi icin her zaman string olarak okunur.

Ornek URL:

```txt
/products?maxPrice=500&inStock=true
```

Okuma:

```jsx
const maxPrice = searchParams.get('maxPrice'); // "500"
const inStock = searchParams.get('inStock'); // "true"
```

Gerekirse donusturme yapilir:

```jsx
const priceNumber = Number(maxPrice);
const isInStock = inStock === 'true';
```

### Sorular ve Cevaplar

1. Query parametreleri hangi tipte okunur?
   Cevap: String.
2. `"500"` sayiya nasil cevrilir?
   Cevap: `Number("500")`
3. `"true"` boolean'a nasil cevrilebilir?
   Cevap: `value === 'true'`
4. Parametre yoksa `get()` ne dondurur?
   Cevap: `null`
5. Tip donusumu neden gerekebilir?
   Cevap: Sayi veya boolean gibi kullanmak icin.

---

## 22. Query Parametrelerini Nesneye Cevirmek

Cok parametre varsa tek tek `get()` yazmak yorucu olabilir.

`Object.fromEntries()` ile parametreler nesneye cevrilebilir.

Mini kod:

```jsx
const [searchParams] = useSearchParams();

const params = Object.fromEntries(searchParams.entries());
```

Sonuc:

```js
{
  name: 'hoodie',
  maxPrice: '500'
}
```

Performans icin `useMemo` kullanilabilir:

```jsx
const params = useMemo(() => {
  return Object.fromEntries(searchParams.entries());
}, [searchParams]);
```

### Sorular ve Cevaplar

1. Query parametreleri nesneye cevrilebilir mi?
   Cevap: Evet.
2. Bunun icin hangi metod kullanilabilir?
   Cevap: `Object.fromEntries()`
3. `searchParams.entries()` ne verir?
   Cevap: Parametre-deger ciftlerini.
4. Bu donusum icin `useMemo` kullanilabilir mi?
   Cevap: Evet.
5. `useMemo` burada neden kullanilir?
   Cevap: Gereksiz yeni nesne olusturmayi azaltmak icin.

---

## 23. Query String Degisince Ne Olur?

`setSearchParams` URL'yi degistirir.

URL degisince:

```txt
React Router yeni search parametrelerini verir.
Bilesen yeniden render olur.
Gerekirse useEffect tetiklenebilir.
```

Mini kod:

```jsx
useEffect(() => {
  console.log('Query degisti:', searchParams.toString());
}, [searchParams]);
```

### Sorular ve Cevaplar

1. `setSearchParams` ne yapar?
   Cevap: Query string'i gunceller.
2. Query degisince bilesen guncellenir mi?
   Cevap: Evet.
3. Query degisimini `useEffect` ile takip edebilir miyiz?
   Cevap: Evet.
4. URL'deki filtre bilgisi kalici midir?
   Cevap: Sayfa linki paylasildiginda korunur.
5. Query state yerine kullanilabilir mi?
   Cevap: Filtre/arama gibi URL'de olmasi mantikli durumlarda evet.

---

## 24. Location Objesi

Location objesi mevcut URL hakkinda bilgi verir.

Ozellikler:

- `pathname`: URL'nin path kismi
- `search`: query string kismi
- `hash`: hash kismi
- `state`: URL'de gorunmeyen ek navigasyon bilgisi
- `key`: history kaydi icin benzersiz anahtar

Ornek URL:

```txt
/products?name=hoodie#top
```

Location:

```js
{
  pathname: '/products',
  search: '?name=hoodie',
  hash: '#top'
}
```

### Sorular ve Cevaplar

1. Location objesi neyi temsil eder?
   Cevap: Mevcut URL bilgisini.
2. `pathname` neyi verir?
   Cevap: URL'nin yol kismini.
3. `search` neyi verir?
   Cevap: Query string'i.
4. `hash` neyi verir?
   Cevap: `#` sonrasi kismi.
5. `state` URL'de gorunur mu?
   Cevap: Hayir.

---

## 25. useLocation Hook'u

`useLocation`, mevcut location objesini dondurur.

Mini kod:

```jsx
import { useLocation } from 'react-router-dom';

const Page = () => {
  const location = useLocation();

  console.log(location.pathname);
  console.log(location.search);

  return <p>Current path: {location.pathname}</p>;
};
```

Kullanim alanlari:

- Mevcut URL'yi okumak
- Analitik islemleri tetiklemek
- Onceki sayfaya donus bilgisini saklamak
- `location.state` okumak

### Sorular ve Cevaplar

1. `useLocation` ne dondurur?
   Cevap: Mevcut location objesini.
2. URL degisince `useLocation` yeni bilgi verir mi?
   Cevap: Evet.
3. `location.pathname` ne verir?
   Cevap: Path kismini.
4. `location.search` ne verir?
   Cevap: Query kismini.
5. Analitik icin `useLocation` kullanilabilir mi?
   Cevap: Evet.

---

## 26. location.state

`location.state`, URL'de gorunmeyen ek navigasyon bilgisidir.

Senaryo:

```txt
Kullanici /products?name=hoodie sayfasinda filtreleme yapti.
Sonra /products/1 detay sayfasina gitti.
Detay sayfasindaki Geri butonu tekrar /products?name=hoodie adresine donmeli.
```

Products sayfasinda link:

```jsx
const location = useLocation();

<Link to={`/products/${product.id}`} state={location}>
  Detaya git
</Link>
```

ProductDetails sayfasinda:

```jsx
const location = useLocation();
const backLinkHref = location.state ?? '/products';

<Link to={backLinkHref}>Geri don</Link>
```

Burada:

- `state={location}` onceki URL bilgisini tasir
- Detay sayfasi geri donus linkini buradan uretir
- Kullanici direkt detay sayfasini acarsa `location.state` bos olabilir
- Bu yuzden varsayilan `/products` gerekir

### Sorular ve Cevaplar

1. `location.state` URL'de gorunur mu?
   Cevap: Hayir.
2. `Link` icinde state prop'u kullanilabilir mi?
   Cevap: Evet.
3. Detay sayfasindan filtreli listeye donmek icin state kullanilabilir mi?
   Cevap: Evet.
4. Kullanici sayfayi direkt acarsa `location.state` ne olabilir?
   Cevap: `null`
5. Bu durumda ne yapmak gerekir?
   Cevap: Varsayilan geri donus yolu vermek gerekir.

---

## 27. Code Splitting

Code splitting, uygulama kodunu daha kucuk parcalara ayirmaktir.

Sorun:

```txt
Uygulama buyudukce tum kod tek dosyada yuklenirse ilk acilis yavaslar.
```

Cozum:

```txt
Her sayfanin kodunu sadece ihtiyac oldugunda yukle.
```

Iki yaklasim:

- Route-centric code splitting: rotalara gore bolme
- Component-centric code splitting: buyuk bilesenlere gore bolme

Genelde en onemli olan:

```txt
Rotalara gore code splitting yapmak.
```

### Sorular ve Cevaplar

1. Code splitting nedir?
   Cevap: Kodu daha kucuk parcalara ayirmaktir.
2. Neden kullanilir?
   Cevap: Ilk yukleme suresini azaltmak icin.
3. Route-centric code splitting nedir?
   Cevap: Sayfa/rota bazli kod bolmedir.
4. Component-centric code splitting nedir?
   Cevap: Belirli buyuk bilesenleri ayri yuklemektir.
5. Asiri code splitting iyi midir?
   Cevap: Hayir, gereksiz HTTP istekleri yaratabilir.

---

## 28. React.lazy

`React.lazy`, component'i dinamik import ile sonradan yukler.

Normal import:

```jsx
import Home from './pages/Home';
```

Lazy import:

```jsx
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
```

Onemli:

```txt
lazy ile yuklenen component default export olmalidir.
```

### Sorular ve Cevaplar

1. `React.lazy` ne ise yarar?
   Cevap: Component'i ihtiyac olunca yuklemek icin.
2. Lazy import hangi fonksiyonu kullanir?
   Cevap: `import()`
3. `import()` ne dondurur?
   Cevap: Promise.
4. Lazy component nasil export edilmelidir?
   Cevap: Default export.
5. Normal statik import kalirsa code splitting olur mu?
   Cevap: Genelde hayir, component ana bundle'a eklenebilir.

---

## 29. Suspense

`Suspense`, lazy component yuklenirken gecici icerik gosterir.

Mini kod:

```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
```

Burada:

- `Home` henuz yuklenmediyse fallback gosterilir
- Yukleme bitince Home render edilir

Nested route icinde de kullanilabilir:

```jsx
<Suspense fallback={<p>Loading section...</p>}>
  <Outlet />
</Suspense>
```

### Sorular ve Cevaplar

1. `Suspense` ne ise yarar?
   Cevap: Lazy component yuklenirken fallback gosterir.
2. `fallback` prop'u ne alir?
   Cevap: Gosterilecek gecici JSX'i.
3. Lazy component yuklenince fallback kalir mi?
   Cevap: Hayir.
4. `Suspense` route seviyesinde kullanilabilir mi?
   Cevap: Evet.
5. `Outlet` etrafinda `Suspense` kullanilabilir mi?
   Cevap: Evet.

---

## Genel Tekrar

Bu modulde sunlari ogrendik:

- React'te routing icin `react-router-dom` kullanilir.
- `BrowserRouter`, router sistemini uygulamaya saglar.
- `Routes`, uygun route'u secer.
- `Route`, URL ile component'i eslestirir.
- `Link` ve `NavLink`, sayfa yenilemeden gezinme saglar.
- `NavLink`, aktif link stilini kolaylastirir.
- `path="*"` NotFound sayfasi icin kullanilir.
- `:productId` gibi yapilar URL parametresidir.
- `useParams`, URL parametrelerini okur.
- Nested route, parent sayfa icinde alt sayfa gostermektir.
- `Outlet`, nested route'un render edilecegi yerdir.
- `useNavigate`, kod ile yonlendirme yapar.
- `Navigate`, render aninda yonlendirme yapar.
- Query string, filtreleme/arama gibi bilgileri URL'de tutar.
- `useSearchParams`, query string'i okur ve degistirir.
- `useLocation`, mevcut URL bilgisini verir.
- `location.state`, URL'de gorunmeyen navigasyon bilgisidir.
- `React.lazy` ve `Suspense`, code splitting icin kullanilir.

---

## Kisa Ezber Kartlari

```txt
Routing = URL'ye gore component gostermek
BrowserRouter = router kapsayicisi
Routes = uygun route'u secer
Route = path ile element eslestirir
Link = sayfa yenilemeden link
NavLink = aktif link bilen Link
path="*" = NotFound
:productId = URL parametresi
useParams = URL parametresini oku
Nested route = route icinde route
Outlet = alt route'un gosterilecegi yer
useNavigate = kodla yonlendir
Navigate = JSX ile yonlendir
Query string = ?key=value
useSearchParams = query oku/yaz
useLocation = mevcut URL bilgisi
location.state = URL'de gorunmeyen gecis bilgisi
lazy = component'i sonradan yukle
Suspense = yuklenirken fallback goster
```
