import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '~/components/Modal';

import Header from './Header';
import socket from '~/utils/getSocketIO';
import { currDataCaller, acceptCall } from '~/redux/Slice/callSlice';
import Button from '~/components/Button';
import config from '~/configRoutes';
import { MdCallEnd } from 'react-icons/md';
import SimplePeer from 'simple-peer';

const cx = classNames;
function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var callRedux = useSelector((state) => state.callSlice.caller);

    const [showModal, setShowModal] = useState(false);

    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.emit('userConnect', { idJoin: userLoginData.id });
        setMe(userLoginData.id);
        socket.on('callUser', (data) => {
            if (userLoginData.id === data.to) {
                setShowModal(true);

                setReceivingCall(true);
                setCaller(data.from);
                setName(data.name);
                setCallerSignal(data.signal);
            }
        });
    }, []);

    useEffect(() => {
        if (!!showModal) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setStream(stream);
            });
        }
    }, [showModal]);

    useEffect(() => {
        if (!!stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        const callUser = (id) => {
            const peer = new SimplePeer({
                initiator: true,
                trickle: false,
                stream: stream,
            });
            peer.on('signal', (data) => {
                socket.emit('callUser', {
                    userToCall: id,
                    signalData: data,
                    from: me,
                    name: name,
                });
            });
            peer.on('stream', (stream) => {
                userVideo.current.srcObject = stream;
            });
            socket.on('callAccepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;
        };

        if (!!callRedux && callRedux?.calling) {
            setShowModal(true);
            callUser(callRedux.idTo);
        }
    }, [callRedux]);

    useEffect(() => {
        if (callAccepted && !!stream && callerSignal) {
            const peer = new SimplePeer({
                initiator: false,
                trickle: false,
                stream: stream,
            });
            console.log(peer);
            console.log(stream);
            peer.on('signal', (data) => {
                console.log(123);
                socket.emit('answerCall', { signal: data, to: caller });
            });

            peer.on('stream', (stream) => {
                userVideo.current.srcObject = stream;
            });
            console.log(userVideo.current.srcObject);
            console.log(callEnded);
            console.log(userVideo.current);
            peer.signal(callerSignal);
            connectionRef.current = peer;
        }
    }, [callAccepted, stream, callerSignal]);
    const answerCall = () => {
        setCallAccepted(true);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };

    const renderModalAccept = () => {
        return (
            <>
                {showModal && (
                    <div className={cx('h-screen w-full  absolute bg-black overflow-hidden  ')}>
                        <div className={cx('h-full w-full rounded-md')}>
                            {callAccepted && !callEnded ? (
                                <video ref={userVideo} playsInline muted autoPlay className="h-full w-full " />
                            ) : (
                                <></>
                            )}
                            {receivingCall && !callAccepted ? (
                                <Button className="text-white bg-lcn-blue-4" onClick={answerCall}>
                                    Accept
                                </Button>
                            ) : (
                                <></>
                            )}
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
                            {stream && <video ref={myVideo} playsInline muted autoPlay className="h-full w-full " />}
                        </div>
                    </div>
                )}
            </>
        );
    };

    const navigateRoute = () => {
        if (userLoginData === null) {
            return <Navigate replace to="/dangnhap" />;
        } else
            return (
                <div className="w-full h-screen overflow-scroll flex ">
                    <div className="w-20 h-screen  flex justify-center ">
                        <Header type="SideBarChat" userLoginData={userLoginData} />
                    </div>
                    <div className="w-full h-screen overflow-hidden">{children}</div>
                    {renderModalAccept()}
                </div>
            );
    };

    return <>{navigateRoute()}</>;
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
