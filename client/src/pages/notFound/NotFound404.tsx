import cl from "./NotFound404.module.scss"
import {Link} from "react-router-dom";

function NotFound404() {
    return (
        <div className={cl.notFound}>
            <h1>Ошибка 404. Страница не найдена</h1>
            <Link to={"/projects"}><button className={cl.goMainBtn}>На главную</button></Link>
        </div>
    );
}

export default NotFound404;
