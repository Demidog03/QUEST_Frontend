import {FC, useEffect, useState} from 'react'
import cl from './ProjectCard.module.scss'
import {FiMoreHorizontal} from 'react-icons/fi'
import Tag from 'components/UI/tag/Tag.tsx'
import {IProject} from '../../models/IProject.ts'
import Popup from 'components/UI/popup/Popup.tsx'
import Modal from 'components/UI/modal/Modal.tsx'
import {ImPriceTags} from 'react-icons/im'
import {BsFillDiagram3Fill} from 'react-icons/bs'
import {VscOrganization} from 'react-icons/vsc'
import {TbProgressAlert} from 'react-icons/tb'
import Button from 'components/UI/button/Button.tsx'
import {FaTasks} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import {ITag2} from '../../models/ITag.ts'
import {getTags} from '../../api/tag.ts'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import {useDispatch} from 'react-redux'
import {addTagToProject} from '../../store/features/project/projectSlice.ts'

interface ProjectCardProps {
  project: IProject,
  index: number
}

const ProjectCard: FC<ProjectCardProps> = ({project}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isMoreOpened, setIsMoreOpened] = useState<boolean>(false)
  const [isAddTagModalOpened, setIsAddTagModalOpened] = useState<boolean>(false)
  const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);
  const [tags, setTags] = useState<ITag2[]>([])

  useEffect(() => {
    void(async () => {
      const response = await getTags()
      setTags(response.data.results)
    })()
  }, [])

  const handleChange = (event: SelectChangeEvent<typeof selectedTagsId>) => {
    const { target: { value } } = event;
    setSelectedTagsId(typeof value === 'string' ? [Number(value)] : [...value])
  };
  const getSelectedTagNames = () => {
    return tags.filter(tag => selectedTagsId.includes(tag.id)).map(tag => tag.name);
  };

  // const cardVariants: Variants = {
  //   hidden: {
  //     opacity: 0,
  //     y: "-100",
  //     filter: 'blur(10px)',
  //   },
  //   visible: (index) => ({
  //     opacity: 1,
  //     y: 0,
  //     filter: 'blur(0px)',
  //     transition: {
  //       duration: 0.3,
  //       delay: index * 0.1, // Adjust the delay time as needed
  //     },
  //   }),
  // };
  function handleClickTasks(){
    navigate('/tasks/' + project.id)
  }
  function addTags(){
    for (const id of selectedTagsId) {
      dispatch(addTagToProject({projectId: project.id, tagId: id}))
    }
  }
  return (
      <div className={cl.projectCard}>
        <img src={`${import.meta.env.VITE_BACKEND_URL ?? ''}` + project?.mini_header} className={cl.cardImage} alt=""/>
        <div className={cl.content}>
          <div className={cl.info}>
            <div className={cl.infoLeft}>
              <img src={`${import.meta.env.VITE_BACKEND_URL ?? ''}` + project?.logo} className={cl.projectImage} alt={project?.name}/>
              <h2 className={cl.projectName}>{project?.name}</h2>
            </div>
            <div style={{position: 'relative'}}>
              <FiMoreHorizontal style={{cursor: 'pointer', fontSize: '1.2rem'}} onClick={() => setIsMoreOpened(true)}/>
              <Popup key={project?.id} isOpened={isMoreOpened} setIsOpened={setIsMoreOpened}>
                <div className={cl.element} onClick={() => navigate(`/tasks/${project.id}`)}>Tasks</div>
                <div className={cl.element} onClick={() => setIsModalOpen(true)}>More information</div>
              </Popup>
            </div>
          </div>
          <div className={cl.tags}>
            {project?.project_tags?.map(tag =>
                <Tag key={tag.tag.id} name={tag.tag.name} color={tag.tag.color_code}/>
            )}
            <Button onClick={() => setIsAddTagModalOpened(true)} style={{padding: '4px 10px', fontSize: '0.75rem'}} textColor="rgba(108, 122, 137, 1)" bgColor="rgba(108, 122, 137, 0.3)">
              <AiOutlinePlus/>
              Add tag
            </Button>
          </div>
        </div>
        <Modal visible={isModalOpen} setVisible={setIsModalOpen} className={cl.modal}>
          <div className={cl.header}>
            <img src={`${import.meta.env.VITE_BACKEND_URL ?? ''}` + project?.header} alt={project?.header}/>
            <motion.div
                onClick={() => setIsModalOpen(false)}
                whileHover={{scale: 1.1}}
                transition={{type: 'spring', stiffness: 300}}
                style={{cursor: 'pointer', position: 'absolute', right: '10px', top: '10px', fontSize: '1.8rem'}}>
              <IoMdCloseCircle/>
            </motion.div>
            <div className={cl.headerInfo}>
              <div className={cl.heading}>
                <img src={`${import.meta.env.VITE_BACKEND_URL ?? ''}` + project?.logo} className={cl.projectImage} alt={project?.name}/>
                <h2 className={cl.projectName}>{project?.name}</h2>
              </div>
              <div className={cl.dates}>
                <div>
                  <h3>START DATE</h3>
                  <p>{project?.start_date}</p>
                </div>
                <div>
                  <h3>DEADLINE</h3>
                  <p>{project?.deadline}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cl.body}>
            <div className={cl.infoList}>
              <div className={cl.item}>
                <div className={cl.field}>
                  <BsFillDiagram3Fill className={cl.icon}/>
                  <h2>Department</h2>
                </div>
                <div className={cl.value}>
                  <p>{project?.department?.name}</p>
                </div>
              </div>

              <div className={cl.item}>
                <div className={cl.field}>
                  <VscOrganization className={cl.icon}/>
                  <h2>Company</h2>
                </div>
                <div className={cl.value}>
                  <p>{project?.department?.company?.name}</p>
                </div>
              </div>

              <div className={cl.item}>
                <div className={cl.field}>
                  <ImPriceTags className={cl.icon}/>
                  <h2>Tags</h2>
                </div>
                <div className={cl.value}>
                  {project?.project_tags?.map(tag =>
                      <Tag key={tag.tag.id} name={tag.tag.name} color={tag.tag.color_code}/>
                  )}
                </div>
              </div>

              <div className={cl.item}>
                <div className={cl.field}>
                  <TbProgressAlert className={cl.icon}/>
                  <h2>Status</h2>
                </div>
                <div className={cl.value}>
                  <p style={{color: project?.status==="WAITING" ? '#FD71AF' : "#00B884"}}>{project?.status}</p>
                </div>
              </div>
            </div>

            <div className={cl.description}>
              <div>
                <h2>Description</h2>
                <p>{project?.description}</p>
              </div>
              <Button onClick={handleClickTasks} bgColor="rgba(123, 104, 238, 0.3)" textColor="rgba(123, 104, 238, 1)">Tasks <FaTasks/></Button>
            </div>
          </div>
        </Modal>
        <Modal visible={isAddTagModalOpened} setVisible={setIsAddTagModalOpened}>
          <FormControl sx={{ m: 1, width: 300, position: 'relative' }}>
            <InputLabel id="tags-checkbox-label">Tag</InputLabel>
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
          <Button bgColor="rgba(123, 104, 238, 0.3" textColor="rgba(123, 104, 238, 1" onClick={addTags}>Submit</Button>
        </Modal>
      </div>
  )
}

export default ProjectCard
