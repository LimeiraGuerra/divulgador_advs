import { Modal, Row, Column, ProfileImage, Info, SubTitle4, ChartContainer, RateBtn } from "./style";
import ProcessList from '../ProcessList'
import PieChart from '../Chart';
import Like from '../../common/Icons/Like';
import Dislike from '../../common/Icons/Dislike';
import React, { useEffect, useState } from 'react';
import db from '../../../firebase';

const AdvModal = ({ id, onClose, isOpen, profile, ip }) => {
    const [fadeType, setFadeType] = useState("in")
    const [processList, setProcessList] = useState([]);
    const [positiveRate, setPositiveRate] = useState([]);
    const [negativeRate, setNegativeRate] = useState([]);
    const [thisRate, setThisRate] = useState('');

    const transitionEnd = (e) => {
        if (e.propertyName !== "opacity" || fadeType === "in") return;

        if (fadeType === "out") {
            onClose();
        }
    };

    useEffect(() => {
        db.collection('users').doc(profile.id).collection('process').get().then(snapshot => {
            setProcessList(snapshot.docs.map(doc => doc.data()));
        }).catch(err => {
            console.log(err);
            alert("Algum erro aconteceu");
        });
        db.collection('users').doc(profile.id).collection('rate').get().then(snapshot => {
            setPositiveRate(snapshot.docs.reduce((aux, doc) => {
                doc.data().value && aux.push(doc.id);
                return aux
            }, []));
            setNegativeRate(snapshot.docs.reduce((aux, doc) => {
                !doc.data().value && aux.push(doc.id);
                return aux
            }, []));
        }).catch(err => {
            console.log(err);
            alert("Algum erro aconteceu");
        });
        return () => {
            setProcessList({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (positiveRate.indexOf(ip) > -1){
            setThisRate('positive');
        }
        else if (negativeRate.indexOf(ip) > -1){
            setThisRate('negative');
        }
        else {
            setThisRate('');
        }
    }, [ip, negativeRate, positiveRate])

    const background = React.createRef();

    const handleClick = (e) => {
        e.preventDefault();
        setFadeType("out");
    };

    const addRate = (e, boolRate) => {
        e.preventDefault();
        db.collection('users').doc(profile.id).collection('rate').doc(ip).set({
            value: boolRate
        }).then(() => {
            db.collection('users').doc(profile.id).collection('rate').get().then(snapshot => {
                setPositiveRate(snapshot.docs.reduce((aux, doc) => {
                    doc.data().value && aux.push(doc.id);
                    return aux
                }, []));
                setNegativeRate(snapshot.docs.reduce((aux, doc) => {
                    !doc.data().value && aux.push(doc.id);
                    return aux
                }, []));
            }).catch(err => {
                console.log(err);
                alert("Algum erro aconteceu");
            });
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Modal
            id={id}
            className={`fade-${fadeType}`}
            role="dialog"
            modalSize="lg"
            onTransitionEnd={transitionEnd}
        >
            <div className="box-dialog">
                <div className="box-header">
                    <h4 className="box-title">{profile.name} - {profile.oab}</h4>
                    <button onClick={handleClick} className="x-close">×</button>
                </div>
                <div className="box-content">
                    <Row>
                        <Column size={1}>
                            <ProfileImage src={profile.image} />
                            <Row>
                                <RateBtn onClick={(e) => thisRate !== 'positive' && addRate(e, true)}>
                                    <Like fill={thisRate === 'positive'}/>{' ' + positiveRate.length}
                                </RateBtn>
                                <RateBtn onClick={(e) => thisRate !== 'negative' && addRate(e, false)}>
                                    <Dislike fill={thisRate === 'negative'}/>{' ' + negativeRate.length}
                                </RateBtn>
                            </Row>
                        </Column>
                        <Column size={4} style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'auto'
                        }}>
                            <Info>
                                {profile.pitch}
                            </Info>
                            <Row>
                                <Column size={1}>
                                    <SubTitle4>Local de atendimento:</SubTitle4>
                                    <Row>
                                        <Column size={1}>
                                            {profile.street}, {profile.number} - {profile.district} - {profile.city} - {profile.state}
                                        </Column>
                                    </Row>
                                </Column>
                                <Column size={1}>
                                    <SubTitle4>Contato:</SubTitle4>
                                    <Row>
                                        <Column size={2}>
                                            {profile.contactEmail}
                                        </Column>
                                        <Column size={1}>
                                            {profile.phone}
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    <hr />
                    <Row>
                        {processList?.length > 0 &&
                            <>
                                <Column size={1}>
                                    <ProcessList processes={processList} />
                                </Column>
                                <Column size={1}>
                                    <ChartContainer>
                                        <PieChart processList={processList} />
                                    </ChartContainer>
                                </Column>
                            </>}
                    </Row>
                </div>
            </div>
            <div
                className={`background`}
                onMouseDown={handleClick}
                ref={background}
            />
        </Modal>
    );
}

export default AdvModal;