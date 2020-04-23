import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../server';

function CategoriesProducts({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (category !== null) {
      api.get(`categorias/${category._id}`)
        .then((response) => setProducts(response.data.products))
    }
  }, [category]);

  if (category === null) {
    return null;
  }

  function addProduct(product) {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('name', product.name);
      data.append('value', product.value);
      data.append('quantity', product.quantity);

      api.post(`categorias/${category._id}/produtos`, data)
        .then((response) => {
          setProducts([...products, product]);
          resolve();
        })
        .catch((error) => {
          alert('Não foi possível adicionar o produto!');
          reject();
        });
    })
  }

  function editProduct(product, oldProduct) {
    return new Promise((resolve, reject) => {
      api.put(`produtos/${oldProduct._id}`, product)
        .then((response) => {
          setProducts(products.filter((product) => product._id !== oldProduct._id));
          setProducts([...products, product]);
          resolve();
        })
        .catch((error) => {
          alert('Erro ao editar produto!')
          reject();
        });
    });
  }

  function deleteProduct(oldProduct) {
    return new Promise((resolve, reject) => {
      api.delete(`/produtos/${oldProduct._id}`)
        .then((response) => {
          setProducts(products.filter((product) => product._id !== oldProduct._id));
          resolve();
        })
        .catch((error) => {
          alert(`Não foi possível deletar o produto ${oldProduct.name}`);
          reject();
        });
    });
  }
  return (
    <div>
      <MaterialTable
        localization={{
          header: {
            actions: 'Ações'
          }
        }}
        columns={[
          { title: 'Nome', field: 'name' },
          {
            title: 'Valor', field: 'value', type: 'currency', currencySetting: { currencyCode: 'BRL' }
          },
          { title: 'Quantidade', field: 'quantity', type: 'numeric' },
        ]}
        data={products}
        title={category.name}
        editable={{
          onRowAdd: newProduct => addProduct(newProduct),
          onRowUpdate: (newProduct, oldProduct) => editProduct(newProduct, oldProduct),
          onRowDelete: product => deleteProduct(product),
        }}
      />
    </div>
  )

}

export default CategoriesProducts;