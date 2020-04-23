import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../server';

function CategoriesProducts({ category, product}) {
  const [Product, setProduct] = useState(null);
  useEffect(() => {
    setProduct(product);
  },[Product]);
  if (category === null) {
    return null;
  }
  function addProduct(d){
    const data = new FormData();
    data.append('name', d.name);
    data.append('value', d.value);
    data.append('quantity', d.quantity);
    console.log(data);
    api.post('categorias/5e9d114248e63e35c19f0b95/produtos', data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
          { title: 'Valor', field: 'value',type: 'numeric' },
          { title: 'Quantidade', field: 'quantity', type: 'numeric' },
        ]}
        data={Product}
        title={category.name}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = Product;
                  data.push(newData);
                  addProduct(newData);
                  setProduct({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    </div>
  )

}

export default CategoriesProducts;