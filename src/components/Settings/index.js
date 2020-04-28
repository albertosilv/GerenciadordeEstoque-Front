import MaterialTable from 'material-table'
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import DeleteIcon from '@material-ui/icons/Delete';



function Settings({ category, attCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      api.get(`categorias/`)
        .then((response) => setCategories(response.data))

  }, [category]);
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  function addCategory(category) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append('name', category.name);
      api.post(`categorias/`,data)
        .then((response) => {
          setCategories([...categories, category]);
          attCategory();
          resolve();
        })
        .catch((error) => {
          console.log('Não foi possível adicionar o produto!');
          console.log(error);
          reject();
        });
    })
  }

  function editCategory(newCategory, oldCategory) {
    return new Promise((resolve, reject) => {
      const newCate= new URLSearchParams(newCategory);
      api.put(`categorias/${oldCategory._id}`, newCate)
        .then((response) => {
          setCategories([...categories.filter((categoria) => categoria._id !== oldCategory._id), newCategory]);
          attCategory();
          resolve();
        })
        .catch((error) => {
          console.log('Erro ao editar a categoria!');
          reject();
        });
    });
  }

  function deleteCategory(oldCategory) {
    return new Promise((resolve, reject) => {
      api.delete(`/categorias/${oldCategory._id}`)
        .then((response) => {
          setCategories(categories.filter((category) => category._id !== oldCategory._id));
          attCategory();
          resolve();
        })
        .catch((error) => {
          console.log(`Não foi possível deletar a categoria${oldCategory.name}`);
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
            addTooltip: 'Adicionar Categoria',
            deleteTooltip: 'Deletar Categoria',
            editTooltip: 'Editar Categoria',
            editRow: {
              deleteText: ' Tem certeza que deseja deletar a categoria?',
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Confirmar',
            }
          }
        }}
        columns={[{ title: 'Nome', field: 'name' }]}
        data={categories}
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
          onRowAdd: newCategoria => addCategory(newCategoria),
          onRowUpdate: (newCategoria, oldCategoria) => editCategory(newCategoria, oldCategoria),
          onRowDelete: categoria => deleteCategory(categoria),
        }}
      />
    </div>
  )

}

export default Settings;
