import {FC} from 'react'
import classes from './note.module.scss'
import paperIcon from '../../../assets/navicons/paper.svg';
import threedots from '../../../assets/navicons/threedots.svg';


interface NoteProps {
  title: string
  text: string
  isFavourite: boolean
  className: string
}

const Note: FC<NoteProps> = ({ title, text, isFavourite, className }) => {
  console.log(isFavourite)
  return (
    <div className={classes.note + " " + className}>
      <div className={classes.flexcont}>
        <div style={{ display: 'flex' }}>
          <img src={paperIcon} className={classes.docicon} />
          <div className={classes.date}>{title}</div>
        </div>
        <img src={threedots} className={classes.threedots} />
      </div>
      <div className={classes.text}>{text}</div>
    </div>
  );
};

export default Note;

