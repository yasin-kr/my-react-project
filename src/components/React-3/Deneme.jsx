import { Formik, Form, Field } from 'formik';

const FormDenem = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={{
          username: 'aaa',
          email: '123123',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="username" />
          <Field type="email" name="email" />
          <button type="submit">Gönder</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormDenem;

// import { useState } from 'react';

// const products = [
//   { name: 'Laptop', category: 'Elektronik' },
//   { name: 'Phone', category: 'Elektronik' },
//   { name: 'Tablet', category: 'Elektronik' },
//   { name: 'Headphones', category: 'Aksesuar' },
//   { name: 'Keyboard', category: 'Aksesuar' },
// ];

// const FormDenem = () => {
//   const [searchItem, setSearchItem] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const handleChange = (e) => {
//     setSearchItem(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const listed = products.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(searchItem.toLowerCase());

//     const matchesCategory =
//       selectedCategory === 'all' || product.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div>
//       <input type="text" value={searchItem} onChange={handleChange} />
//       <select
//         name="cat"
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//       >
//         <option value="all">Tümü</option>
//         <option value="Elektronik">Elektronik</option>
//         <option value="Aksesuar">Aksesuar</option>
//       </select>
//       <ul>
//         {listed.map((e) => (
//           <li key={e}>{e.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FormDenem;
