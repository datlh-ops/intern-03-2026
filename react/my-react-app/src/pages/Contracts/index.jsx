import { useState } from "react";
import ContractStats from "./components/ContractStats";
import ContractForm from "./components/ContractForm";
import ContractTable from "./components/ContractTable";
import "./contracts.css"

export default function Contracts(){
    const [contracts, setContracts] = useState([]);

    const addContract = (contract) => {
        setContracts([...contracts, contract]);
    };

    const deleteContract = (id) => {
        setContracts(contracts.filter(c => c.id !== id));
    };

    return (

        <div className="contracts-page">

            <h2>Quản lý hợp đồng</h2>

            <ContractStats contracts={contracts} />

            <ContractForm addContract={addContract} />

            <ContractTable
                contracts={contracts}
                deleteContract={deleteContract}
            />

        </div>

    );
}