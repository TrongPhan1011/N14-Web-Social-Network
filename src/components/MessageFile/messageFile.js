import classNames from 'classnames';
const cx = classNames;
function MessageFile({ messageData }) {
    var renderOneFile = (firstFile) => {
        if (firstFile.fileType === 'image') {
            return (
                <div className={cx('rounded-2xl overflow-hidden max-h-80 min-w-[100px] hover:cursor-pointer ')}>
                    <img src={firstFile?.path} alt="file img" className={cx('w-full')} />
                </div>
            );
        } else if (firstFile.fileType === 'video') {
            return (
                <div className={cx('rounded-2xl overflow-hidden max-h-80 min-w-[100px] hover:cursor-pointer ')}>
                    <video src={firstFile?.path} alt="file img" className={cx('w-full')} controls={true} />
                </div>
            );
        }
    };

    var renderManyFile = (files) => {
        const compManyIMG = files.map((file, index) => {
            if (file.fileType === 'image') {
                return (
                    <div key={file.title + index} className={cx(' w-32 h-32 hover:cursor-pointer p-[0.5px]')}>
                        <img src={file?.path} alt={file.title} className={cx('w-full h-full')} />
                    </div>
                );
            } else if (file.fileType === 'video') {
                return (
                    <div key={file.title + index} className={cx(' w-32 h-32 hover:cursor-pointer p-[0.5px]')}>
                        <video src={file?.path} alt="file img" className={cx('w-full h-full')} controls={true} />
                    </div>
                );
            }
        });

        return <div className={cx('rounded-2xl   flex flex-wrap overflow-hidden')}>{compManyIMG}</div>;
    };

    var handleRenderFile = () => {
        const files = messageData.file;
        const ONE_FILE = 1; // 1 file img, video
        if (files.length === ONE_FILE) {
            var firstFile = files[0];
            return <>{renderOneFile(firstFile)}</>;
        } else return <>{renderManyFile(files)}</>;
    };

    return <>{handleRenderFile()}</>;
}

export default MessageFile;
