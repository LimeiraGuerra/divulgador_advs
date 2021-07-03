import React, { useEffect, useRef, useState } from "react";
import { Input, Container, TextArea, Column, Row, SubTitle4, ProfileImage, Select, Button, ChartContainer, Warning, ProfileImgBtn } from "../style";
import ProcessList from '../ProcessList';
import PieChart from '../Chart';
import db, { storage } from '../../../firebase';

const ConfigProfile = ({ user, setUser, setLoading, brStates }) => {

    const dataWarning = () => (
        user.phone && user.phone.length > 0 &&
        user.street && user.street.length > 0 &&
        user.number && user.number.length > 0 &&
        user.district && user.district.length > 0 &&
        user.city && user.city.length > 0 &&
        user.state && user.state.length > 0 &&
        user.pitch && user.pitch.length > 0
    );

    const [brCities, setBrCities] = useState([]);

    const [processList, setProcessList] = useState([]);
    const [file, setFile] = useState(null);
    const fileInputField = useRef(null);

    const [contactEmail, setContactEmail] = useState(user.contactEmail || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [street, setStreet] = useState(user.street || "");
    const [number, setNumber] = useState(user.number || "");
    const [district, setDistrict] = useState(user.district || "");
    const [city, setCity] = useState(user.city || "");
    const [state, setState] = useState(user.state || "");
    const [pitch, setPitch] = useState(user.pitch || "");
    const [profileImg, setProfileImg] = useState(user.image || "");

    const [cnj, setCnj] = useState("");
    const [selectArea, setSelectArea] = useState("");
    const [selectDefence, setSelectDefence] = useState("");
    const [selectState, setSelectState] = useState("");

    const uploadImg = async (image) => {
        let url = '';
        if (image) {
            try {
                url = await storage.ref().child(
                    `users/${user.id}/${image.name}`
                ).getDownloadURL();
            } catch (err) {
                console.log(err);
            } finally {
                if (!url?.lenght > 0) {
                    const upload = await storage.ref().child(
                        `users/${user.id}/${image.name}`
                    ).put(image);
                    url = upload.ref.getDownloadURL();
                }
            }
        }
        return url;
    }

    const contactInfoHandle = async (e) => {
        e.preventDefault();
        let msg = ''
        setLoading(true);
        let imgSrc = await uploadImg(file);
        imgSrc = imgSrc.length > 0 ? imgSrc : profileImg;
        db.collection('users').doc(user.id).set({
            ...user,
            contactEmail: contactEmail,
            phone: phone,
            street: street,
            number: number,
            district: district,
            city: city,
            state: state,
            pitch: pitch,
            image: imgSrc
        }).then(() => {
            setUser({
                ...user,
                contactEmail: contactEmail,
                phone: phone,
                street: street,
                number: number,
                district: district,
                city: city,
                state: state,
                pitch: pitch,
                image: imgSrc
            });
            msg = "Dados atualizados";
            setLoading(false);
            alert(msg);
        }).catch(err => {
            msg = "Algum erro aconteceu";
            console.log(err);
            setLoading(false);
            alert(msg);
        });
    }

    const verify = (e) => {
        switch (e.target.name) {
            case "contactEmail":
                let val = e.target.value.trim();
                setContactEmail(val);
                break;
            case "phone":
                setPhone(e.target.value);
                break;
            case "street":
                setStreet(e.target.value);
                break;
            case "number":
                setNumber(e.target.value);
                break;
            case "district":
                setDistrict(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            case "state":
                setState(e.target.value);
                break;
            case "pitch":
                setPitch(e.target.value);
                break;
            default:
                break;
        }
    }

    const processValidate = () => {
        let errorMsg = '';
        if (!/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/.test(cnj)) { errorMsg = "Número CNJ informado não é válido" }
        else if (cnj.length === 0) { errorMsg = "Número CNJ não pode estar vazio" }
        else if (selectArea.length === 0) { errorMsg = "É necessário selecionar a área do processo" }
        else if (selectDefence.length === 0) { errorMsg = "É necessário selecionar o alinhamento ao processo" }
        else if (selectState.length === 0) { errorMsg = "É necessário selecionar o estado do andamento do processo" }
        return errorMsg;
    }

    const resetProcessForm = () => {
        setCnj("");
        setSelectArea("");
        setSelectDefence("");
        setSelectState("");
    }

    useEffect(() => {
        db.collection('users').doc(user.id).collection('process').get().then(snapshot => {
            setProcessList(snapshot.docs.map(doc => doc.data()));
        }).catch(err => {
            console.log(err);
            alert("Algum erro aconteceu");
        });
        return () => {
            setProcessList({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewProcess = (e) => {
        e.preventDefault();
        let msg = processValidate();
        if (msg.length > 0) {
            alert(msg);
            return;
        }
        setLoading(true);
        db.collection('users').doc(user.id).collection('process').doc(cnj).set({
            cnj: cnj,
            area: selectArea,
            side: selectDefence,
            status: selectState,
        }).then(() => {
            resetProcessForm();
            msg = "Processo adicionado";
            setLoading(false);
            alert(msg);
        }).catch(err => {
            msg = "Algum erro aconteceu";
            console.log(err);
            setLoading(false);
            alert(msg);
        });
    }

    const verifyProcess = (e) => {
        switch (e.target.name) {
            case "cnj":
                let val = e.target.value.trim();
                setCnj(val);
                break;
            case "pArea":
                setSelectArea(e.target.value);
                break;
            case "pDefence":
                setSelectDefence(e.target.value);
                break;
            case "pState":
                setSelectState(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleUploadBtnClick = (e) => {
        e.preventDefault();
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (/^image\/.*/.test(file.type)) {
                setProfileImg(URL.createObjectURL(file));
                setFile(file);
            }
            else {
                alert("Só é permitido enviar imagens");
            }
        }
    }
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
            {!dataWarning() &&
                <Row>
                    <Warning size={1}>
                        Preencha suas informações para que seu perfil seja
                        divulgado ou para facilitar o contato com possíveis clientes
                    </Warning>
                </Row>
            }
            <form>
                <Row>
                    <Column size={5}>
                        <div>
                            <SubTitle4>Contato:</SubTitle4>
                            <Row>
                                <Column size={2}>
                                    <Input type="text" placeholder="Email para contato" name="contactEmail"
                                        value={contactEmail} onChange={verify}
                                    />
                                </Column>
                                <Column size={1}>
                                    <Input type="text" placeholder="Telefone para contato" name="phone"
                                        value={phone} onChange={verify}
                                    />
                                </Column>
                            </Row>
                        </div>
                        <div>
                            <SubTitle4 style={{ marginTop: "10px" }}>Endereço de atendimento:</SubTitle4>
                            <Row>
                                <Column size={3}>
                                    <Input type="text" placeholder="Rua" name="street"
                                        value={street} onChange={verify}
                                    />
                                </Column>
                                <Column size={1}>
                                    <Input type="text" placeholder="Número" name="number"
                                        value={number} onChange={verify}
                                    />
                                </Column>
                                <Column size={2}>
                                    <Input type="text" placeholder="Bairro" name="district"
                                        value={district} onChange={verify}
                                    />
                                </Column>
                                <Column size={2}>
                                    <Select name="city" value={city} onChange={verify}>
                                        <option disabled hidden value="">Cidade</option>
                                        {brCities.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </Select>
                                </Column>
                                <Column size={1}>
                                    <Select name="state" value={state} onChange={verify}>
                                        <option disabled hidden value="">Estado</option>
                                        {brStates.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </Select>
                                </Column>
                            </Row>
                            <SubTitle4 style={{ marginTop: "10px" }}>Apresentação:</SubTitle4>
                            <Row>
                                <Column size={1}>
                                    <TextArea name="pitch" onChange={verify} value={pitch}></TextArea>
                                </Column>
                            </Row>
                        </div>
                    </Column>
                    <Column size={2}>
                        <ProfileImage src={profileImg}>
                            <div>
                                <ProfileImgBtn onClick={handleUploadBtnClick}>Adicionar uma imagem</ProfileImgBtn>
                                <input type="file" ref={fileInputField} onChange={handleNewFileUpload} accept="image/*" />
                            </div>
                        </ProfileImage>
                        <Button onClick={contactInfoHandle}>Atualizar Dados</Button>
                    </Column>
                </Row>
            </form>
            <hr />
            <Row>
                <Column size={1}>
                    <form>
                        <SubTitle4>Processo envolvidos:</SubTitle4>
                        <Row>
                            <Column size={3}>
                                <Input type="text" placeholder="Nº do processo (CNJ)" name="cnj"
                                    value={cnj} onChange={verifyProcess} />
                            </Column>
                            <Column size={3}>
                                <Select name="pArea" value={selectArea} onChange={verifyProcess}>
                                    <option disabled hidden value="">Área</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Administrativo">Administrativo</option>
                                    <option value="Ambiental">Ambiental</option>
                                    <option value="Comercial">Comercial</option>
                                    <option value="Consumidor">Consumidor</option>
                                    <option value="Contratual">Contratual</option>
                                    <option value="Propriedade intelectual">Propriedade intelectual</option>
                                    <option value="Digital">Digital</option>
                                    <option value="Penal">Penal</option>
                                    <option value="Trabalhista">Trabalhista</option>
                                    <option value="Tributário">Tributário</option>
                                    <option value="Arbitragem internacional">Arbitragem internacional</option>
                                </Select>
                            </Column>
                            <Column size={2}>
                                <Select name="pDefence" value={selectDefence} onChange={verifyProcess}>
                                    <option disabled hidden value="">Alinhamento</option>
                                    <option value="ativa">Parte ativa</option>
                                    <option value="passiva">Parte passiva</option>
                                </Select>
                            </Column>
                            <Column size={2}>
                                <Select name="pState" value={selectState} onChange={verifyProcess}>
                                    <option disabled hidden value="">Estado</option>
                                    <option value="movimentacao">Em movimento</option>
                                    <option value="ganho">Causa ganha</option>
                                    <option value="perdido">Causa perdida</option>
                                </Select>
                            </Column>
                            <Column size={1}>
                                <Button onClick={addNewProcess}>Adicionar</Button>
                            </Column>
                        </Row>
                    </form>
                </Column>
            </Row>
            <Row>
                {processList?.length > 0 ?
                    <>
                        <Column size={1}>
                            <ProcessList processes={processList} />
                        </Column>
                        <Column size={1}>
                            <ChartContainer>
                                <PieChart processList={processList} />
                            </ChartContainer>
                        </Column>
                    </>
                    :
                    <Warning size={1}>
                        Adicione processos para ajudar na avaliação do seu perfil
                    </Warning>
                }
            </Row>
        </Container >
    );
}

export default ConfigProfile;