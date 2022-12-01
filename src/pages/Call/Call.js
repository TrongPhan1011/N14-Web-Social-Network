import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MdCallEnd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Peer from 'simple-peer';
import Button from '~/components/Button';
import socket from '~/utils/getSocketIO';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

const cx = classNames;

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}
function Call() {
    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    let query = useQuery();
    var idTo = query.get('idTo');
    var acceptStatus = query.get('acceptCall');

    var callSlice = useSelector((state) => state.persistedReducer.call);
    var dataCaller = callSlice.currDataCaller;

    const [me, setMe] = useState('');
    const [streamObject, setStreamObject] = useState();

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
        // const setStreamObject = async () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStreamObject(stream);
        });
        // };
        // setStreamObject();
    }, []);

    useEffect(() => {
        if (!!dataCaller) {
            setReceivingCall(true);
            setCaller(dataCaller.from);
            setName(dataCaller.name);
            setCallerSignal(dataCaller.signal);
        }
    }, [dataCaller, streamObject]);

    useEffect(() => {
        if (!!streamObject) {
            myVideo.current.srcObject = streamObject;
        }
    }, [streamObject]);

    useEffect(() => {
        if (!!idTo && !!streamObject) {
            callUser(idTo);
        }
    }, [idTo, streamObject]);

    useEffect(() => {
        if (!!acceptStatus && !!streamObject) {
            setCallAccepted(true);
        }
    }, [acceptStatus, streamObject, callAccepted]);

    useEffect(() => {
        if (!!acceptStatus && callAccepted) {
            answerCall();
        }
    }, [acceptStatus, callAccepted]);

    var callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: streamObject,
        });
        peer.on('signal', (data) => {
            socket.emit('callUser', {
                idUserReceive: id,
                signalData: data,
                from: curUser.id,
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

    var answerCall = () => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: streamObject,
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, idUserCall: caller });
        });
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    return (
        <>
            {/* {receivingCall && !callAccepted ? (
                <div className="caller">
                    <h1>{name} is calling...</h1>
                    <Button className={cx('bg-green-100 text-green-500')} onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            ) : ( */}
            <div className={cx('h-screen w-full relative bg-black overflow-hidden  ')}>
                <div className={cx('h-full w-full rounded-md')}>
                    {callAccepted && !callEnded ? (
                        <video ref={userVideo} playsInline muted autoPlay className="h-full w-full " />
                    ) : (
                        <video playsInline muted autoPlay className="h-full w-full " />
                    )}
                </div>
                <div className={cx('h-16 w-full absolute bottom-1 flex justify-center')}>
                    <div
                        className={cx(
                            'h-full w-1/3 rounded-full bg-lcn-blue-1 bg-opacity-20 backdrop-blur-lg  flex justify-around items-center',
                        )}
                    >
                        <Button className={cx('bg-red-500 rounded-full h-12 w-12 justify-center')}>
                            <MdCallEnd className={cx('text-3xl text-white')} />
                        </Button>
                    </div>
                </div>
                <div className={cx('h-28 w-36 absolute bottom-1 rounded-md mr-2 right-2 ')}>
                    {streamObject && <video ref={myVideo} playsInline muted autoPlay className="h-full w-full " />}
                </div>
            </div>
            {/* )} */}
        </>
    );
}

export default Call;
