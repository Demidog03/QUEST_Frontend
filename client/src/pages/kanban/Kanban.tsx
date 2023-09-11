import {FC, useEffect} from 'react'
import cl from './Kanban.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getTasks, TasksSelector, updateTaskColumn} from '../../store/features/task/taskSlice.ts'
import {KanbanColumn} from 'components/kanban/KanbanColumn.tsx'
import {closestCenter, DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core'
import {getProjectColumns, projectColumnsSelector, projectsSelector} from '../../store/features/project/projectSlice.ts'
import {useParams} from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'


const Kanban: FC = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const tasks = useSelector(TasksSelector)
  const columns = useSelector(projectColumnsSelector)
  const projects = useSelector(projectsSelector)
  const {setNodeRef} = useDroppable({
    id: 'kanban',
    data: {
      columns,
      tasks
    }
  })

  useEffect(() => {
    dispatch(getProjectColumns(params.id as string))
    dispatch(getTasks(+params.id))
  }, [params.id])

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event
    console.log(active)
    console.log(over)

    dispatch(updateTaskColumn({ taskId: active.id as number, columnId: over?.data.current?.columnId }))
  }

  return (
      <div className={cl.kanban} ref={setNodeRef}>
        <Breadcrumbs title={projects.find(project => project.id === +params.id).name}/>
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
          </div>
      </div>
  )
}

export default Kanban
