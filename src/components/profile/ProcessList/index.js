import { Column, Row, Status, Info, ProcessTitle, ProcessCard, ProcessHolder } from "../style";

const statusColor = {
    ganho: "lightgreen",
    movimentacao: '#ffff62',
    perdido: '#fe7171'
}

const ProcessList = ({ processes }) => {
    return (
        <ProcessHolder>
            {processes &&
                processes.map((process, key) => (
                    <ProcessCard key={key}>
                        <Column size={12}>
                            <Row>
                                <Column size={1}>
                                    <ProcessTitle>{process.cnj}</ProcessTitle>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={1}>
                                    <Info>Área: {process.area}</Info>
                                </Column>
                                <Column size={1}>
                                    <Info>Defendendo: Parte {process.side === "ativa" ? "Ativa" : "Passiva" }</Info>
                                </Column>
                            </Row>
                        </Column>
                        <Status size={1} color={statusColor[process.status]}></Status>
                    </ProcessCard>
                ))
            }
        </ProcessHolder>
    );
}

export default ProcessList;