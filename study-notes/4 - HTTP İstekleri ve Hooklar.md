# Modul 4: HTTP Istekleri ve Hooklar

Bu dosya, `4.Ders-1.pdf` ve `4.Ders-2.pdf` icindeki konulari basit, bolunmus ve tekrar edilebilir sekilde anlatir.

Bu modulde ana fikir sudur:

- React icinde HTTP istegi yapmak
- Gelen veriyi state icinde saklamak
- Loading ve error durumlarini yonetmek
- HTTP kodunu bilesenden ayirmak
- Arama formu ile kullanici etkilesimine bagli istek yapmak
- `useMemo`, `useRef`, custom hook, `useToggle` ve Context mantigini anlamak

---

## Unite 1: HTTP Istekleri

Bu unite'de React uygulamasinda backend/API ile konusmayi ogreniriz.

React'in icinde HTTP istegi yapmak icin ozel bir modul yoktur. Bu yuzden genelde:

- `fetch`
- `axios`

gibi araclar kullanilir.

Bu derslerde ornekler genelde `axios` mantigi uzerinden ilerler.

---

## 1. HTTP Istegi Nedir?

HTTP istegi, frontend'in backend'den veri istemesidir.

Ornek:

```txt
Frontend: Bana React ile ilgili makaleleri ver.
Backend/API: Al, bunlar makaleler.
```

Mini kod fikri:

```jsx
const response = await axios.get('https://example.com/articles');
console.log(response.data);
```

Burada:

- `axios.get()` veri ister
- `await` cevabin gelmesini bekler
- `response.data` backend'den gelen asil veridir

### Sorular ve Cevaplar

1. HTTP istegi ne icin kullanilir?
   Cevap: Backend veya API'den veri almak/gondermek icin kullanilir.
2. React icinde HTTP istekleri icin yerlesik bir modul var mi?
   Cevap: Hayir.
3. HTTP istegi icin hangi kutuphane sik kullanilir?
   Cevap: `axios`
4. `axios.get()` ne yapar?
   Cevap: Verilen adrese GET istegi gonderir.
5. Gelen veriye genelde nereden ulasilir?
   Cevap: `response.data`

---

## 2. Istek Ne Zaman Yapilir?

React'te HTTP istegi iki temel zamanda yapilabilir:

- Bilesen ekrana ilk geldiginde
- Kullanici bir islem yaptiginda

Ornekler:

- Sayfa acilinca makaleleri getir
- Form gonderilince arama yap
- Butona basinca detaylari getir

Sayfa acilinca istek yapmak icin genelde `useEffect` kullanilir.

Kullanici islemine bagli istek yapmak icin genelde event handler kullanilir.

Mini kod:

```jsx
useEffect(() => {
  // Bilesen ekrana ilk geldiginde calisir.
}, []);
```

### Sorular ve Cevaplar

1. Bilesen ekrana geldiginde istek yapmak icin hangi hook kullanilir?
   Cevap: `useEffect`
2. Butona tiklayinca istek yapmak icin ne kullanilir?
   Cevap: Event handler.
3. Form gonderilince istek yapmak icin hangi olay kullanilir?
   Cevap: `onSubmit`
4. `useEffect` ne zaman kullanisli olur?
   Cevap: Bilesen mount oldugunda veri cekmek icin.
5. Her HTTP istegi `useEffect` icinde mi yapilir?
   Cevap: Hayir, kullanici olaylarinda event handler icinde yapilabilir.

---

## 3. useEffect Icinde Async Fonksiyon

`useEffect` callback fonksiyonu dogrudan `async` yapilmamalidir.

Yanlis:

```jsx
useEffect(async () => {
  const response = await axios.get('/api/articles');
}, []);
```

Dogru:

```jsx
useEffect(() => {
  const fetchArticles = async () => {
    const response = await axios.get('/api/articles');
    console.log(response.data);
  };

  fetchArticles();
}, []);
```

Burada:

- `useEffect` normal fonksiyon alir
- Icinde async fonksiyon tanimlanir
- Bu async fonksiyon hemen cagrilir

### Sorular ve Cevaplar

1. `useEffect` callback'i dogrudan `async` yapilmali mi?
   Cevap: Hayir.
2. Async islem nerede tanimlanir?
   Cevap: `useEffect` icindeki ayri bir async fonksiyonda.
3. Async fonksiyon neden hemen cagrilir?
   Cevap: Istegin baslamasi icin.
4. `await` ne yapar?
   Cevap: Promise sonucunu bekler.
5. ESLint bu konuda uyari verebilir mi?
   Cevap: Evet.

---

## 4. Gelen Veriyi State Icinde Saklamak

HTTP isteginden gelen veri ekranda gosterilecekse state icinde saklanmalidir.

Mini kod:

```jsx
const [articles, setArticles] = useState([]);

useEffect(() => {
  const fetchArticles = async () => {
    const response = await axios.get('/api/articles');
    setArticles(response.data);
  };

  fetchArticles();
}, []);
```

Neden state?

```txt
State degisince React bileseni yeniden render eder.
Boylece gelen veri ekranda gorunur.
```

Baslangic degeri neden bos dizi?

```txt
Backend'den makale listesi gelecegi icin baslangicta elimizde bos liste vardir.
```

### Sorular ve Cevaplar

1. API'den gelen veri ekranda gosterilecekse nerede saklanir?
   Cevap: State icinde.
2. Makale listesi icin baslangic degeri ne olabilir?
   Cevap: Bos dizi `[]`.
3. `setArticles()` ne yapar?
   Cevap: Articles state'ini gunceller.
4. State guncellenince ne olur?
   Cevap: Bilesen yeniden render olur.
5. Gelen veri sadece degiskende saklanirsa ekran guncellenir mi?
   Cevap: Hayir, reaktif olmaz.

---

## 5. Verileri JSX Icinde Gosterme

State icindeki dizi JSX'te `map` ile gosterilebilir.

Mini kod:

```jsx
const ArticleList = ({ items }) => {
  return (
    <ul>
      {items.map((article) => (
        <li key={article.objectID}>
          <a href={article.url}>{article.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

Kullanim:

```jsx
{articles.length > 0 && <ArticleList items={articles} />}
```

Burada:

- `articles.length > 0` veri var mi diye bakar
- Veri varsa liste gosterilir
- Veri yoksa liste gosterilmez

### Sorular ve Cevaplar

1. Dizi JSX'te hangi metodla listelenir?
   Cevap: `map`
2. Liste elemanlarinda neden `key` gerekir?
   Cevap: React'in elemanlari ayirt edebilmesi icin.
3. `articles.length > 0` neyi kontrol eder?
   Cevap: Dizide eleman var mi?
4. `ArticleList` ne is yapar?
   Cevap: Makaleleri listeler.
5. `items` nedir?
   Cevap: ArticleList'e verilen prop.

---

## 6. Loading Durumu

HTTP istegi zaman alabilir.

Kullanici bos ekran gormesin diye loading durumu tutulur.

Mini kod:

```jsx
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchArticles = async () => {
    setLoading(true);

    const response = await axios.get('/api/articles');
    setArticles(response.data);

    setLoading(false);
  };

  fetchArticles();
}, []);
```

JSX:

```jsx
{loading && <p>Yukleniyor...</p>}
```

Loading iki deger alir:

- `true`: Istek devam ediyor
- `false`: Istek yok veya bitti

### Sorular ve Cevaplar

1. Loading neyi ifade eder?
   Cevap: Istegin devam edip etmedigini.
2. Istek baslamadan once loading ne yapilir?
   Cevap: `true`
3. Istek bitince loading ne yapilir?
   Cevap: `false`
4. Loading ekranda nasil gosterilebilir?
   Cevap: Kosullu render ile.
5. Loading sadece metin olabilir mi?
   Cevap: Evet, spinner bileseni de olabilir.

---

## 7. Hata Yonetimi

HTTP istekleri her zaman basarili olmaz.

Sebep olabilir:

- Internet yoktur
- API calismiyordur
- URL yanlistir
- Sunucu hata donmustur

Bu yuzden `try...catch` kullanilir.

Mini kod:

```jsx
const [error, setError] = useState(false);

useEffect(() => {
  const fetchArticles = async () => {
    try {
      setError(false);
      setLoading(true);

      const response = await axios.get('/api/articles');
      setArticles(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchArticles();
}, []);
```

JSX:

```jsx
{error && <p>Bir hata olustu. Lutfen tekrar deneyin.</p>}
```

### Sorular ve Cevaplar

1. HTTP istegi hata verebilir mi?
   Cevap: Evet.
2. Hata yakalamak icin hangi yapi kullanilir?
   Cevap: `try...catch`
3. `catch` ne zaman calisir?
   Cevap: Hata olustugunda.
4. Error state'i ne icin kullanilir?
   Cevap: Kullaniciya hata mesaji gostermek icin.
5. `finally` ne ise yarar?
   Cevap: Hata olsa da olmasa da calisir.

---

## 8. HTTP Kodunu Ayri Dosyaya Tasimak

HTTP istegi dogrudan bilesen icinde yazilabilir ama proje buyudukce dosya karisir.

Daha temiz yapi:

```txt
src/articles-api.js
```

Mini kod:

```jsx
import axios from 'axios';

export const fetchArticlesWithTopic = async (topic) => {
  const response = await axios.get('https://hn.algolia.com/api/v1/search', {
    params: {
      query: topic,
    },
  });

  return response.data.hits;
};
```

Bilesende kullanim:

```jsx
import { fetchArticlesWithTopic } from '../articles-api';

const articles = await fetchArticlesWithTopic('react');
```

Fayda:

- URL bilesenden gizlenir
- Bilesen daha temiz olur
- API kodu tek yerde durur
- Ayni fonksiyon farkli yerlerde kullanilabilir

### Sorular ve Cevaplar

1. HTTP kodunu ayri dosyaya tasimak neden iyidir?
   Cevap: Bileseni sade tutar.
2. `articles-api.js` ne icin kullanilir?
   Cevap: Makale istek fonksiyonlarini saklamak icin.
3. API fonksiyonu ne dondurebilir?
   Cevap: Hazirlanmis veri, ornegin `response.data.hits`.
4. Hata yonetimi nerede yapilabilir?
   Cevap: Fonksiyonun cagrildigi bilesende.
5. Bilesen API detaylarini bilmek zorunda mi?
   Cevap: Hayir.

---

## 9. Arama Formu Ile Istek Yapmak

Kullanici bir kelime girer ve formu gonderir.

Bu kez istek sayfa acilinca degil, form gonderilince yapilir.

Bu yuzden `useEffect` yerine `handleSearch` gibi bir fonksiyon kullanilir.

Mini kod:

```jsx
const SearchForm = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const topic = form.elements.topic.value.trim();

    if (topic === '') {
      alert('Lutfen arama kelimesi girin.');
      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="topic" />
      <button type="submit">Ara</button>
    </form>
  );
};
```

App icinde:

```jsx
const handleSearch = async (topic) => {
  setArticles([]);
  setError(false);
  setLoading(true);

  try {
    const data = await fetchArticlesWithTopic(topic);
    setArticles(data);
  } catch {
    setError(true);
  } finally {
    setLoading(false);
  }
};
```

### Sorular ve Cevaplar

1. Arama formu ne zaman HTTP istegi yapar?
   Cevap: Form submit edilince.
2. Bos arama neden engellenir?
   Cevap: Gereksiz HTTP istegi yapmamak icin.
3. `onSearch` nedir?
   Cevap: SearchForm'a verilen callback prop.
4. `form.reset()` ne yapar?
   Cevap: Form alanini temizler.
5. Yeni aramada `setArticles([])` neden kullanilir?
   Cevap: Eski sonuclari temizlemek icin.

---

## Unite 2: Hooklar

Bu unite'de performans, DOM referansi, custom hook ve global veri paylasimi anlatilir.

Ana hooklar:

- `useMemo`
- `useRef`
- Custom hook
- `useToggle`
- Context icin `createContext` ve `useContext`

---

## 10. useMemo Hook'u

`useMemo`, pahali bir hesaplamanin sonucunu hatirlar.

Yani:

```txt
Bagimliliklar degismediyse hesaplamayi tekrar yapma.
Eski sonucu kullan.
```

Mini kod:

```jsx
const filteredPlanets = useMemo(() => {
  return planets.filter((planet) => planet.includes(query));
}, [planets, query]);
```

Burada hesaplama sadece su durumda tekrar yapilir:

- `planets` degisirse
- `query` degisirse

`clicks` gibi alakasiz state degisirse hesaplama tekrar yapilmaz.

### Sorular ve Cevaplar

1. `useMemo` neyi hatirlar?
   Cevap: Hesaplama sonucunu.
2. `useMemo` render'i tamamen engeller mi?
   Cevap: Hayir, sadece hesaplamayi tekrar yapmamaya yardim eder.
3. Dependency array ne ise yarar?
   Cevap: Hesaplamanin hangi degerlere bagli oldugunu belirtir.
4. Her hesaplama `useMemo` ile sarilmali mi?
   Cevap: Hayir.
5. `useMemo` en cok ne zaman mantiklidir?
   Cevap: Pahali hesaplamalarda ve buyuk listelerde.

---

## 11. useMemo Ne Zaman Gereksizdir?

Basit hesaplamalar icin `useMemo` gereksizdir.

Gereksiz ornek:

```jsx
const fullName = firstName + ' ' + lastName;
```

Gereksiz ornek:

```jsx
const count = items.length;
```

Iyi aday:

```jsx
const sortedProducts = useMemo(() => {
  return [...products].sort((a, b) => a.price - b.price);
}, [products]);
```

Kural:

```txt
Once sade yaz.
Yavaslik veya gereksiz pahali hesaplama gorursen useMemo dusun.
```

### Sorular ve Cevaplar

1. Basit string birlestirme icin `useMemo` gerekir mi?
   Cevap: Genelde hayir.
2. Buyuk liste siralama icin `useMemo` mantikli olabilir mi?
   Cevap: Evet.
3. `useMemo` kullanmanin da maliyeti var mi?
   Cevap: Evet.
4. Performans problemi yoksa `useMemo` sart mi?
   Cevap: Hayir.
5. `useMemo` ihtiyaci nasil anlasilir?
   Cevap: Profiler, console.time veya hissedilen yavaslikla.

---

## 12. useRef Hook'u

`useRef`, bir referans kutusu olusturur.

DOM elementiyle kullanildiginda:

```txt
ref kutusu = inputRef
kutunun ici = inputRef.current
```

Mini kod:

```jsx
const inputRef = useRef();

const focusInput = () => {
  inputRef.current.focus();
};

return (
  <>
    <input ref={inputRef} />
    <button onClick={focusInput}>Input'a odaklan</button>
  </>
);
```

Burada:

- `useRef()` kutu olusturur
- `ref={inputRef}` input'u kutuya baglar
- `inputRef.current` gercek input elementidir
- `.focus()` DOM metodudur

### Sorular ve Cevaplar

1. `useRef` ne olusturur?
   Cevap: Referans kutusu.
2. `ref={inputRef}` ne yapar?
   Cevap: DOM elementini ref'e baglar.
3. `inputRef.current` nedir?
   Cevap: Gercek DOM elementi.
4. Input'a odak vermek icin hangi metod kullanilir?
   Cevap: `focus()`
5. `useRef` `document.querySelector` gibi dusunulebilir mi?
   Cevap: Benzer amaca hizmet eder ama React'in kendi referans yoludur.

---

## 13. Ref'in Yasam Dongusu

Ilk render sirasinda DOM elementi henuz olusmadigi icin `ref.current` bos olabilir.

Ornek:

```jsx
const btnRef = useRef();

console.log(btnRef.current);

return <button ref={btnRef}>Button</button>;
```

Ilk render akisi:

```txt
1. Component fonksiyonu calisir.
2. useRef bos kutu olusturur.
3. console.log calisir.
4. Button henuz DOM'a baglanmamistir.
5. ref.current undefined olur.
6. Return edilen JSX DOM'a yerlestirilir.
7. React btnRef.current icine gercek button'u koyar.
```

`useEffect` icinde ref doludur:

```jsx
useEffect(() => {
  console.log(btnRef.current);
}, []);
```

Cunku `useEffect`, render bittikten sonra calisir.

### Sorular ve Cevaplar

1. Ilk render sirasinda `ref.current` neden bos olabilir?
   Cevap: DOM elementi henuz baglanmadigi icin.
2. Render bittikten sonra `ref.current` ne olur?
   Cevap: DOM elementini gosterir.
3. `useEffect` icinde ref neden doludur?
   Cevap: Effect render ve DOM baglantisindan sonra calisir.
4. Event handler icinde ref genelde dolu mudur?
   Cevap: Evet, cunku kullanici element ekrandayken tiklar.
5. Bilesen kaldirilinca ref ne olur?
   Cevap: Baglanti temizlenir.

---

## 14. Ref Reaktif Degildir

`useRef` state gibi calismaz.

State degisirse render olur:

```jsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

Ref degisirse render olmaz:

```jsx
const countRef = useRef(0);
countRef.current += 1;
```

Bu yuzden ref su islerde kullanilir:

- DOM elementi tutmak
- timer id tutmak
- onceki degeri saklamak
- render gerektirmeyen sayac tutmak

### Sorular ve Cevaplar

1. Ref degisince bilesen yeniden render olur mu?
   Cevap: Hayir.
2. State degisince bilesen render olur mu?
   Cevap: Evet.
3. Ekranda gosterilecek veri icin state mi ref mi kullanilir?
   Cevap: State.
4. DOM elementi tutmak icin ne kullanilir?
   Cevap: Ref.
5. Timer id saklamak icin ref kullanilabilir mi?
   Cevap: Evet.

---

## 15. Video Oynatici Ornegi

Video gibi DOM elementlerinin kendi metodlari vardir:

- `play()`
- `pause()`

Bu metodlara ref ile ulasilabilir.

Mini kod:

```jsx
const Player = () => {
  const videoRef = useRef();

  return (
    <>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={() => videoRef.current.play()}>Oynat</button>
      <button onClick={() => videoRef.current.pause()}>Durdur</button>
    </>
  );
};
```

Burada:

- `videoRef.current` gercek video elementidir
- `play()` videoyu baslatir
- `pause()` videoyu durdurur

### Sorular ve Cevaplar

1. Video elementini kontrol etmek icin ne kullanilir?
   Cevap: `useRef`
2. Videoyu baslatan metod nedir?
   Cevap: `play()`
3. Videoyu durduran metod nedir?
   Cevap: `pause()`
4. `videoRef.current` neyi gosterir?
   Cevap: Gercek video DOM elementini.
5. Bu islem state ile mi DOM metodu ile mi yapilir?
   Cevap: DOM metodu ile.

---

## 16. Ref Forwarding

Bir component'e disaridan `ref` vermek her zaman dogrudan calismaz.

Ornek problem:

```jsx
const CustomInput = () => {
  return <input />;
};

const App = () => {
  const inputRef = useRef();

  return <CustomInput ref={inputRef} />;
};
```

Burada ref otomatik olarak icteki input'a gitmez.

Bu durumda `forwardRef` kullanilir.

Mini kod:

```jsx
import { forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

Artik ust component icteki input'a ulasabilir.

### Sorular ve Cevaplar

1. Ref normal componentlerden otomatik gecer mi?
   Cevap: Hayir.
2. Ref'i alt DOM elementine aktarmak icin ne kullanilir?
   Cevap: `forwardRef`
3. `forwardRef` hangi durumda faydalidir?
   Cevap: Ozel input, modal, galeri gibi componentlerde.
4. Ref sonunda neye baglanmalidir?
   Cevap: Gercek DOM elementine.
5. `forwardRef` her zaman gerekli mi?
   Cevap: Hayir, sadece disaridan ref ile erisim gerekiyorsa.

---

## 17. Custom Hook Nedir?

Custom hook, tekrar eden React mantigini ayri bir fonksiyona tasimaktir.

Kurallar:

- Adi `use` ile baslamalidir
- Icinde baska hooklar kullanabilir
- JSX dondurmek zorunda degildir
- State ve fonksiyon dondurebilir

Ornek hook isimleri:

- `useToggle`
- `useUser`
- `useTheme`
- `useFetch`

Mini kod:

```jsx
export const useExample = () => {
  const [value, setValue] = useState(0);

  return { value, setValue };
};
```

### Sorular ve Cevaplar

1. Custom hook ne ise yarar?
   Cevap: Tekrar eden mantigi yeniden kullanilabilir hale getirir.
2. Custom hook adi ne ile baslamalidir?
   Cevap: `use`
3. Custom hook icinde `useState` kullanilabilir mi?
   Cevap: Evet.
4. Custom hook component midir?
   Cevap: Hayir.
5. Custom hook JSX dondurmek zorunda mi?
   Cevap: Hayir.

---

## 18. useToggle Hook'u

`useToggle`, ac/kapat mantigini tekrar kullanilabilir hale getirir.

Tekrar eden kod:

```jsx
const [isOpen, setIsOpen] = useState(false);

const open = () => setIsOpen(true);
const close = () => setIsOpen(false);
```

Hook hali:

```jsx
import { useState } from 'react';

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};
```

Kullanim:

```jsx
const { isOpen, open, close, toggle } = useToggle();
```

Onemli:

```txt
Ayni hook'u kullanan her component kendi ayri state'ine sahip olur.
```

### Sorular ve Cevaplar

1. `useToggle` ne ise yarar?
   Cevap: Ac/kapat mantigini paketler.
2. `isOpen` neyi ifade eder?
   Cevap: Acik mi kapali mi bilgisini.
3. `open` ne yapar?
   Cevap: `isOpen` degerini `true` yapar.
4. `close` ne yapar?
   Cevap: `isOpen` degerini `false` yapar.
5. `toggle` ne yapar?
   Cevap: Mevcut degeri tersine cevirir.

---

## 19. Context Nedir?

Context, veriyi ara componentlere props gecmeden derindeki componentlere ulastirmaya yarar.

Normal props akisi:

```txt
App -> Header -> Navigation -> UserMenu
```

Eger `username` sadece `UserMenu` icin lazimsa, ara componentlere props gecmek yorucu olur.

Context fikri:

```txt
Veriyi ortak bir alana koy.
Ihtiyaci olan component gidip alsin.
```

Context icin 3 parca vardir:

- `createContext`: ortak alan olusturur
- `Provider`: ortak alana veri koyar
- `useContext`: ortak alandan veri alir

### Sorular ve Cevaplar

1. Context ne ise yarar?
   Cevap: Ortak veriyi derindeki componentlere ulastirir.
2. Context props'u tamamen gereksiz yapar mi?
   Cevap: Hayir.
3. `createContext` ne yapar?
   Cevap: Context nesnesi olusturur.
4. `Provider` ne yapar?
   Cevap: Context'e veri saglar.
5. `useContext` ne yapar?
   Cevap: Context degerini okur.

---

## 20. Provider ve value

Provider, context verisini dagitan yapidir.

Mini kod:

```jsx
import { createContext } from 'react';

export const UserContext = createContext();
```

`main.jsx`:

```jsx
const contextValue = {
  username: 'Mango',
  isLoggedIn: true,
};

createRoot(document.getElementById('root')).render(
  <UserContext.Provider value={contextValue}>
    <App />
  </UserContext.Provider>
);
```

Burada:

- `UserContext.Provider` verici gibi calisir
- `value` dagitilacak veridir
- `App` ve altindaki componentler bu veriye ulasabilir

### Sorular ve Cevaplar

1. Provider hangi prop'u alir?
   Cevap: `value`
2. `value` neyi temsil eder?
   Cevap: Context ile paylasilacak veriyi.
3. Provider icindeki componentler context'e ulasabilir mi?
   Cevap: Evet.
4. Provider disindaki component context'e ulasabilir mi?
   Cevap: Dogru degeri alamaz.
5. Provider genelde nerede kullanilir?
   Cevap: `main.jsx` veya ust seviye componentlerde.

---

## 21. useContext ve useUser Hook'u

Context degerini okumak icin `useContext` kullanilir.

Mini kod:

```jsx
import { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
```

Component icinde:

```jsx
const UserMenu = () => {
  const { username } = useUser();

  return <p>Welcome, {username}!</p>;
};
```

Burada `useUser`, su kodun kisa yoludur:

```jsx
useContext(UserContext)
```

### Sorular ve Cevaplar

1. `useContext` ne alir?
   Cevap: Context nesnesini.
2. `useContext` ne dondurur?
   Cevap: Provider'daki `value` degerini.
3. `useUser` React'in hazir hook'u mudur?
   Cevap: Hayir, bizim yazdigimiz custom hook'tur.
4. `useUser` neyi kolaylastirir?
   Cevap: Context'e erisimi.
5. Context degeri degisirse kullanan component ne olur?
   Cevap: Yeniden render olur.

---

## 22. Ozel UserProvider

Context degeri sabit olmak zorunda degildir.

Login/logout gibi dinamik islemler icin custom provider yazilir.

Mini kod:

```jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logIn = () => {
    setIsLoggedIn(true);
    setUsername('Mango');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
```

`main.jsx`:

```jsx
createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
```

Burada:

- `UserProvider` state tutar
- `logIn` ve `logOut` fonksiyonlarini dagitir
- `children`, Provider icine yerlestirilen componentlerdir

### Sorular ve Cevaplar

1. Custom provider neden yazilir?
   Cevap: Context state ve fonksiyonlarini tek yerde toplamak icin.
2. `children` nedir?
   Cevap: Provider icine sarilan componentler.
3. `logIn` ne yapar?
   Cevap: Kullanici durumunu giris yapmis hale getirir.
4. `logOut` ne yapar?
   Cevap: Kullanici durumunu cikis yapmis hale getirir.
5. Provider icinde state kullanilabilir mi?
   Cevap: Evet.

---

## 23. Context Ne Zaman Kullanilmali?

Context her props gecisini engellemek icin kullanilmamalidir.

Iyi kullanimlar:

- Tema bilgisi
- Dil bilgisi
- Giris yapan kullanici
- Auth durumu
- Sepet bilgisi

Gereksiz kullanim:

```txt
App -> UserCard
```

Sadece yakin bir componente veri gidiyorsa props yeterlidir.

Context mantikli olabilir:

```txt
App
  Layout
    Header
      Navigation
        UserMenu
```

Eger veri cok derindeki componentte lazimsa ve ara componentler sadece tasiyorsa Context dusunulebilir.

### Sorular ve Cevaplar

1. Context sadece props yazmamak icin kullanilmali mi?
   Cevap: Hayir.
2. Tema bilgisi icin Context mantikli mi?
   Cevap: Evet.
3. Tek child'a veri gondermek icin Context gerekir mi?
   Cevap: Genelde hayir.
4. Prop drilling nedir?
   Cevap: Veriyi kullanmayan ara componentlerden props gecirmektir.
5. Context kodu bazen neden zorlastirir?
   Cevap: Verinin nereden geldigini takip etmek zorlasabilir.

---

## Genel Tekrar

Bu modulde sunlari ogrendik:

- HTTP istegi API ile konusmak icindir.
- React'te HTTP istegi icin genelde `axios` veya `fetch` kullanilir.
- Bilesen mount oldugunda istek yapmak icin `useEffect` kullanilir.
- `useEffect` callback'i dogrudan `async` yapilmamalidir.
- Gelen veri ekranda gosterilecekse state icinde saklanir.
- Loading state'i istek devam ederken kullaniciyi bilgilendirir.
- Error state'i hata durumunda mesaj gostermeyi saglar.
- HTTP kodu ayri API dosyasina tasinabilir.
- Arama formu ile kullanici etkilesimine bagli istek yapilabilir.
- `useMemo`, pahali hesaplama sonucunu hatirlar.
- `useRef`, DOM elementine veya reaktif olmayan degere referans tutar.
- Custom hook, tekrar eden React mantigini paketler.
- `useToggle`, ac/kapat mantigini yeniden kullanilabilir yapar.
- Context, ortak veriyi derindeki componentlere props gecmeden ulastirir.

---

## Kisa Ezber Kartlari

```txt
HTTP request = API'den veri istemek
axios.get = GET istegi yapmak
response.data = gelen asil veri
useEffect = mount sonrasi yan etki
useState = gelen veriyi ekrana baglamak
loading = istek devam ediyor mu?
error = hata oldu mu?
try...catch = hata yakalama
useMemo = hesaplama sonucunu hatirla
useRef = DOM veya reaktif olmayan deger kutusu
custom hook = tekrar eden hook mantigini paketle
useToggle = ac/kapat sistemi
Context = ortak veri alani
Provider = veriyi dagitan
useContext = veriyi alan
```
