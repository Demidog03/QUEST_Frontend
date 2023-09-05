import {FC, useEffect} from 'react'
import cl from './Kanban.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {TasksSelector, updateTaskColumn} from '../../store/features/task/taskSlice.ts'
import {KanbanColumn} from 'components/kanban/KanbanColumn.tsx'
import {closestCenter, DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core'
import {getProjectColumns, projectColumnsSelector} from '../../store/features/project/projectSlice.ts'
import {useParams} from 'react-router-dom'


const Kanban: FC = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const tasks = useSelector(TasksSelector)
  const columns = useSelector(projectColumnsSelector)
  const {setNodeRef} = useDroppable({
    id: 'kanban',
    data: {
      columns,
      tasks
    }
  })

  useEffect(() => {
    dispatch(getProjectColumns(params.id as string))
  }, [])

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  // function createNewColumn() {
  //   const newColumn: IKanbanColumn = {
  //     id: generateId(),
  //     title: `Column ${(1 + columns.length)}`,
  //     headerColor: 'rgba(184, 183, 190, 1)',
  //   }
  //
  //   setColumns([...columns, newColumn])
  // }

  // useEffect(() => {
  //   console.log(tasks)
  //   if(tasks && tasks.length !== 0){
  //     tasks.forEach(task => {
  //       if (task.status==="WAITING"){
  //         createTask(1, task)
  //       }
  //       else if (task.status==="IN_WORK"){
  //         createTask(2, task)
  //       }
  //       else if (task.status==="DONE"){
  //         createTask(3, task)
  //       }
  //     })
  //   }
  // }, [tasks])
  //

  // function generateId(){
  //   return new Date().valueOf();
  // }

  // function onDragEnd(event: DragEndEvent){
  //   const {active, over} = event
  //   if (!over) {
  //     return
  //   }
  //
  //   const activeColumnId = active.id
  //   const overColumnId = over.id
  //   if (activeColumnId === overColumnId) {
  //     return
  //   }
  //
  //   // setColumns(columns => {
  //   //   const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId)
  //   //   const overColumnIndex = columns.findIndex(col => col.id === overColumnId)
  //   //
  //   //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
  //   // })
  // }

  // function createTask(columnId: number | string, task: ITask){
  //   const newTask: IKanbanTask = {
  //     columnId,
  //     ...task
  //   }
  //
  //   setKanbanTasks(prevTasks => [...prevTasks, newTask])
  // }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event
    console.log(active)
    console.log(over)

    dispatch(updateTaskColumn({ taskId: active.id as number, columnId: over?.data.current?.columnId }))
  }

  return (
      <div className={cl.kanban} ref={setNodeRef}>
        <div className={cl.header}>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
            {columns.map(column => (
              <KanbanColumn
                  key={column.id}
                  id={column.id}
                  headerColor={column.color_code}
                  headerText={column.name}
                  tasks={tasks?.filter(task => task.column === column.id)}
              />))
            }
          </DndContext>
          {/*  <KanbanRow headerColor="rgba(184, 183, 190, 1)" headerText="Open">*/}
          {/*    <div className={cl.tasks}>*/}
          {/*      {tasks?.map(task =>*/}
          {/*        task.status === 'WAITING'*/}
          {/*          &&*/}
          {/*          <div>*/}
          {/*              <KanbanCard id={task.id} status={task.status} tags={task.task_tags} name={task.name} users={task.assigned_users}/>*/}
          {/*          </div>*/}
          {/*      )}*/}
          {/*    </div>*/}
          {/*  </KanbanRow>*/}

          {/*<KanbanRow headerColor="rgba(85, 119, 255, 1)" headerText="In Progress">*/}
          {/*  <div className={cl.tasks}>*/}
          {/*    {tasks?.map(task =>*/}
          {/*        task.status === 'In Progress'*/}
          {/*        &&*/}
          {/*        <div>*/}
          {/*            <KanbanCard id={task.id} status={task.status} tags={task.task_tags} name={task.name} users={task.assigned_users}/>*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</KanbanRow>*/}

          {/*<KanbanRow headerColor="rgba(0, 184, 132, 1)" headerText="Done">*/}
          {/*  <div className={cl.tasks}>*/}
          {/*    {tasks?.map(task =>*/}
          {/*        task.status === 'DONE'*/}
          {/*        &&*/}
          {/*        <div>*/}
          {/*            <KanbanCard id={task.id} status={task.status} tags={task.task_tags} name={task.name} users={task.assigned_users}/>*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</KanbanRow>*/}

          </div>
      </div>
  )
}

export default Kanban
