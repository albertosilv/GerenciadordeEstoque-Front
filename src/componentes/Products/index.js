import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../server';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  root:{
    diplay:'none'
  }
}));
function CategoriesProducts({ category }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  //const [Columns, setColumns] = useState([]);
  const [image, setImage] = useState('');


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
      console.log(image);
      const data = new FormData();
      data.append('name', product.name);
      data.append('value', product.value);
      data.append('quantity', product.quantity);
      data.append('image', image);

      api.post(`categorias/${category._id}/produtos`, data)
        .then((response) => {
          setProducts([...products, product]);
          resolve();
        })
        .catch((error) => {
          alert('Não foi possível adicionar o produto!');
          console.log(error);
          reject();
        });
    })
  }

  function editProduct(newProduct, oldProduct) {
    return new Promise((resolve, reject) => {
      api.put(`produtos/${oldProduct._id}`, newProduct)
        .then((response) => {
          setProducts([...products.filter((product) => product._id !== oldProduct._id), newProduct]);
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
          },
          body: {
            addTooltip: 'Adicionar Produto',
            deleteTooltip: 'Deletar Produto',
            editTooltip: 'Editar Produto',
            editRow: {
              deleteText:' Tem certeza que deseja deletar o produto?',
              cancelTooltip:'Cancelar',
              saveTooltip:'Deletar',

            }
            
          }
        }}
        columns={[{ title: 'Nome', field: 'name' },
        {
          title: 'Valor', field: 'value', type: 'currency', currencySetting: { currencyCode: 'BRL' }
        },
        { title: 'Quantidade', field: 'quantity', type: 'numeric', defaultSort: 'desc', },
        {
          title: 'Imagem do Produto',
          field: 'image',
          render: rowData => {
            if (rowData.image) {
              return <img src={rowData.image} alt={rowData.name} style={{ width: 80 }} />
            }
          },
          editComponent: props => (
            <div>
              <input className={classes.input}
                id="contained-button-file"
                type="file" name="image" accept="image/png, image/jpeg, image/jpg"
                onChange={e => setImage(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <label>{props.value}</label>
            </div>
          ),
          type: 'date'
        }]}
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