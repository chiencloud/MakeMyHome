import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Navigate.module.scss';

const cx = classNames.bind(styles);

const Navigate = ({ parent, current }) => {
    return (
        <div className={cx('navigate')}>
            <Link to="/">Trang chủ</Link>

            {parent.map((pa, index) => {
                return (
                    <span key={index}>
                        <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
                        <Link to={pa.link}>{pa.name}</Link>
                    </span>
                );
            })}

            <span>&nbsp;&nbsp; / &nbsp;&nbsp;</span>
            <span className={cx('navigateThis')}>{current.name}</span>
        </div>
    );
};

export default Navigate;
