import {FC, useState} from 'react'
import {ITag} from '../../models/ITag.ts'
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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOnHover, setIsOnHover] = useState<boolean>(false)
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
                  style={buttonStyles}><MdModeEdit/> Edit</Button>
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
                style={buttonStyles}
            />
          </div>
        </div>

        {/*<Modal visible={isOpen} setVisible={setIsOpen}>*/}
        {/*  <h1>Title: {name}</h1>*/}
        {/*</Modal>*/}
      </div>
  )
}

export default KanbanCard
