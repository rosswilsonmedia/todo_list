import React, {useState} from 'react';

import styles from './ToDoList.module.css';

const ToDoList = () => {
    const [listItems, setListItems] = useState([]);
    //format for setListItems state
    //{
    //     content: 'string',
    //     checked: false
    // }

    const [input, setInput] = useState({
        input: '',
        error: null
    });

    function checkedHandler(e){
        let update=[...listItems];
        update[e.target.id].checked = !update[e.target.id].checked;
        setListItems(update);
    }

    function inputHandler(e){
        let error=null;
        if(e.target.value.length>0 && e.target.value.length<3){
            error="*item must be at least three characters";
        }
        setInput({
            input: e.target.value,
            error: error
        });
    }

    function deleteHandler(e){
        let update=[];
        console.log(e.target.value)
        for(let i=0; i<listItems.length; i++){
            if(i!=e.target.value){
                update.push(listItems[i]);
            }
        }
        setListItems(update);
    }

    function submitHandler(e){
        e.preventDefault()
        if(input.error==null){
            let update=listItems;
            console.log(update);
            update.push({
                content: input.input,
                checked: false
            })
            console.log(update)
            setListItems(update)
            setInput({
                input: '',
                error: null
            })
        }
    }

    return (
        <div class='ToDoList'>
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    onChange={inputHandler}
                    value={input.input}
                    name="newListItem"
                    id="newListItem"
                />
                <input
                    type='submit'
                    value='Add'
                />
                {
                    input.error ?
                    <p class='inputError'>{input.error}</p>:
                    ''
                }
            </form>
            {
                listItems.map((listItem, index) => {
                    console.log(listItem.checked)
                    return (
                        listItem.checked?
                        <div>
                            <input
                                type='checkbox'
                                onChange={checkedHandler}
                                id={index}
                                name={index}
                                value={listItem.content}
                                checked
                                aria-checked='true'
                            />
                            <label
                                className={`label ${styles.labelChecked}`}
                                htmlFor={index}
                            >
                                {listItem.content}
                            </label>
                            <button
                                className={styles.deleteBtn}
                                value={index}
                                onClick={deleteHandler}
                            >
                                X
                            </button>
                        </div>:
                        <div>
                            <input
                                type='checkbox'
                                onChange={checkedHandler}
                                id={index}
                                name={index}
                                value={listItem.content}
                                aria-checked='false'
                            />
                            <label
                                className='label'
                                htmlFor={index}
                            >
                                {listItem.content}
                            </label>
                            <button
                                className={styles.deleteBtn}
                                value={index}
                                onClick={deleteHandler}
                            >
                                X
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ToDoList;