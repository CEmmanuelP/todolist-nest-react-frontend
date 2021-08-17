import axios from 'axios';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { TodoProps } from './Todo';

type UpdateTodoProps = TodoProps;

const UpdateTodo: FC<UpdateTodoProps> = ({ id, title, desc, mutate }) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(title);
  const [updateDesc, setUpdateDesc] = useState<string>(title);

  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateTitle(value);
  };

  const onChangeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateDesc(value);
  };

  const onSubmitUpdateTodo = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!updateTitle || !updateDesc) {
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/todo/${id}`,
        {
          title: updateTitle,
          desc: updateDesc,
        },
      );

      if (response.statusText === 'OK') {
        setUpdateToggle(false);
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {updateToggle ? (
        <form onSubmit={onSubmitUpdateTodo}>
          <label>Title : </label>
          <input type="text" value={updateTitle} onChange={onChangeTitle} />
          <br />
          <label>Desc : </label>
          <input type="text" value={updateDesc} onChange={onChangeDesc} />
          <br />
          <input type="submit" value="Confirm" />
        </form>
      ) : (
        <div>
          {id} - {title} - {desc}
        </div>
      )}
      <button onClick={onClickUpdateToggle}>
        {updateToggle ? 'Cancel' : 'Update'}
      </button>
    </>
  );
};

export default UpdateTodo;
