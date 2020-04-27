import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
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
  const tableRef = React.createRef()
  useEffect(() => {
    if (category !== null) {
      api.get(`categorias/${category._id}`)
        .then((response) => setProducts(response.data.products))
    }
  }, [category]);
  function getProdutc() {
    if (category !== null) {
      api.get(`categorias/${category._id}`)
        .then((response) => {
          setProducts(response.data.products);
          tableRef.current.onQueryChange({ field: "image" });
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);
  function addProduct(newProduct) {
    return new Promise((resolve, reject) => {
      const data = new FormData();

      const { name = 'Indefinido', value = 0, quantity = 0 } = newProduct;

      data.append('name', name);
      data.append('value', value);
      data.append('quantity', quantity);
      data.append('image', image);

      api
        .post(`categorias/${category._id}/produtos`, data)
        .then((response) => {
          getProdutc();
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
      const data = new FormData();
      data.append('name', newProduct.name);
      data.append('value', newProduct.value);
      data.append('quantity', newProduct.quantity);
      if (newProduct.image) {
        data.append('image', newProduct.image);
      }
      console.log(newProduct);

      api.put(`produtos/${oldProduct._id}`, newProduct)
        .then((response) => {
          const product = response.data;
          setProducts([...products.filter((product) => product._id !== oldProduct._id), product]);
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
          getProdutc()
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
            emptyDataSourceMessage: 'Nenhum Produto cadastrado',
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            firstAriaLabel: 'Primeira página',
            firstTooltip: 'Primeira página',
            labelRowsSelect: 'Linhas',
            previousAriaLabel: 'Página anterior',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            nextAriaLabel: 'Próxima página',
            lastAriaLabel: 'Última página',
            lastTooltip: 'Última página',
          }

        }}
        columns={[{
          title: 'Imagem do Produto',
          field: 'image',
          render: rowData => <img src={rowData.image} alt={rowData.name} style={{ width: 50, borderRadius: '50%' }} />,
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

        },
        { title: 'Nome', field: 'name' },
        {
          title: 'Valor', field: 'value', type: 'numeric', currencySetting: { currencyCode: 'BRL' }
        },
        { title: 'Quantidade', field: 'quantity', type: 'numeric', defaultSort: 'desc', },
        ]}
        icons={{
          Add: () => {
            return <Icon className="fa fa-plus-circle" style={{ fontSize: 30, color: '#075E54' }} />
          },
          Delete: () => {
            return <DeleteIcon style={{ fontSize: 30, color: '#8b0000' }} />
          },
        }}
        data={products}
        title={category.name.toUpperCase()}
        tableRef={tableRef}
        editable={{
          onRowAdd: newProduct => addProduct(newProduct),
          onRowUpdate: (newProduct, oldProduct) => editProduct(newProduct, oldProduct),
          onRowDelete: product => deleteProduct(product),
        }}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          rowStyle: rowData => ({
            backgroundColor: (rowData.quantity >= 10) ? '#fff' : (rowData.quantity > 0) ? '#e5cf27' : '#e02327',
          })
        }}
      />
    </div>
  )

}

export default CategoriesProducts;
