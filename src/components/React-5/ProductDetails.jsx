import { Link, useParams } from 'react-router-dom';

const products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'Kod yazmak, proje gelistirmek ve ders calismak icin kullanilir.',
  },
  {
    id: '2',
    name: 'Telefon',
    description: 'Iletisim, not alma ve mobil uygulamalari test etmek icin kullanilir.',
  },
  {
    id: '3',
    name: 'Kulaklik',
    description: 'Ders videolari, muzik ve toplantilar icin kullanilir.',
  },
];

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main>
        <h1>Urun bulunamadi</h1>
        <p>URL icinden gelen productId: {productId}</p>
        <Link to="/products">Urunlere geri don</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>URL icinden gelen productId: {productId}</p>
      <p>{product.description}</p>
      <Link to="/products">Urunlere geri don</Link>
    </main>
  );
};

export default ProductDetails;
