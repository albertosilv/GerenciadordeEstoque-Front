import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import api from '../server';
import { makeStyles } from '@material-ui/styles';

function CreateProductForm() {

  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('value', value);
    data.append('quantity', quantity);
    data.append('image', image);

    //TO-DO: Link with category
    api.post('categorias/5e9d114248e63e35c19f0b95/produtos', data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        type="text"
        label="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        helperText="Insira o nome do produto"
      />
      <TextField
        required
        type="number"
        label="Preço"
        value={value}
        onChange={e => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              R$
              </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        required
        type="number"
        label="Quantidade"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <Input
        type="file"
        name="image"
        placeholder="Foto do produto"
        onChange={e => setImage(e.target.files[0])}
      />
      <Button variant="contained" color="primary" type="submit">
        Cadastrar Produto
        </Button>
    </form>
  )
}

export default CreateProductForm;
