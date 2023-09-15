import {type FC, useEffect, useMemo, useState} from 'react'
// @ts-ignore
import cl from './Kanban.module.scss'
import {BsPlus} from 'react-icons/bs'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import KanbanCard from 'components/kanban/KanbanCard.tsx'
import {ITask} from '../../models/ITask.ts'
import {useDroppable} from '@dnd-kit/core'
import {SortableContext} from '@dnd-kit/sortable'
import Modal from 'components/UI/modal/Modal.tsx'
import {
  Checkbox,
  FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {DateField, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon'
import Button from 'components/UI/button/Button.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {addTask, getTasks, tasksPendingSelector} from '../../store/features/task/taskSlice.ts'
import {MoonLoader} from 'react-spinners'
import {getTags} from '../../api/tag.ts'
import {ITag2} from '../../models/ITag.ts'
import {getUsers} from '../../api/users.ts'

interface KanbanRowProps {
  id: number | string
  headerText: string
  headerColor: string
  tasks: ITask[] | undefined
}

export const KanbanColumn: FC<KanbanRowProps> = ({id, headerColor, headerText, tasks}) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {register, handleSubmit, control} = useForm()
  const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);
  const [tags, setTags] = useState<ITag2[]>([])
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([]);
  const [users, setUsers] = useState<{ id: number, username: string }[]>([])

  const {setNodeRef, isOver} = useDroppable({
    id,
    data: {
      columnId: id
    }
  })
  useEffect(() => {
    void(async () => {
      const response = await getTags()
      setTags(response.data.results)
      const response2 = await getUsers()
      // @ts-ignore
      setUsers(response2.data)
    })()
  }, [])
  const handleChange = (event: SelectChangeEvent<typeof selectedTagsId>) => {
    const { target: { value } } = event;
    setSelectedTagsId(typeof value === 'string' ? [Number(value)] : [...value])
  };
  const handleChangeUsers = (event: SelectChangeEvent<typeof selectedUsersId>) => {
    const { target: { value } } = event;
    setSelectedUsersId(typeof value === 'string' ? [Number(value)] : [...value])
  };
  const getSelectedTagNames = () => {
    return tags.filter(tag => selectedTagsId.includes(tag.id)).map(tag => tag.name);
  };
  const getSelectedUserNames = () => {
    return users.filter(user => selectedUsersId.includes(user.id)).map(user => user.username);
  };
  function submitForm(data: any){
    dispatch(addTask({
      ...data,
      column: id,
      project: Number(params.id), deadline: data?.deadline?.toFormat('yyyy-MM-dd'),
      end_date: data?.endDate?.toFormat('yyyy-MM-dd'),
      tags: [...selectedTagsId],
      users: [...selectedUsersId]
    }))
    setIsOpen(false)
  }

  return (
      <div>
        <div className={cl.headerItem}>
          <div className={cl.headerStatus}>
            <div className={cl.statusSquare} style={{backgroundColor: headerColor}}/><span>{headerText}</span>
          </div>
          <div className={cl.headerIcons}>
            <div className={cl.plusIcon} onClick={() => setIsOpen(true)}><BsPlus style={{fontSize: '1rem', fontWeight: 700}}/></div>
            <BiDotsHorizontalRounded/>
          </div>
        </div>

          <div className={cl.tasks} ref={setNodeRef} style={{background: isOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent'}}>
            {tasks.length !== 0 ? tasks.map(task => <KanbanCard key={task.id} id={task.id} tags={task.task_tags} name={task.name} description={task.description} users={task.assigned_users} columnId={task.column} priority={task.priority}/>) : <p className={cl.noTasksText}>No tasks</p>}
          </div>

        <Modal setVisible={setIsOpen} visible={isOpen} >
          <Stack direction="column" gap={2} sx={{ minWidth: '350px' }}>
            <h2>Create a task</h2>
            <TextField label="Name"
                       {...register('name')}
                       required={true}/>
            <TextField label="Description" multiline rows={4}
                       {...register('description')}
                       required={true}/>
            <Controller
                name="deadline"
                control={control} // Assuming you have a control object from useForm
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DateField label="Deadline" {...field} />
                    </LocalizationProvider>
                )}
            />
            <Controller
                name="endDate"
                control={control} // Assuming you have a control object from useForm
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DateField label="End date" {...field} />
                    </LocalizationProvider>
                )}
            />
              <FormControl sx={{width: '100%', position: 'relative' }}>
                <InputLabel  id="tags-checkbox-label">Tag</InputLabel>
                <Select
                    fullWidth
                    labelId="tags-checkbox-label"
                    id="tags-checkbox"
                    multiple
                    value={selectedTagsId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    sx={{ position: 'relative' }}
                    renderValue={() => getSelectedTagNames().join(', ')}
                >
                  {tags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.id}>
                        <Checkbox checked={selectedTagsId.indexOf(tag.id) > -1} />
                        <ListItemText primary={tag.name} />
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{width: '100%', position: 'relative' }}>
                <InputLabel  id="users-checkbox-label">Assigned users</InputLabel>
                <Select
                    fullWidth
                    labelId="users-checkbox-label"
                    id="users-checkbox"
                    multiple
                    value={selectedUsersId}
                    onChange={handleChangeUsers}
                    input={<OutlinedInput label="Assigned users" />}
                    sx={{ position: 'relative' }}
                    renderValue={() => getSelectedUserNames().join(', ')}
                >
                  {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Checkbox checked={selectedUsersId.indexOf(user.id) > -1} />
                        <ListItemText primary={user.username} />
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            <Button bgColor="rgba(123, 104, 238, 0.3" textColor="rgba(123, 104, 238, 1" onClick={handleSubmit(submitForm)}>Submit</Button>
          </Stack>
        </Modal>
      </div>
  )
}
