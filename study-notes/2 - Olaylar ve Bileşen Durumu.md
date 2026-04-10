# Modul 2: Olaylar ve Bilesen Durumu

## Unite 1: Events ve Component State Temelleri

Bu unite'de React'te olay isleyicileri, fonksiyon referansi, event object, props okuma, component state, reaktivite, `useState`, coklu state, durum izolasyonu, state lifting, object state guncelleme, hook kisitlari ve virtual DOM konularini ele aldik.

## 1. Olay Isleyicisi (Event Handler)

React'te kullanici etkilesimlerini yakalamak icin event handler kullanilir.

Ornek olaylar:

- `onClick`
- `onChange`
- `onSubmit`

Temel kullanim:

```jsx
const App = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

Burada:

- `handleClick` bir fonksiyondur
- `onClick` ise React'in olay prop'udur
- kullanici butona tikladiginda bu fonksiyon calisir

Not:

- React'te olay prop'lari camelCase yazilir
- cogu durumda `addEventListener()` kullanmaya gerek kalmaz

## 2. Fonksiyon Referansi

Event handler'a fonksiyonun kendisi verilmelidir, sonucu degil.

Dogru:

```jsx
<button onClick={handleClick}>Click</button>
```

Yanlis:

```jsx
<button onClick={handleClick()}>Click</button>
```

Fark:

- `handleClick` = fonksiyon referansi
- `handleClick()` = fonksiyonu hemen calistirmak

Eger satir ici kullanim gerekiyorsa anonim fonksiyonla sarmalanabilir:

```jsx
<button onClick={() => alert('Clicked')}>Click</button>
```

Bu yapi sadece tiklama aninda calisir.

## 3. Olay Objesi (Event Object)

React'te event handler fonksiyonlari varsayilan olarak olay nesnesi alabilir.

```jsx
const handleChange = (event) => {
  console.log(event.target.value);
};

return <input onChange={handleChange} />;
```

React burada tarayicidan gelen ham event'i dogrudan vermek yerine cogu durumda `SyntheticEvent` adli sarmalanmis bir event nesnesi kullanir.

Kisa ayrim:

- native event = tarayicinin kendi olay nesnesi
- SyntheticEvent = React'in daha tutarli hale getirdigi olay nesnesi

Temel fikir:

- tarayici olayi olusturur
- React onu yakalar
- React bu olayi sana daha standart bir event nesnesi olarak verir

Bu sayede farkli tarayicilar arasindaki kucuk davranis farklari daha yonetilebilir olur.

## 4. Props Okuma ve Event Handler

Event handler'lar bilesen icinde tanimlandigi icin props'lara erisebilir.

```jsx
const CustomButton = ({ message }) => {
  const handleClick = () => {
    alert(message);
  };

  return <button onClick={handleClick}>Show message</button>;
};
```

Burada:

- `message` prop olarak gelir
- `handleClick` bu prop'u kullanir
- tiklaninca `message` degeriyle calisir

## 5. Bilesenin Durumu (Component State)

`state`, bir bilesenin kendi icinde tuttugu ve zamanla degisebilen veridir.

Ornekler:

- input icine yazilan son deger
- secili resim
- acik sekme
- sayac degeri
- sepet urun sayisi

Kisa ayrim:

- `props` = bilesene disaridan gelen veri
- `state` = bilesenin kendi icindeki dinamik veri

Temel ozellikler:

- state, render icin gerekli minimum veri setini tutmalidir
- string, number, boolean, array ve object olabilir
- kullanici eylemlerine gore degisebilir
- state degisirse UI de degisir

## 6. Reaktivite ve Normal Degisken Problemi

Asagidaki kod ilk bakista mantikli gorunebilir:

```jsx
const App = () => {
  let clicks = 0;

  const handleClick = () => {
    clicks = clicks + 1;
    console.log(clicks);
  };

  return <button onClick={handleClick}>Current: {clicks}</button>;
};
```

Burada `console.log(clicks)` artabilir. Yani JavaScript degiskeni event handler icinde gercekten degisir.

Ama arayuz neden degismez?

Iki neden:

1. Yerel degiskenler render'lar arasinda korunmaz
2. Yerel degisken degisikligi React'e yeniden render etmesini soylemez

Kisa oz:

- normal degisken degisebilir
- ama React bunu izlemiyorsa UI guncellenmez

## 7. `useState` Hook'u

`useState`, React'in state yonetmek icin verdigi bir Hook'tur.

Kullanimi:

```jsx
import { useState } from 'react';
```

Hook'lar, React'in sundugu ozel fonksiyonlardir. `useState` bunlardan biridir ve bilesenin belirli bir veriyi "hatirlamasini" saglar.

Ornek:

```jsx
const [clicks, setClicks] = useState(0);
```

Burada:

- `0` = baslangic degeri
- `clicks` = mevcut state degeri
- `setClicks` = state'i guncelleyen fonksiyon

Bu yapi array destructuring kullanir:

```jsx
const result = useState(0);
// [deger, setter]
```

Isimler sabit degildir ama yaygin konvansiyon:

- `count`, `setCount`
- `name`, `setName`
- `isOpen`, `setIsOpen`

## 8. `useState` Nasil Calisir

Temel ornek:

```jsx
import { useState } from 'react';

const App = () => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return <button onClick={handleClick}>Current: {clicks}</button>;
};
```

Akis:

1. Ilk render'da `clicks = 0`
2. Kullanici tiklar
3. `setClicks(clicks + 1)` calisir
4. React yeni state'i kaydeder
5. Bilesen yeniden render edilir
6. Ekranda yeni deger gorunur

Yani:

```text
setClicks(...) -> state guncellenir -> yeniden render -> UI guncellenir
```

## 9. Birden Fazla State Kullanimi

Bir bilesende ihtiyac kadar state tanimlanabilir. Her biri icin ayri `useState` cagrilir.

```jsx
const App = () => {
  const [clicks, setClicks] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={handleClick}>Current: {clicks}</button>
      <button onClick={handleToggle}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>Now you can see me!</p>}
    </>
  );
};
```

Burada:

- `clicks` ve `isOpen` birbirinden bagimsizdir
- her biri kendi setter fonksiyonuna sahiptir
- biri degisince digerinin mantigi otomatik olarak bozulmaz

## 10. Durum Izolasyonu

State, bilesenin tanimina degil, bilesen ornegine ozeldir.

```jsx
const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return <button onClick={handleClick}>Current: {clicks}</button>;
};
```

Kullanim:

```jsx
const App = () => {
  return (
    <>
      <ClickCounter />
      <ClickCounter />
    </>
  );
};
```

Sonuc:

- her `ClickCounter` kendi state'ini ayri tutar
- bir buton tiklaninca digeri etkilenmez
- ayni bilesen kodu paylasilsa da state paylasilmaz

Bu, state'in "instance bazli" oldugunu gosterir.

## 11. Durum Yukseltme (State Lifting)

Eger birden fazla child ayni state'i paylasacaksa, state ortak parent'a tasinir.

```jsx
const ClickCounter = ({ value, onUpdate }) => {
  return <button onClick={onUpdate}>Current: {value}</button>;
};

const App = () => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <>
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
    </>
  );
};
```

Burada:

- state parent olan `App` icinde tutulur
- state degeri `value` prop'u ile child'a gider
- state'i degistiren fonksiyon `onUpdate` prop'u ile child'a gider
- child, `button onClick={onUpdate}` ile parent fonksiyonunu tetikler

Kisa not:

- `value` ve `onUpdate` isimleri sabit degildir
- `onClick` ise React'in olay prop'udur

## 12. Nesnelerin State Olarak Guncellenmesi

State icinde object tutulabilir.

```jsx
const App = () => {
  const [values, setValues] = useState({
    x: 0,
    y: 0,
  });

  return <p>x: {values.x}, y: {values.y}</p>;
};
```

Dogrudan mutasyon yanlistir:

```jsx
values.x += 1; // yanlis
```

Cunku React state'in dogrudan degistirilmesini izlemek yerine setter ile yeni state verilmesini bekler.

Yanlis guncelleme:

```jsx
setValues({
  x: values.x + 1,
});
```

Bu durumda `y` kaybolur.

Dogru guncelleme:

```jsx
setValues({
  ...values,
  x: values.x + 1,
});
```

Ayni mantik `y` icin de gecerli:

```jsx
setValues({
  ...values,
  y: values.y + 1,
});
```

Kisa oz:

- object state mutate edilmez
- eski object kopyalanir
- sadece degisen alan yeni degerle override edilir

## 13. Hook Kisitalari

Hook'lar rastgele yerde cagrilmaz.

Temel kurallar:

- Hook'lar sadece React function component icinde veya baska Hook'lar icinde kullanilir
- Hook'lar bilesen fonksiyonunun en ust seviyesinde cagrilmalidir
- `if`, `for`, `while` gibi bloklarin icine yazilmaz

Dogru:

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
};
```

Yanlis:

```jsx
const App = () => {
  if (true) {
    const [count, setCount] = useState(0); // yanlis
  }
};
```

Sebep:

- React Hook'lari cagrilma sirasina gore takip eder
- bu sira bozulursa React hangi state'in hangi Hook'a ait oldugunu karistirabilir

## 14. Virtual DOM

React JSX yazarken dogrudan gercek tarayici DOM'u ile calismaz. Araya `Virtual DOM` adli bir katman koyar.

Gercek DOM:

- tarayicidaki HTML agacinin gercek temsilidir
- degistirilmesi layout, paint ve benzeri maliyetler dogurabilir

Virtual DOM:

- gercek DOM'un React tarafindaki hafif temsilidir
- bellekte tutulur
- ekranda dogrudan render edilmez

State veya props degistiginde React:

1. yeni bir virtual DOM agaci olusturur
2. eski virtual DOM ile yenisini karsilastirir
3. bu karsilastirmaya `diffing` denir
4. sadece degisen kisimlari bulur
5. gercek DOM'da minimum guncellemeyi yapar

Ornek mantik:

```text
state degisti
-> bilesen yeniden calisti
-> yeni JSX olustu
-> yeni virtual DOM olustu
-> eskiyle karsilastirildi
-> sadece gereken DOM degisiklikleri uygulandi
```

Kisa not:

- render olmak = yeni UI tarifini hesaplamak
- DOM'u guncellemek = sadece gereken gercek degisikligi uygulamak

Bu ayrim React'in neden verimli calistigini anlamak icin cok onemlidir.

## Kisa Notluk Ozet

- React'te olaylar `onClick`, `onChange`, `onSubmit` gibi event prop'lari ile yonetilir
- event handler'a fonksiyon referansi verilir, sonucu degil
- React olay nesnelerini `SyntheticEvent` ile daha tutarli hale getirir
- state, bilesenin kendi icindeki dinamik veridir
- normal `let` degiskenleri UI guncellemesi icin yeterli degildir
- `useState`, React'in state yonetmek icin verdigi Hook'tur
- bir bilesende birden fazla state olabilir
- ayni bilesenin farkli ornekleri state'i paylasmaz
- ortak state gerekiyorsa parent'a tasinir (`state lifting`)
- object state guncellerken spread ile onceki alanlar korunur
- Hook'lar en ust seviyede ve dogru yerde cagrilmalidir
- React, Virtual DOM ile sadece gereken gercek DOM degisikliklerini uygular

## Terminoloji

- Event: Kullanicinin yaptigi etkilesim
- Event handler: Olay oldugunda calisan fonksiyon
- Function reference: Fonksiyonun kendisini gecmek
- SyntheticEvent: React'in standartlastirdigi olay nesnesi
- State: Bilesenin kendi icinde tuttugu dinamik veri
- Re-render: Bilesenin yeniden calisip yeni JSX uretmesi
- Hook: React'in ozel yeteneklere erismek icin sundugu fonksiyon
- `useState`: State yonetmek icin kullanilan Hook
- Setter function: State'i guncelleyen fonksiyon
- State isolation: Her bilesen orneginin kendi state'ine sahip olmasi
- State lifting: Ortak state'in parent'a tasinmasi
- Immutable update: Eski state'i bozmadan yeni state olusturma
- Virtual DOM: Gercek DOM'un bellekteki hafif temsili
- Diffing: Eski ve yeni virtual DOM agaclarini karsilastirma
- Unidirectional data flow: Verinin ustten alta akmasi

## Unite 2: Effect'ler ve Bilesen Yasam Dongusu

Bu unite'de bilesenin yasam dongusu, `useEffect`, dependency array, mount/update/unmount mantigi, `StrictMode`, cleanup function, bellek sizintisi, `localStorage` ile veri kaliciligi ve effect'lerin dogru bagimliliklarla kullanimi konularini ele aldik.

## 1. Bilesenin Yasam Dongusu

React bileşenleri de belirli asamalardan gecer:

1. Mounting
2. Updating
3. Unmounting

Modal ornegiyle dusunebiliriz:

- Mounting: modal ilk kez ekrana gelir ve DOM'a eklenir
- Updating: modalin state'i veya props'u degisir ve yeniden render olur
- Unmounting: modal kapatilir ve DOM'dan kaldirilir

Bu asamalara bagli olarak calismasi gereken kodlar icin effect kullanilir.

## 2. Side Effect Nedir

Render'in gorevi UI'yi tarif etmektir. Ama bazen render disinda ekstra isler yapmamiz gerekir:

- sunucuya istek atmak
- `document.title` degistirmek
- `localStorage` ile calismak
- event listener eklemek
- zamanlayici baslatmak

Bunlara `side effect` denir.

Kisa ayrim:

- Render = UI nasil gorunmeli
- Effect = render disinda yapilacak is

## 3. `useEffect` Hook'u

`useEffect`, React'te side effect yonetmek icin kullanilan Hook'tur.

Temel yapi:

```jsx
useEffect(() => {
  // effect mantigi
}, deps);
```

Iki parametre alir:

- `callback`: effect'in kendisi
- `deps`: ne zaman tekrar calisacagini belirleyen dependency array

Ornek:

```jsx
import { useState, useEffect } from 'react';

const App = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${clicks} times`;
  });

  return (
    <button onClick={() => setClicks(clicks + 1)}>
      You clicked {clicks} times
    </button>
  );
};
```

Burada `document.title` guncellemek bir side effect'tir.

## 4. Dependency Array Mantigi

Dependency array, effect'in ne zaman yeniden calisacagini belirler.

### Dependency verilmezse

```jsx
useEffect(() => {
  console.log('Her render sonrasi calisir');
});
```

Bu durumda effect her render sonrasi calisir.

### Bos array verilirse

```jsx
useEffect(() => {
  console.log('Sadece mount sonrasi bir kez');
}, []);
```

Bu durumda effect yalnizca mount sonrasinda bir kez calisir.

### Belirli bagimlilik verilirse

```jsx
useEffect(() => {
  console.log('Clicks degisti');
}, [clicks]);
```

Bu durumda:

- ilk mount sonrasi calisir
- sonra sadece `clicks` degistiginde tekrar calisir

## 5. Guncelleme Asamasi ve Dependency Hatalari

Bir effect icinde kullanilan state, props veya bilesen ici degiskenler dependency array'e yazilmalidir.

Hatali ornek:

```jsx
useEffect(() => {
  console.log('Clicks updated: ', clicks);
}, []);
```

Burada `clicks` effect icinde kullaniliyor ama dependency array bos. Bu durumda effect sadece ilk mountta calisir, `clicks` degisse bile tekrar tetiklenmez.

Dogru kullanim:

```jsx
useEffect(() => {
  console.log('Clicks updated: ', clicks);
}, [clicks]);
```

Bu neden onemli?

- effect mantigi ile dependency listesi uyumlu olmalidir
- eksik dependency, kararsiz ve tahmin edilmesi zor davranisa yol acar
- ESLint'teki `react-hooks/exhaustive-deps` kurali bu hatalari yakalamak icin vardir

## 6. Birden Fazla Effect Kullanimi

Bir bileşende istedigin kadar effect olabilir.

```jsx
import { useState, useEffect } from 'react';

const App = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('You can see me only once!');
  }, []);

  useEffect(() => {
    console.log('Clicks updated: ', clicks);
  }, [clicks]);

  useEffect(() => {
    document.title = `You clicked ${clicks} times`;
  });

  return (
    <button onClick={() => setClicks(clicks + 1)}>
      You clicked {clicks} times
    </button>
  );
};
```

Bu yapinin avantaji:

- her effect tek bir ise odaklanir
- mantik daha okunabilir olur
- farkli dependency kurallari ayri ayri tanimlanabilir

## 7. Birden Fazla State ile Effect Kullanimi

Farkli state kombinasyonlari farkli effect'lere baglanabilir.

```jsx
const App = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    console.log('First updated: ', first);
  }, [first]);

  useEffect(() => {
    console.log('Second updated: ', second);
  }, [second]);

  useEffect(() => {
    console.log('First or second updated: ', first + second);
  }, [first, second]);

  return (
    <>
      <button onClick={() => setFirst(first + 1)}>First: {first}</button>
      <button onClick={() => setSecond(second + 1)}>Second: {second}</button>
    </>
  );
};
```

Burada:

- ilk effect sadece `first` degisince
- ikinci effect sadece `second` degisince
- ucuncu effect her ikisinden biri degisince calisir

Onemli not:

- dependency verilen effect'ler de ilk mountta bir kez calisir

## 8. Montaj Asamasi

Bos dependency array verilen effect, mount sonrasi bir kez calisir:

```jsx
useEffect(() => {
  console.log('You can see me only once!');
}, []);
```

Tipik kullanimlar:

- ilk veri cekme
- ilk event listener ekleme
- ilk zamanlayiciyi baslatma
- ilk `localStorage` okuma/dis dunya senkronu

## 9. StrictMode ve Cift Mount Davranisi

Gelistirme modunda `StrictMode`, bazi bilesenleri su sirayla test eder:

1. Mount
2. Effect calisir
3. Unmount
4. Tekrar mount
5. Effect tekrar calisir

Bu neden yapilir?

- effect'ler cleanup gerektiriyor mu?
- kod mount/unmount dongusune dayanikli mi?
- olasi hatalar erken yakalanabiliyor mu?

Yani effect'in iki kez calismasi gelistirme modunda cogu zaman normaldir.

## 10. Bilesen Kaldirma Asamasi ve Bellek Sizintisi

Asagidaki kod problemli olabilir:

```jsx
const App = () => {
  useEffect(() => {
    setInterval(() => {
      console.log(`Interval - ${Date.now()}`);
    }, 2000);
  }, []);

  return <div>App</div>;
};
```

Burada interval baslatiliyor ama hic durdurulmuyor.

Ozellikle `StrictMode` altinda:

- ilk mountta bir interval baslar
- unmount olur ama temizlenmez
- tekrar mountta ikinci interval baslar

Bu, bellek sizintisi ve gereksiz arka plan isi anlamina gelebilir.

## 11. Modal Ornegi ve Neden Cleanup Gerekli

```jsx
const Modal = () => {
  useEffect(() => {
    setInterval(() => {
      console.log(`Interval - ${Date.now()}`);
    }, 2000);
  }, []);

  return <div>Modal</div>;
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && <Modal />}
    </div>
  );
};
```

Sorun:

- modal her acildiginda yeni interval baslar
- modal kapaninca interval durmazsa arka planda calismaya devam eder
- tekrar tekrar ac-kapa yapildikca yeni interval'ler birikir

## 12. Cleanup Function

`useEffect`, cleanup function dondurebilir:

```jsx
useEffect(() => {
  console.log('Effect');

  return () => {
    console.log('Clean up');
  };
});
```

Cleanup ne zaman calisir?

- bir sonraki effect calismadan once
- ve bilesen unmount olmadan hemen once

Yani:

```text
effect
-> cleanup
-> yeni effect
```

veya

```text
effect
-> unmount
-> cleanup
```

## 13. Interval Temizleme Ornegi

Dogru kullanim:

```jsx
const Modal = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Interval - ${Date.now()}`);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Modal</div>;
};
```

Burada:

- effect interval'i baslatir
- cleanup interval'i durdurur

Bu mantik sadece interval icin degil, su durumlar icin de kritik olabilir:

- event listener kaldirma
- timeout temizleme
- HTTP istegi iptal etme
- abonelik sonlandirma

## 14. `useEffect` Icin Zihinsel Karar Agaci

Bir effect yazarken su 3 soruyu sor:

1. Bu kod bir side effect mi?
2. Ne zaman calismali?
3. Baslatilan bir sey varsa temizlenmeli mi?

Kisa rehber:

- Sadece JSX uretmekse `useEffect` gerekmez
- Dis dunyaya dokunuyorsa `useEffect` dusun
- Bir sey baslatiyorsa cleanup ihtimalini kontrol et

## 15. LocalStorage ile Calisma

`localStorage`, sayfa yenilense bile veriyi tarayicida saklamak icin kullanilir.

Ornek baslangic:

```jsx
const App = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}>
        You clicked {clicks} times
      </button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  );
};
```

## 16. LocalStorage'a Kaydetme

State degistikce localStorage'a yazmak bir side effect'tir. Bu yuzden `useEffect` kullanilir.

```jsx
const App = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}>
        You clicked {clicks} times
      </button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  );
};
```

Mantik:

- `clicks` degistiginde effect calisir
- yeni deger localStorage'a yazilir

Not:

- `localStorage` degerleri string olarak saklar

## 17. LocalStorage'dan Okuma

Buradaki kritik fikir su:

- localStorage'dan ilk deger okumak icin `useEffect` kullanmak zorunlu degildir
- hatta cogu zaman en dogru yer, `useState`'in baslangic fonksiyonudur

Ornek:

```jsx
const [clicks, setClicks] = useState(() => {
  const savedClicks = window.localStorage.getItem('saved-clicks');

  if (savedClicks !== null) {
    return savedClicks;
  }

  return 0;
});
```

Bu yapi ne saglar?

- state'in ilk degeri mount oncesi hesaplanir
- ilk render'da dogru veri kullanilir

## 18. `useState(0)` ve `useState(() => 0)` Farki

Bu iki kullanim benzer gorunur:

```jsx
useState(0);
useState(() => 0);
```

Ama ikinci yazim, baslangic degerini hesaplayan bir fonksiyon vermene izin verir.

Bu sayede:

- localStorage okuma
- pahali ilk hesaplamalar
- dis kaynaktan ilk veri alma mantigi

gibi seyler baslangic asamasinda kurulabilir.

## 19. Karmaşik Veri ve JSON

Object veya array gibi veri tipleri localStorage'a yazilacaksa string'e cevrilmelidir:

```jsx
window.localStorage.setItem('key', JSON.stringify({}));
```

Geri okurken parse edilmelidir:

```jsx
const [obj, setObj] = useState(() => {
  const savedObject = window.localStorage.getItem('key');

  if (savedObject !== null) {
    return JSON.parse(savedObject);
  }

  return {};
});
```

Yani:

- yazarken `JSON.stringify`
- okurken `JSON.parse`

## 20. LocalStorage Ile Tam Sayaç Ornegi

```jsx
const App = () => {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return savedClicks;
    }
    return 0;
  });

  useEffect(() => {
    window.localStorage.setItem('saved-clicks', clicks);
  }, [clicks]);

  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}>
        You clicked {clicks} times
      </button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  );
};
```

Akis:

1. ilk acilista localStorage'dan deger okunur
2. state bu degerle baslar
3. state degistiginde yeni deger localStorage'a yazilir
4. sayfa yenilense bile son deger korunur

## Unite 2 Kisa Notluk Ozet

- `useEffect`, side effect yonetmek icin kullanilir
- dependency array effect'in ne zaman calisacagini belirler
- effect icinde kullanilan state/props gibi dis degerler dependency listesine yazilmalidir
- eksik dependency effect'i hatali ve tahmin edilmesi zor hale getirir
- bir bilesende birden fazla effect olabilir
- bos dependency array, effect'in mount sonrasinda bir kez calismasini saglar
- `StrictMode`, gelistirme modunda cleanup eksiklerini fark ettirebilir
- cleanup function, effect'in baslattigi isi temizlemek icin kullanilir
- interval, listener, subscription gibi seyler cleanup gerektirir
- `localStorage`'a yazmak effect icinde yapilir
- `localStorage`'dan baslangic degeri okumak cogu zaman `useState` baslangic fonksiyonu ile yapilir
- object ve array gibi veriler localStorage'da JSON olarak saklanir

## Unite 2 Terminoloji

- Lifecycle: Bilesenin mount, update ve unmount asamalari
- Side effect: Render disinda yapilan islem
- `useEffect`: Side effect yonetmek icin kullanilan Hook
- Dependency array: Effect'in hangi degisikliklerde tekrar calisacagini belirleyen dizi
- Mount: Bilesenin ilk kez DOM'a eklenmesi
- Update: State veya props degisikligiyle yeniden render olmasi
- Unmount: Bilesenin DOM'dan kaldirilmasi
- Cleanup function: Effect'in baslattigi isi temizleyen fonksiyon
- Memory leak: Gereksiz calismaya devam eden ve kaynak tuketen isler
- `localStorage`: Tarayicida kalici veri saklama alani
- Lazy initializer: `useState(() => ...)` ile baslangic degerini fonksiyonla hesaplama
- `JSON.stringify`: Veriyi string'e cevirme
- `JSON.parse`: String veriyi tekrar nesneye/diziye cevirme
