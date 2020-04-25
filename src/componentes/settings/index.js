import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../server';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import DeleteIcon from '@material-ui/icons/Delete';


function Settings({ category, attCategoryAdd,attCategoryDel,attCategoryMod }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
      api.get(`categorias/`)
        .then((response) => setCategorias(response.data))
    
  }, [category]);
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

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
        title={'CATEGORIAS'}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
        }}
        icons={{
          Add: () => { 
          return <Icon className="fa fa-plus-circle"  style={{ fontSize: 30, color:'#075E54' }} />
          },
          Delete: () =>{ 
            return <DeleteIcon  style={{ fontSize: 30, color:'red' }} />
            },
        }}
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