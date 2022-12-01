import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useEffect, useRef } from 'react';

import Modal from '~/components/Modal';

import { useDispatch, useSelector } from 'react-redux';

import { MdCallEnd } from 'react-icons/md';

import socket from '~/utils/getSocketIO';
import Peer from 'peerjs';

const cx = classNames;
function Call({ accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();
    var callRedux = useSelector((state) => state.callSlice.caller);

    const [showModal, setShowModal] = useState(false);
    const [peerId, setPeerId] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();
        var peerID = '';
        peer.on('open', (id) => {
            peerID = id;
        });
        socket.on('getCallSignal', (data) => {
            if (!!data && !!peerID) {
                socket.emit('sendIdCall', { receiverId: data.idUser, peerId: peerID });
            }
        });

        peer.on('call', (call) => {
            handleShowModal();
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream);
                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream;
                });
            });
        });

        peerInstance.current = peer;
    }, []);
    useEffect(() => {
        if (!!callRedux) {
            handleShowModal();
            call(callRedux.idTo);
        }
    }, [callRedux]);

    var handleShowModal = () => {
        setShowModal(true);
    };
    var handleHideModal = () => {
        setShowModal(false);
    };
    var call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerId, mediaStream);

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            });
        });
    };

    const renderModalAccept = () => {
        return (
            <>
                {showModal && (
                    <div className={cx('h-screen w-full  absolute bg-black overflow-hidden  ')}>
                        <div className={cx('h-full w-full rounded-md')}>
                            <video ref={remoteVideoRef} playsInline muted autoPlay className="h-full w-full " />

                            <Button className="text-white bg-lcn-blue-4">Accept</Button>
                        </div>
                        <div className={cx('h-16 w-full absolute bottom-1 flex justify-center')}>
                            <div
                                className={cx(
                                    'h-full w-1/3 rounded-full bg-lcn-blue-1 bg-opacity-20 backdrop-blur-lg  flex justify-around items-center',
                                )}
                            >
                                <Button
                                    className={cx('bg-red-500 rounded-full h-12 w-12 justify-center')}
                                    onClick={handleHideModal}
                                >
                                    <MdCallEnd className={cx('text-3xl text-white')} />
                                </Button>
                            </div>
                        </div>
                        <div className={cx('h-28 w-36 absolute bottom-1 rounded-md mr-2 right-2 ')}>
                            <video ref={currentUserVideoRef} playsInline muted autoPlay className="h-full w-full " />
                        </div>
                    </div>
                )}
            </>
        );
    };

    return <>{renderModalAccept()}</>;
}

export default memo(Call);
