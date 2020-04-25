import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../server';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles, fade } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  root: {
    diplay: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '30%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    }
  },
  }));

function CategoriesProducts({ category }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (category !== null) {
      api.get(`categorias/${category._id}`)
        .then((response) => setProducts(response.data.products))
    }
  }, [category]);
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  function addProduct(product) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append('name', product.name);
      data.append('value', product.value);
      data.append('quantity', product.quantity);
      data.append('image', image);

      api
        .post(`categorias/${category._id}/produtos`, data)
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

  if (category === null) {
    return null;
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
              deleteText: ' Tem certeza que deseja deletar o produto?',
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Confirmar',
            },
            emptyDataSourceMessage:'Nenhum Produto cadastrado'
          },

        }}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
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
                type="file"
                name="image"
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
          type: 'data'
        }]}
        icons={{
          Add: () => { 
          return <Icon className="fa fa-plus-circle"  style={{ fontSize: 30, color:'#075E54' }} />
          },
          Delete: () =>{ 
            return <DeleteIcon  style={{ fontSize: 30, color:'red' }} />
            },
        }}
        data={products}
        title={category.name.toUpperCase()}
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