import React, { FC } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import AddTodo from './AddTodo';
import Todo from './Todo';

export interface Itodo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  desc: string;
  isComplete: boolean;
}

const Todolist: FC = () => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<Itodo[]>(
    `${process.env.REACT_APP_BACK_URL}/todo`,
    fetcher,
  );

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <AddTodo mutate={mutate} />
      {data.map((todo) => {
        return (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            desc={todo.desc}
            mutate={mutate}
          />
        );
      })}
    </div>
  );
};

export default Todolist;
