# Modul 3: Formlar

Bu dosya, `3.Ders-1.pdf` icindeki temel formlar konusunu en basit haliyle bolunmus sekilde anlatir.
Her baslik icin:

- Kisa ozet
- Mini kod fikri
- 10 soru ve kisa cevap

Toplam: `17 madde x 10 soru = 170 soru-cevap`

---

## 1. Form nedir?

Form, kullanicidan veri almak icin kullanilir.

Mini kod:

```jsx
<form>
  <input type="text" />
  <button type="submit">Gonder</button>
</form>
```

### Sorular ve Cevaplar

1. Form ne icin kullanilir?
   Cevap: Kullanicidan veri almak icin kullanilir.
2. Formu saran temel HTML etiketi nedir?
   Cevap: `<form>`
3. Yazi girmek icin en temel eleman hangisidir?
   Cevap: `<input>`
4. Formu gondermek icin hangi buton tipi kullanilir?
   Cevap: `type="submit"`
5. Form sadece React'e ozel bir yapi midir?
   Cevap: Hayir, HTML yapisidir; React bunu kullanir.
6. Bir formda birden fazla input olabilir mi?
   Cevap: Evet, olabilir.
7. Sifre almak icin hangi input tipi kullanilir?
   Cevap: `password`
8. Email almak icin hangi input tipi uygundur?
   Cevap: `email`
9. Formun icinde buton olmak zorunda midir?
   Cevap: Cogu durumda evet, ama baska sekilde de submit tetiklenebilir.
10. Formun temel amaci nedir?
    Cevap: Veriyi toplamak ve islemektir.

---

## 2. onSubmit olayi

`onSubmit`, form gonderildiginde calisir.

Mini kod:

```jsx
<form onSubmit={handleSubmit}></form>
```

### Sorular ve Cevaplar

1. `onSubmit` ne zaman calisir?
   Cevap: Form gonderildiginde calisir.
2. `onSubmit` nereye yazilir?
   Cevap: `<form>` etiketine yazilir.
3. `onSubmit` bir fonksiyon alir mi?
   Cevap: Evet, bir event handler alir.
4. `onSubmit={handleSubmit}` ne demektir?
   Cevap: Form gonderilince `handleSubmit` calisir.
5. `onSubmit` sadece butona tiklayinca mi calisir?
   Cevap: Hayir, Enter ile de calisabilir.
6. `submit` olan buton neyi tetikler?
   Cevap: Formun `onSubmit` olayini tetikler.
7. `onClick` ile `onSubmit` ayni sey mi?
   Cevap: Hayir, `onClick` butonda, `onSubmit` formda calisir.
8. Bir formda `onSubmit` olmadan submit olur mu?
   Cevap: HTML seviyesinde olabilir ama React'te islem yapmak icin gerekir.
9. `onSubmit` callback'ine ne gelir?
   Cevap: Event nesnesi gelir.
10. Form isleme mantigi genelde nerede yazilir?
    Cevap: `handleSubmit` gibi bir fonksiyonda.

---

## 3. preventDefault() kullanimi

Tarayicinin varsayilan form gonderme davranisini durdurur.

Mini kod:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
};
```

### Sorular ve Cevaplar

1. `preventDefault()` ne yapar?
   Cevap: Varsayilan davranisi engeller.
2. Formda varsayilan davranis nedir?
   Cevap: Sayfanin yenilenmesi veya formun gonderilmesidir.
3. `preventDefault()` neden kullanilir?
   Cevap: Form verisini React icinde kontrol etmek icin.
4. `preventDefault()` hangi nesne uzerinden cagrilir?
   Cevap: Event nesnesi uzerinden.
5. `e.preventDefault()` yazmazsak ne olabilir?
   Cevap: Sayfa yenilenebilir.
6. Bu metod en cok hangi event ile gorulur?
   Cevap: `onSubmit`
7. `preventDefault()` state'i degistirir mi?
   Cevap: Hayir, sadece varsayilan davranisi durdurur.
8. `preventDefault()` bir kere cagrilinca form bozulur mu?
   Cevap: Hayir, sadece submit davranisi kontrol edilir.
9. React formlarinda neden onemlidir?
   Cevap: Sayfa yenilenmeden veri isleyebilmek icin.
10. `preventDefault()` olmadan temiz form akisi olur mu?
    Cevap: Genelde zor olur.

---

## 4. Kontrolsuz form mantigi

Degerler state'te degil, submit aninda formdan okunur.

Mini kod:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
};
```

### Sorular ve Cevaplar

1. Kontrolsuz form nedir?
   Cevap: Degerlerin state yerine DOM'dan alindigi formdur.
2. Degerlere ne zaman ihtiyac vardir?
   Cevap: Genelde submit aninda.
3. Kontrolsuz formda input degeri nerede tutulur?
   Cevap: DOM elemaninda tutulur.
4. Bu yontemde her tus vurusunda state guncellenir mi?
   Cevap: Hayir.
5. Kontrolsuz form ne icin uygundur?
   Cevap: Basit formlar icin.
6. `e.target` burada neyi temsil eder?
   Cevap: Form elemanini temsil eder.
7. Kontrolsuz formda `value` prop'u zorunlu mudur?
   Cevap: Hayir.
8. Kontrolsuz form state kullanmadan calisabilir mi?
   Cevap: Evet.
9. Bu yontem dogrulama icin her zaman uygun mudur?
   Cevap: Hayir, anlik kontrol gereken yerde yetersiz kalabilir.
10. Kontrolsuz formun avantajı nedir?
    Cevap: Daha az kodla basit veri alma saglar.

---

## 5. form.elements ile alanlara erisim

Form icindeki elemanlara `name` ile ulasilir.

Mini kod:

```jsx
const login = e.target.elements.login.value;
```

### Sorular ve Cevaplar

1. `form.elements` ne verir?
   Cevap: Form elemanlarina erisim saglar.
2. Input'a nasil ulasiriz?
   Cevap: `form.elements.inputAdi`
3. Degeri nasil aliriz?
   Cevap: `.value` ile aliriz.
4. `elements` hangi etikette kullanilir?
   Cevap: Form elemaninda.
5. `elements.login` ne demektir?
   Cevap: `name="login"` olan alani verir.
6. `elements` kullanmak icin ne gerekli?
   Cevap: Alanin `name` ozelligi olmali.
7. `elements.password.value` ne verir?
   Cevap: Sifre alaninin degerini verir.
8. Bu yapi kontrolsuz formda mi daha yaygindir?
   Cevap: Evet.
9. `id` yerine neden `name` burada daha onemlidir?
   Cevap: `elements` erisimi `name` ile yapilir.
10. `form.elements` React'e ozel midir?
    Cevap: Hayir, DOM ozelligidir.

---

## 6. name ozelliginin onemi

`name`, form alanlarini tanimlamak icin cok onemlidir.

Mini kod:

```jsx
<input name="login" />
```

### Sorular ve Cevaplar

1. `name` ne ise yarar?
   Cevap: Form alanini tanimlar.
2. `form.elements` hangi bilgiyle calisir?
   Cevap: `name` ile calisir.
3. Iki input ayni `name` alirsa ne olabilir?
   Cevap: Erisim karisik hale gelebilir.
4. `name` ile `placeholder` ayni sey midir?
   Cevap: Hayir.
5. `name` kullanmadan kontrolsuz formdan veri almak zorlasir mi?
   Cevap: Evet.
6. `name` backend icin de onemli olabilir mi?
   Cevap: Evet.
7. Kontrollu formda da `name` kullanilir mi?
   Cevap: Evet, ozellikle genel handler'da.
8. `name="email"` neyi anlatir?
   Cevap: Bu alan email alanidir.
9. `name`, kullaniciya gorunur mu?
   Cevap: Hayir, teknik bir ozelliktir.
10. Formdaki alanlari eslestirmede neden iyidir?
    Cevap: Veriyi anlamli isimlerle toplar.

---

## 7. Form verisini objeye cevirme

Toplanan veriyi daha duzenli kullanmak icin obje yapariz.

Mini kod:

```jsx
onLogin({
  login,
  password,
});
```

### Sorular ve Cevaplar

1. Neden obje kullaniriz?
   Cevap: Veriyi duzenli tasimak icin.
2. `{ login, password }` ne tur bir yapidir?
   Cevap: Bir objedir.
3. Parent bileşene veri yollamak icin neden uygundur?
   Cevap: Tek parametre ile temiz veri verir.
4. Obje icinde anahtar isimleri ne olabilir?
   Cevap: Alan isimlerine gore belirlenir.
5. `onLogin(login, password)` yerine obje neden daha iyi olabilir?
   Cevap: Daha okunakli ve genisletilebilir olur.
6. Yeni alan eklenirse obje yapisi kolayca genisler mi?
   Cevap: Evet.
7. Bu veri backend'e gonderilmeye uygun mudur?
   Cevap: Evet, genelde uygundur.
8. Form verisini string yerine obje yapmak neden faydali?
   Cevap: Alanlari tek tek ayirir.
9. `const data = { login, password }` ne ise yarar?
   Cevap: Form verisini bir arada tutar.
10. Bu yapi React'te yaygin midir?
    Cevap: Evet, cok yaygindir.

---

## 8. Formu ayri bilesen yapmak

Formlar genelde ayri bir component olarak yazilir.

Mini kod:

```jsx
<LoginForm onLogin={handleLogin} />
```

### Sorular ve Cevaplar

1. Form neden ayri bilesen yapilir?
   Cevap: Kod daha duzenli olsun diye.
2. Ayri bilesen yapmak tekrar kullanimi kolaylastirir mi?
   Cevap: Evet.
3. Parent formdan gelen veriyi nasil alir?
   Cevap: Prop ile.
4. `onLogin` burada ne olabilir?
   Cevap: Bir callback prop olabilir.
5. Form kendi icinde sadece veri toplar mi?
   Cevap: Cogu zaman evet.
6. Verinin ne yapilacagina kim karar verir?
   Cevap: Ust bilesen.
7. Form bileseni reusable olabilir mi?
   Cevap: Evet.
8. `LoginForm` React bileseni midir?
   Cevap: Evet.
9. Formu ayri yazmak okunabilirligi artirir mi?
   Cevap: Evet.
10. Bu yapi buyuk projelerde faydali midir?
    Cevap: Evet, cok faydalidir.

---

## 9. Event nesnesini parent'a gondermemek

Parent'a `event` degil, temiz veri gondermek daha dogrudur.

Mini kod:

```jsx
onLogin({ login, password });
```

### Sorular ve Cevaplar

1. Parent'a ne gondermek daha dogrudur?
   Cevap: Temiz form verisi.
2. Event nesnesi neden parent'a gonderilmez?
   Cevap: Gereksiz bagimlilik olusturur.
3. Event nesnesi genelde nerede kullanilir?
   Cevap: Form bileseni icinde.
4. `event` daha cok ne icin gerekir?
   Cevap: `preventDefault` ve form elemanlarina erisim icin.
5. Parent neden sadece veriyi bilmeli?
   Cevap: Ihtiyaci olan sey veridir, DOM detayi degil.
6. Event gondermek anti-pattern olabilir mi?
   Cevap: Evet.
7. `onLogin(event)` yerine ne daha iyidir?
   Cevap: `onLogin({ login, password })`
8. Bu ayrim kodu temizler mi?
   Cevap: Evet.
9. Parent'in DOM'u bilmesi gerekir mi?
   Cevap: Hayir.
10. Bu yapi component sorumlulugunu netlestirir mi?
    Cevap: Evet.

---

## 10. useId kullanimi

`useId`, input ile label arasinda benzersiz bag kurar.

Mini kod:

```jsx
const loginId = useId();

<label htmlFor={loginId}>Login</label>
<input id={loginId} />
```

### Sorular ve Cevaplar

1. `useId` ne uretir?
   Cevap: Benzersiz bir id uretir.
2. `useId` en cok nerede kullanilir?
   Cevap: Form alanlarinda.
3. `label` ile `input` nasil baglanir?
   Cevap: `htmlFor` ve `id` ile.
4. `htmlFor` neyin React karsiligidir?
   Cevap: HTML'deki `for` ozelliginin.
5. Ayni sayfada ayni id kullanmak dogru mudur?
   Cevap: Hayir.
6. `useId` erisilebilirlik icin iyi midir?
   Cevap: Evet.
7. Label'a tiklayinca input'a odaklanmasi neyle olur?
   Cevap: `htmlFor` ve `id` eslesmesiyle.
8. `useId` liste key'i icin uygun mudur?
   Cevap: Hayir.
9. Her alan icin ayri `useId` cagrisi yapilabilir mi?
   Cevap: Evet.
10. `useId` parametre alir mi?
    Cevap: Hayir.

---

## 11. Kontrollu input mantigi

Input degeri React state icinde tutulur.

Mini kod:

```jsx
const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Sorular ve Cevaplar

1. Kontrollu input nedir?
   Cevap: Degeri state ile yonetilen inputtur.
2. Input'un gorunen degeri nereden gelir?
   Cevap: State'ten gelir.
3. State'i ne gunceller?
   Cevap: `setValue`
4. Her yazmada ne olur?
   Cevap: `onChange` calisir ve state guncellenir.
5. Kontrollu input'un temel iki parcasi nedir?
   Cevap: `value` ve `onChange`
6. Baslangic degeri bos olabilir mi?
   Cevap: Evet.
7. Kullanici yazdikca UI neden guncellenir?
   Cevap: Cunku state degisir.
8. Bu yapi anlik kontrol icin uygun mudur?
   Cevap: Evet.
9. Form disinda arama kutusunda da kullanilir mi?
   Cevap: Evet.
10. Kontrollu input neden yaygindir?
    Cevap: Veriyi React icinde tam kontrol etmeyi saglar.

---

## 12. onChange ile anlik veri yakalama

Kullanici yazdikca input degerini aliriz.

Mini kod:

```jsx
const handleChange = (e) => {
  setValue(e.target.value);
};
```

### Sorular ve Cevaplar

1. `onChange` ne zaman calisir?
   Cevap: Alan degistiginde calisir.
2. Input icindeki guncel veri nasil alinir?
   Cevap: `e.target.value` ile.
3. `onChange` kontrollu inputta neden onemlidir?
   Cevap: State'i gunceller.
4. Kullanici tek harf yazsa da calisir mi?
   Cevap: Evet.
5. `handleChange` bir event alir mi?
   Cevap: Evet.
6. `e.target` burada neyi verir?
   Cevap: Olayin geldigi input'u verir.
7. `value` okumadan sadece `onChange` yeter mi?
   Cevap: Kontrollu yapi icin hayir.
8. `onChange` ile canli arama yapilabilir mi?
   Cevap: Evet.
9. Bu olay sadece text input icin midir?
   Cevap: Hayir, select ve checkbox icin de vardir.
10. `onChange` ile veri nereye aktarilir?
    Cevap: Genelde state'e.

---

## 13. value + onChange birlikte kullanimi

Kontrollu elemanlarda ikisi beraber kullanilir.

Mini kod:

```jsx
<input value={value} onChange={handleChange} />
```

### Sorular ve Cevaplar

1. `value` neyi belirler?
   Cevap: Input'un ekranda gorunen degerini.
2. `onChange` neyi yapar?
   Cevap: Degisikligi yakalar.
3. Sadece `value` verip `onChange` vermezsek ne olur?
   Cevap: Input degistirilemez hale gelebilir.
4. Sadece `onChange` verip `value` vermezsek ne olur?
   Cevap: Tam kontrollu yapi olmaz.
5. Kontrollu input icin hangileri gerekir?
   Cevap: `value` ve `onChange`
6. `value` state'ten gelir mi?
   Cevap: Evet.
7. `onChange` state'i gunceller mi?
   Cevap: Evet.
8. Bu yapi React uyarilarini azaltir mi?
   Cevap: Evet, dogru kullanimda azaltir.
9. Bu ikili mantik textarea icin de gecerli mi?
   Cevap: Evet.
10. Bu desen neden onemlidir?
    Cevap: Veri akisini tutarli yapar.

---

## 14. select elemani kullanimi

Acilir listelerde secim yapmak icin kullanilir.

Mini kod:

```jsx
<select value={lang} onChange={(e) => setLang(e.target.value)}>
  <option value="tr">TR</option>
  <option value="en">EN</option>
</select>
```

### Sorular ve Cevaplar

1. `select` ne icin kullanilir?
   Cevap: Secim yapmak icin.
2. `option` neyi temsil eder?
   Cevap: Secenekleri temsil eder.
3. Her `option` icin hangi ozellik onemlidir?
   Cevap: `value`
4. Secilen deger nasil okunur?
   Cevap: `e.target.value`
5. Kontrollu `select` icin ne kullanilir?
   Cevap: `value` ve `onChange`
6. `select` kontrolsuz de kullanilabilir mi?
   Cevap: Evet.
7. Form icinde kontrolsuz `select` degeri nasil alinir?
   Cevap: `form.elements.alanAdi.value`
8. `value="tr"` neyi anlatir?
   Cevap: Secimin degeri `tr` olur.
9. Varsayilan secili deger state ile verilebilir mi?
   Cevap: Evet.
10. `select`, radio'ya alternatif olabilir mi?
    Cevap: Evet.

---

## 15. State lifting

Secim veya veri, alt bilesenden ust bilesene tasinir.

Mini kod:

```jsx
<LangSwitcher value={lang} onSelect={setLang} />
```

### Sorular ve Cevaplar

1. State lifting nedir?
   Cevap: State'i ust bilesene tasimaktir.
2. Neden state yukariya tasinir?
   Cevap: Diger bilesenler de veriye erissin diye.
3. Alt bilesen state'i prop ile alabilir mi?
   Cevap: Evet.
4. Alt bilesen degisiklik fonksiyonunu prop ile alabilir mi?
   Cevap: Evet.
5. `value={lang}` ne ise yarar?
   Cevap: Secili degeri alt bilesene gonderir.
6. `onSelect={setLang}` ne ise yarar?
   Cevap: Alt bilesen secimi degistirsin diye.
7. Bu yapi veri akis yonunu netlestirir mi?
   Cevap: Evet.
8. Parent yeniden render olur mu?
   Cevap: State degisirse evet.
9. Bu desen React'te yaygin midir?
   Cevap: Evet.
10. Birden fazla bilesen ayni veriyi kullanacaksa faydali midir?
    Cevap: Evet.

---

## 16. Radio button kullanimi

Bir gruptan sadece tek bir secim yapilir.

Mini kod:

```jsx
<input
  type="radio"
  name="gender"
  value="male"
  checked={gender === "male"}
  onChange={(e) => setGender(e.target.value)}
/>
```

### Sorular ve Cevaplar

1. Radio button ne icin kullanilir?
   Cevap: Tek secim yapmak icin.
2. Radio'larin ayni grupta olmasi icin ne gerekir?
   Cevap: Ayni `name`
3. Her radio hangi ozellikle kendi degerini tasir?
   Cevap: `value`
4. Secili olup olmadigi hangi ozellikle kontrol edilir?
   Cevap: `checked`
5. Radio'da `value` mi `checked` mi daha kritik?
   Cevap: Ikisi de, ama secili durumu `checked` belirler.
6. `checked={gender === "male"}` ne demektir?
   Cevap: State `male` ise bu radio secilidir.
7. Radio degisince state nasil guncellenir?
   Cevap: `onChange` ile.
8. Birden fazla radio ayni anda secili olabilir mi?
   Cevap: Ayni grupta hayir.
9. Radio, select'e alternatif midir?
   Cevap: Evet.
10. Radio kontrollu kullanilabilir mi?
    Cevap: Evet.

---

## 17. Checkbox ve kontrollu form

Checkbox'ta `checked` kullanilir. Buyuk formlarda tum alanlar tek state objesinde tutulabilir.

Mini kod:

```jsx
const [values, setValues] = useState({
  login: "",
  password: "",
  agree: false,
});
```

### Sorular ve Cevaplar

1. Checkbox neye izin verir?
   Cevap: Onay verme veya coklu secime izin verir.
2. Checkbox'in durumu nasil okunur?
   Cevap: `e.target.checked`
3. Checkbox'ta `value` yerine daha cok ne kullanilir?
   Cevap: `checked`
4. Bir butonu checkbox'a gore acip kapatabilir miyiz?
   Cevap: Evet.
5. `disabled={!agree}` ne anlama gelir?
   Cevap: Onay yoksa buton pasif olur.
6. Kontrollu formda veriler nerede tutulur?
   Cevap: State icinde.
7. Birden fazla alan tek objede tutulabilir mi?
   Cevap: Evet.
8. `name` ile state key'lerini ayni tutmak neden iyidir?
   Cevap: Genel handler yazmayi kolaylastirir.
9. Kontrollu formda submit sonrasi nasil sifirlanir?
   Cevap: State baslangic degerine donderilir.
10. Buyuk kontrollu formlarda neden kutuphane kullanilir?
    Cevap: Yonetim ve dogrulama kolay olsun diye.

---

## Ek: Kontrollu Formda Genel handleChange Mantigi

Bu kisim PDF'in sonundaki toplu form mantigini en basit haliyle ozetler.

Mini kod:

```jsx
const [values, setValues] = useState({
  login: "",
  password: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;

  setValues({
    ...values,
    [name]: value,
  });
};
```

Kisa notlar:

- `name`, hangi alanin degistigini soyler.
- `[name]: value`, dogru alani gunceller.
- Tek fonksiyonla birden fazla input yonetilir.

Mini kod:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(values);

  setValues({
    login: "",
    password: "",
  });
};
```

---

## Calisma Onerisi

Bu dosyayi en verimli sekilde soyle kullanabilirsin:

1. Once sadece basliklari oku.
2. Sonra her madde icin mini kodu yaz.
3. Ardindan 10 soruyu kendin cevaplamaya calis.
4. En son cevaplari kontrol et.
5. Takildigin maddeleri `deneme.jsx` icinde tek tek uygula.

---

## Kisa Genel Ozet

- Basit form: `form + input + submit`
- Submit kontrolu: `onSubmit + preventDefault()`
- Kontrolsuz form: Degerleri submit aninda al
- Kontrollu form: Degerleri state'te tut
- Text ve select: `value`
- Radio ve checkbox: `checked`
- Buyuk formlar: Tek obje state + genel `handleChange`
