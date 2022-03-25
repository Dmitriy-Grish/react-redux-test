import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  moveUp,
  moveDown,
  changeValue,
  selectListItem,
  changeName,
  selectList,
  addObj,
  selectedItem,
  deSelect,
  cleanList
} from './listSlice';
import styles from './List.module.css';

function isSelected(element, index, array) {
  if (element.selected) return element
}

export function List() {
  const list = useSelector(selectList);
  const selected = useSelector(selectedItem);
  const dispatch = useDispatch();

  let index = list.findIndex(isSelected)

  const [value, setValue] = useState('');
  const [barName, setBarName] = useState('');

  useEffect(() => {
    if (selected?.count) setValue(selected.count)
    if (selected?.name) setBarName(selected.name)
  }, [selected])
  
  return (
    <div>
      <div className={styles.data}>
        <button
          disabled={index === 0 || !selected}
          className={styles.button}
          onClick={() => dispatch(moveUp())}
        >
          Move Up
        </button>
        <ul
          className={styles.list}
          onClick={(e) => {
            e.target === e.currentTarget && dispatch(deSelect())
            setBarName('')
            setValue('')
          }}
        >
          {list.map((item,i) => {
            return <li
              onClick={() => dispatch(selectListItem(item.id))}
              className={item.selected ? styles.selectedListItem : styles.listItem}
              key={item.id}
            >
              <p className={styles.text}>Type: {item.type}</p>
              <p className={styles.text}>Count: {item.count}</p>
              <p className={styles.text}>{item.type === 'bar' ? `Name: ${item.name}` : "" }</p>
            </li>
          })
          }
        </ul>
        <button
          disabled={index === list.length - 1 || !selected}
          className={styles.button}
          onClick={() => dispatch(moveDown())}
        >
          Move Down
        </button>
      </div>


      <div className={styles.control}>
        <div className={styles.row}>
        <input
          disabled={!selected?.selected}
          className={styles.textbox}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          disabled={!selected?.selected}
          className={styles.button}
          onClick={() => dispatch(changeValue(value))}
        >
          Change count
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(addObj())}
        >
          Add Object
        </button>
        <button
          type='button'
          disabled={selected?.type !== "bar"}
          className={styles.button}
          onClick={() => dispatch(changeName(barName))}
        >
          Change name
        </button>
        <input
          disabled={selected?.type !== "bar"}
          className={styles.textbox}
          value={barName}
          onChange={(e) => setBarName(e.target.value)}
        />
      </div>
      <button
          type='button'
          disabled={list.length === 0}
          className={styles.button}
          onClick={() => {
            dispatch(cleanList())
            setBarName('')
            setValue('')
          }}
        >
          Clean list
        </button>
      </div>
    </div>
  )
}
