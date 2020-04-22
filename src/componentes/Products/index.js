import React from 'react';
import MaterialTable from 'material-table'

function CategoriesProducts({ category }) {

  if (category === null) {
    return null;
  }

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'Nome', field: 'name' },
          { title: 'Valor', field: 'value' },
          { title: 'Quantidade', field: 'quantity', type: 'numeric' },
        ]}
        data={category.products}
        title={category.name}
        options={{
          search: true
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
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