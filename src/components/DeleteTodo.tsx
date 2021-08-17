import axios from 'axios';
import React, { FC } from 'react';
import { AddTodoProps } from './AddTodo';

interface DeleteTodoProps extends AddTodoProps {
  id: number;
}

const DeleteTodo: FC<DeleteTodoProps> = ({ id, mutate }) => {
  const onClickDeleteTodo = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/todo/${id}`,
      );

      if (response.statusText === 'OK') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onClickDeleteTodo}>delete</button>;
};

export default DeleteTodo;
