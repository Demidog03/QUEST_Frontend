import classes from './notes.module.scss';
import notesIcon from '../../assets/navicons/notes.svg';
import plusIcon from '../../assets/navicons/plus.svg';
import Note from '../UI//note/Note';
import {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addNote, notesSelector} from '../../store/features/notes/notesSlice.ts'
import Modal from 'components/UI/modal/Modal.tsx'
import {Stack, TextField} from '@mui/material'
import {useForm} from 'react-hook-form'
import Button from 'components/UI/button/Button.tsx'

const Notes: FC = () => {
    const dispatch = useDispatch()
    const notes = useSelector(notesSelector)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {register, handleSubmit} = useForm()
    useEffect(() => {
        console.log(notes)
    }, [notes])
    function submitForm(data: any){
        const requestData = {...data, is_favorite: false}
        dispatch(addNote(requestData))
        setIsOpen(false)
    }
    return (
        <div className={classes.container}>
            <div className={classes['notes-container']}>
                <div className={classes.bar}>
                    <div className={classes['notes-first-line']}>
                        <div className={classes['notes-first-child']}>
                            <img src={notesIcon} />
                            <span>Notes</span>
                        </div>
                        <img src={plusIcon} onClick={() => setIsOpen(true)} />
                    </div>

                    <div className={classes.scrollable}>
                        <div className={classes.notes}>
                            {notes.map((note, index) => (
                                <Note
                                    key={index}
                                    title={note.title}
                                    text={note.text}
                                    isFavourite={note.is_favorite}
                                    className={classes['note-item']}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Modal visible={isOpen} setVisible={setIsOpen}>
                    <Stack direction="column" gap={2} sx={{ minWidth: '350px' }}>
                        <h2>Create a project</h2>
                        <TextField label="Title"
                                   {...register('title')}
                                   required={true}/>
                        <TextField label="Text" multiline rows={4}
                                   {...register('text')}
                                   required={true}/>
                        <Button bgColor="rgba(123, 104, 238, 0.3" textColor="rgba(123, 104, 238, 1" onClick={handleSubmit(submitForm)}>Submit</Button>
                    </Stack>
                </Modal>
            </div>

        </div>
    );
}

export default Notes;
