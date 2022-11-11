import classNames from 'classnames';

const cx = classNames;
function Toggle({ on, checked }) {
    return (
        <label className="flex items-center cursor-pointer" onClick={on}>
            <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" defaultChecked={checked} />

                <div className={cx('block bg-gray-300 w-10 h-6 rounded-full', 'bg-toggle')}></div>

                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
        </label>
    );
}

export default Toggle;
