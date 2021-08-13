import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import axios from 'axios';

const AddTodo: FC = () => {
  const [addTitle, setAddTitle] = useState<string>('');
  const [addDesc, setAddDesc] = useState<string>('');

  const onChangeAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAddTitle(value);
  };

  const onChangeAddDesc = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAddDesc(value);
  };

  const onSubmitAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/todo`,
        {
          title: addTitle,
          desc: addDesc,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitAddTodo}>
      <input type="text" value={addTitle} onChange={onChangeAddTitle} />
      <input type="text" value={addDesc} onChange={onChangeAddDesc} />
      <input type="submit" value="Add" />
    </form>
  );
};

export default AddTodo;
