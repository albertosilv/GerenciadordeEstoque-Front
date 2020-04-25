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
  root: {
    diplay: 'none'
  }
}));
function Settings({ category, attCategoryAdd,attCategoryDel,attCategoryMod }) {
  const classes = useStyles();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
      api.get(`categorias/`)
        .then((response) => setCategorias(response.data))
    
  }, [category]);

  function addCategoria(categoria) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append('name', categoria.name);
      api.post(`categorias/`,data)
        .then((response) => {
          setCategorias([...categorias, categoria]);
          attCategoryAdd(categoria);
          resolve();
        })
        .catch((error) => {
          alert('Não foi possível adicionar o produto!');
          console.log(error);
          reject();
        });
    })
  }

  function editCategoria(newCategoria, oldCategoria) {
    return new Promise((resolve, reject) => {
      const newCate= new URLSearchParams(newCategoria);
      api.put(`categorias/${oldCategoria._id}`, newCate)
        .then((response) => {
          setCategorias([...categorias.filter((categoria) => categoria._id !== oldCategoria._id), newCategoria]);
          attCategoryMod(newCategoria,oldCategoria);
          resolve();
        })
        .catch((error) => {
          alert('Erro ao editar a categoria!')
          reject();
        });
    });
  }

  function deleteProduct(oldCategoria) {
    return new Promise((resolve, reject) => {
      api.delete(`/categorias/${oldCategoria._id}`)
        .then((response) => {
          setCategorias(categorias.filter((category) => category._id !== oldCategoria._id));
          attCategoryDel(oldCategoria);
          resolve();
        })
        .catch((error) => {
          alert(`Não foi possível deletar a categoria${oldCategoria.name}`);
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
              saveTooltip: 'Deletar',
            }
          }
        }}
        columns={[{ title: 'Nome', field: 'name' }]}
        data={categorias}
        title={'Categorias'}
        editable={{
          onRowAdd: newCategoria => addCategoria(newCategoria),
          onRowUpdate: (newCategoria, oldCategoria) => editCategoria(newCategoria, oldCategoria),
          onRowDelete: categoria => deleteProduct(categoria),
        }}
      />
    </div>
  )

}

export default Settings;