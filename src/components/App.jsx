// src/components/App.jsx
import { Card } from './Product';

export default function App() {
  return (
    <>
      <h1>Modul 1 Ozeti</h1>
      <Card
        title="Props"
        text="Bir bilesene disaridan veri gondermek icin props kullanilir."
      />
      <Card title="props.children">
        <p>Acilis ve kapanis etiketi arasindaki icerik children olarak gelir.</p>
      </Card>
    </>
  );
}
