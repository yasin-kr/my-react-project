import { Link } from 'react-router-dom';

const products = [
  { id: '1', name: 'Laptop', description: 'Kod yazmak icin guclu bilgisayar' },
  { id: '2', name: 'Telefon', description: 'Gunluk kullanim icin akilli telefon' },
  { id: '3', name: 'Kulaklik', description: 'Muzik ve toplantilar icin kulaklik' },
];

const Products = () => {
  return (
    <main>
      <h1>Products</h1>
      <p>
        Bu sayfada urun listesi var. Her link seni
        <code> /products/:productId </code>
        seklindeki dinamik rotaya goturur.
      </p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Products;
