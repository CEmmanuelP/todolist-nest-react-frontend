import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import axios from 'axios';
import { MutatorCallback } from 'swr/dist/types';
import { Itodo } from './Todolist';

export interface AddTodoProps {
  mutate: (
    data?: Itodo[] | Promise<Itodo[]> | MutatorCallback<Itodo[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<Itodo[] | undefined>;
}

const AddTodo: FC<AddTodoProps> = ({ mutate }) => {
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
      if (response.statusText === 'Created') {
        setAddTitle('');
        setAddDesc('');
        mutate();
      }
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
