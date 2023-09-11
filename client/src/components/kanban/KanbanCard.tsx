import {FC, useEffect, useState} from 'react'
import {ITag, ITag2} from '../../models/ITag.ts'
import Tag from 'components/UI/tag/Tag.tsx'
import {HiDocumentDuplicate} from 'react-icons/hi'
import cl from './Kanban.module.scss'
import {IPerson} from '../../models/IPerson.tsx'
import Button from 'components/UI/button/Button.tsx'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {BiTask} from 'react-icons/bi'
import Modal from 'components/UI/modal/Modal.tsx'
import {stopPropagation} from '@dnd-kit/core/dist/sensors/events'
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {MdModeEdit} from 'react-icons/md'
import {useDispatch, useSelector} from 'react-redux'
import {addTask, getTask, taskSelector, tasksPendingSelector, updateTask} from '../../store/features/task/taskSlice.ts'
import {MoonLoader} from 'react-spinners'
import {Controller, useForm} from 'react-hook-form'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select, SelectChangeEvent, Stack,
  TextField
} from '@mui/material'
import {DateField, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon'
import {getTags} from '../../api/tag.ts'
import {getUsers} from '../../api/users.ts'

interface KanbanCardProps {
  id: number
  tags: ITag[]
  name: string
  users: IPerson[]
  columnId: number
  priority: string
  description: string
}

const KanbanCard: FC<KanbanCardProps> = ({id, tags, name, description, users, priority, columnId, }) => {
  const dispatch = useDispatch()
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isOnHover, setIsOnHover] = useState<boolean>(false)
  const tasksPending = useSelector(tasksPendingSelector)
  const selectedTask = useSelector(taskSelector)
  const [allTags, setAllTags] = useState<ITag2[]>([])
  const [allUsers, setAllUsers] = useState<{ id: number, username: string }[]>([])
  const {register, handleSubmit, control} = useForm()
  const [selectedTagsId, setSelectedTagsId] = useState<number[]>([...tags.map(tag => tag.tag.id)]);
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([...users.map(user => user.id)]);
  const { attributes, listeners, transform, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      id,
      columnId,
    },
  });

  const buttonStyles = {
    fontSize: '0.875rem',
    padding: '3px 8px',
    gap: '5px',
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? '0.5' : '1',
    boxShadow: isOnHover ? '0 0 15px rgba(0, 184, 132, 0.2)' : 'none'
  }
  useEffect(() => {
    void(async () => {
      const response = await getTags()
      setAllTags(response.data.results)
      const response2 = await getUsers()
      // @ts-ignore
      setAllUsers(response2.data)
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
    return allTags.filter(tag => selectedTagsId.includes(tag.id)).map(tag => tag.name);
  };
  const getSelectedUserNames = () => {
    return users.filter(user => selectedUsersId.includes(user.id)).map(user => user.username);
  };

  function handleSelectTask(){
    setIsEditOpen(true)
    dispatch(getTask({taskId: id}))
  }

  useEffect(() => {
    console.log(isEditOpen)
  }, [isEditOpen])

  const spinnerStyles = {
    margin: '20px auto'
  }

  function submitForm(data: any){
    dispatch(updateTask({
      taskId: id,
      ...data,
      tags: [...selectedTagsId],
      users: [...selectedUsersId]
    }))
    setIsEditOpen(false)
  }

  if(tasksPending) {
    return <MoonLoader
        color={'#FD71AF'}
        loading={tasksPending}
        size={30}
        cssOverride={spinnerStyles}
        aria-label="Loading tasks"
        data-testid="tasks"
    />
  }

  return (
      <div className={cl.kanbanCard}
           {...attributes}
           style={style}
      >
        <div className={cl.cardTop}>
          <div className={cl.tags}>{tags?.length !== 0
              ?
              tags?.map(tag => <Tag name={tag.tag.name} color={tag.tag.color_code}/>)
              :
              <Button
                  textColor="rgba(157, 155, 161, 1)"
                  bgColor="rgba(233, 232, 236, 1)"
                  style={{...buttonStyles, pointerEvents: 'none'}}
                  disabled={true}
              >No tags</Button>
          }</div>
          <Button textColor="rgba(157, 155, 161, 1)"
                  bgColor="rgba(233, 232, 236, 1)"
                  style={buttonStyles}
                  onClick={handleSelectTask}
          ><MdModeEdit/> Edit</Button>
        </div>
        <div ref={setNodeRef}
             {...listeners}
             onMouseEnter={() => setIsOnHover(true)}
             onMouseLeave={() => setIsOnHover(false)}
             className={cl.cardDraggable}
             style={{
               cursor: isDragging ? 'grabbing' : 'grab',
             }}
        >
          <div className={cl.nameAndDescription}>
            <div className={cl.name}><BiTask/><h2>{name}</h2></div>
            <div className={cl.description}>
              <p>{description}</p>
              {columnId === 6 && <IoCheckmarkDoneCircleSharp style={{fontSize: '1.4rem', minWidth: '1rem', color: 'rgb(0, 197, 21)'}}/>}
            </div>

          </div>

          <div className={cl.cardBottom}>
            <div className={cl.users}>
              {users.length !== 0 ? users.map(user =>
                      <Button
                          textColor="rgba(157, 155, 161, 1)"
                          bgColor="rgba(233, 232, 236, 1)"
                          style={buttonStyles}>
                        @ {user.username}
                      </Button>)
                  :
                  <Button
                      textColor="rgba(157, 155, 161, 1)"
                      bgColor="rgba(233, 232, 236, 1)"
                      style={{...buttonStyles, pointerEvents: 'none'}}
                      disabled={true}
                  >No users</Button>
              }
            </div>
            <Tag
                color="157, 155, 161"
                name={priority}
                style={{...buttonStyles, alignSelf: 'flex-end'}}
            />
          </div>
        </div>

        <Modal visible={isEditOpen} setVisible={setIsEditOpen}>
          <Stack direction="column" gap={2} sx={{ minWidth: '350px' }}>
            <h2>Edit the task</h2>
            <TextField label="Name"
                       defaultValue={selectedTask?.name}
                       {...register('name')}
            />
            <TextField label="Description" multiline rows={4}
                       defaultValue={selectedTask?.description}
                       {...register('description')}
            />
            <TextField label="Priority" multiline rows={4}
                       defaultValue={selectedTask?.priority}
                       {...register('priority')}
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
                {allTags.map((tag) => (
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
                {allUsers.map((user) => (
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

export default KanbanCard
