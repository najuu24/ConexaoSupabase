import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function Empresas() {

    const [ empresas, setEmpresas] = useState([])
    const [ funcionarios, setFuncionarios] = useState([])

    async function buscaTodasEmpresas() {
        const {error, data} = await supabase.from("empresas").select()
        console.log(data)
        setEmpresas(data)
    }

    async function buscaTodosFuncionarios() {
        const {error, data} = await supabase.from("funcionarios").select()
        console.log(data)
        setFuncionarios(data)
    }

    useEffect( () => {
        buscaTodasEmpresas()
        buscaTodosFuncionarios()
    }, [] )

    return ( 

        <div>

            <h1> Relacionamento de Tabelas </h1>
            <p> Consulta na tabela empresas e funcionários </p>

            <table border={true}>
                <tr>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>CNPJ</td>
                    <td>Endereço</td>
                </tr>

                {
                    empresas.map( i => 
                        <tr>
                            <td>{i.id}</td>
                            <td>{i.nome}</td>
                            <td>{i.cnpj}</td>
                            <td>{i.endereco}</td>
                        </tr>
                    )
                }
            </table>

            <h2>Funcionários</h2>

            <table border={true}>
                <tr>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>Nome da Empresa</td>
                    <td>Endereço da Empresa</td>
                    <td>Cargo</td>
                    <td>Contato</td>
                </tr>

                {funcionarios.map( i =>
                    <tr>
                            <td>{i.id}</td>
                            <td>{i.nome}</td>
                            <td>{i.id_empresa}</td>
                            <td>{i.endereco}</td>
                            <td>{i.cargo}</td>
                            <td>{i.contato}</td>
                        </tr>
                )}
            </table>



            {/* const { data, error } = await supabase
                .from('orchestral_sections')
                .select(`
                    name,
                    instruments (
                        name
                    )
                `) */}

        </div>
    
    );

}

export default Empresas;