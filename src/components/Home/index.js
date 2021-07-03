import React, { useEffect, useRef, useState } from 'react';
import AdvModal from "../profile/AdvModal";
import LPCarousel from './LPCarousel';
import db from "../../firebase";
import {
    Container,
    Column,
    Row,
    Card,
    CardTitle,
    Info,
    ProfileImage,
    Select,
    SubTitle4,
    Button,
    InlineSearch,
    CardHolder
} from "./style";

const Home = ({ setLoading, ip, brStates }) => {
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState([]);
    const [selected, setSelected] = useState(null);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [brCities, setBrCities] = useState([]);

    const endRef = useRef();

    const inputs = (e) => {
        switch (e.target.name) {
            case "state":
                setState(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            default:
                break;
        }
    }

    const toggleModal = (profile) => {
        setSelected(profile);
        setShowModal(true);
    }

    const fetchSearch = () => {
        db.collection('users').where("state", "==", state).where("city", "==", city).get().then(snapshot => {
            setResult(snapshot.docs.map(doc => doc.data()));
        }).catch(err => {
            console.log(err);
            alert("Algum erro aconteceu");
        });
    }

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [result]);

    useEffect(() => {
        if (state === '') {
            fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios').then(
                response => response.json()
            ).then(data => {
                setBrCities(data.map(d => d.nome));
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`).then(
                response => response.json()
            ).then(data => {
                setBrCities(data.map(d => d.nome));
            }).catch(err => {
                console.log(err);
            });
        }
    }, [state]);

    return (
        <Container>
            {showModal && (
                <AdvModal
                    profile={selected}
                    id='modal'
                    isOpen={showModal}
                    ip={ip}
                    onClose={() => setShowModal(false)}
                />
            )}
            <LPCarousel />
            <Row>
                <InlineSearch size={1}>
                    <SubTitle4>Encontre o profissional certo perto de você</SubTitle4>
                    <Row>
                        <Column size={1}>
                            <Select name="state" value={state} onChange={inputs}>
                                <option disabled hidden value="">Estado</option>
                                {brStates.map((s, i) => (
                                    <option key={s + i} value={s}>{s}</option>
                                ))}
                            </Select>
                        </Column>
                        <Column size={3}>
                            <Select name="city" value={city} onChange={inputs}>
                                <option disabled hidden value="">Cidade</option>
                                {brCities.map((c, i) => (
                                    <option key={c + i} value={c}>{c}</option>
                                ))}
                            </Select>
                        </Column>
                        {/*<Column size={2}>
                            <Select>
                                <option>Todas as áreas</option>
                                <option>Civil</option>
                                <option>Administrativo</option>
                                <option>Ambiental</option>
                                <option>Comercial</option>
                                <option>Consumidor</option>
                                <option>Contratual</option>
                                <option>Propriedade intelectual</option>
                                <option>Digital</option>
                                <option>Penal</option>
                                <option>Trabalhista</option>
                                <option>Tributário</option>
                                <option>Arbitragem internacional</option>
                            </Select>
                        </Column>
                        <Column size={2}>
                            <Select>
                                <option>Qualquer nível de experiência</option>
                                <option>Iniciante na carreira</option>
                                <option>0% a 25% de causas ganhas</option>
                                <option>26% a 50% de causas ganhas</option>
                                <option>51% a 75% de causas ganhas</option>
                                <option>76% a 100% de causas ganhas</option>
                            </Select>
            </Column>*/}
                        <Column size={1}>
                            <Button onClick={() => fetchSearch()}>Pesquisar</Button>
                        </Column>
                    </Row>
                </InlineSearch>
            </Row>
            
            {result && result.length > 0 ?
                <div style={{height: 'calc(100vh - 200px)'}}>
                <hr />
                <CardHolder>
                    {result.map((profile) =>
                        <Card onClick={() => toggleModal(profile)} key={profile.id}>
                            <Row>
                                <Column size={1}>
                                    <ProfileImage src={profile.image} />
                                </Column>
                                <Column size={3}>
                                    <CardTitle>{profile.name}</CardTitle>
                                    <Info>{profile.city} - {profile.state}</Info>
                                </Column>
                            </Row>
                        </Card>
                    )}
                </CardHolder> 
                </div>: <></>}
                <div ref={endRef}></div>
        </Container>
    );
}

export default Home;