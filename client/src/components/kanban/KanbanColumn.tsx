import {type FC, useMemo, useState} from 'react'
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

interface KanbanRowProps {
  id: number | string
  headerText: string
  headerColor: string
  tasks: ITask[] | undefined
}

export const KanbanColumn: FC<KanbanRowProps> = ({id, headerColor, headerText, tasks}) => {
  const dispatch = useDispatch()
  const params = useParams()
  const tasksPending = useSelector(tasksPendingSelector)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const tasksId = useMemo(() => tasks?.map(task => task.id), [tasks])
  const {register, handleSubmit, control} = useForm()
  const {setNodeRef, isOver} = useDroppable({
    id,
    data: {
      columnId: id
    }
  })

  function submitForm(data: any){
    dispatch(addTask({...data, column: id, project: Number(params.id), deadline: data?.deadline?.toFormat('yyyy-MM-dd'), end_date: data?.endDate?.toFormat('yyyy-MM-dd')}))
    setIsOpen(false)
  }

  const spinnerStyles = {
    margin: '20px auto'
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
            {tasksPending
                ?
                <MoonLoader
                    color={'#FD71AF'}
                    loading={tasksPending}
                    size={30}
                    cssOverride={spinnerStyles}
                    aria-label="Loading tasks"
                    data-testid="tasks"
                />
                :
                <SortableContext items={tasksId as number[]} id={id as string} >
                  {tasks.length !== 0 ? tasks.map(task => <KanbanCard key={task.id} id={task.id} tags={task.task_tags} name={task.name} description={task.description} users={task.assigned_users} columnId={task.column} priority={task.priority}/>) : <p className={cl.noTasksText}>No tasks</p>}
                </SortableContext>
            }
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
            <Button bgColor="rgba(123, 104, 238, 0.3" textColor="rgba(123, 104, 238, 1" onClick={handleSubmit(submitForm)}>Submit</Button>
          </Stack>
        </Modal>
      </div>
  )
}
