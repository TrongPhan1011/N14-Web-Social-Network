import classNames from 'classnames';
import { FiPaperclip } from 'react-icons/fi';
import FileSaver from 'file-saver';
import Button from '~/components/Button';
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
        } else if (firstFile.fileType === 'doc') {
            var fileName = firstFile.title;
            if (firstFile.title.length > 30) {
                fileName =
                    fileName.slice(0, 20) +
                    ' ... ' +
                    fileName.slice(firstFile.title.length - 10, firstFile.title.length);
            }
            return (
                <Button
                    className={cx(
                        'rounded-2xl text-sm m-0 text-slate-500 overflow-hidden h-16 min-w-[100px]  bg-slate-200 backdrop-blur-md flex items-center p-3',
                        'font-semibold',
                    )}
                    onClick={() => {
                        FileSaver.saveAs(firstFile.path, firstFile.title);
                    }}
                >
                    <FiPaperclip
                        className={cx(
                            'text-3xl border-lcn-blue-3 border text-lcn-blue-4 p-1 h-9 w-9 bg-lcn-blue-2 rounded-full mr-2 ',
                        )}
                    />
                    {fileName}
                </Button>
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
