import { use, useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css"

function Empresas() {

    const [empresas, setEmpresas] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [exibeEmpresas, setExibeEmpresas] = useState(true)
    const [exibeFuncionarios, setExibeFuncionarios] = useState(false)
    const [exibeModal, setExibeModal] = useState(false)

    async function buscaTodasEmpresas() {
        const { error, data } = await supabase.from("empresas").select()
        console.log(data)
        setEmpresas(data)
    }

    async function buscaTodosFuncionarios() {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)")
        console.log(data)
        setFuncionarios(data)
    }

    async function buscaFuncionariosPorEmpresa(id_empresa) {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)").eq("id_empresa", id_empresa)
        console.log(data)
        setFuncionarios(data)
        alternaVisualizacao()
    }

    async function alternaVisualizacao() {
        if (exibeEmpresas == true) {
            setExibeEmpresas(false)
            setExibeFuncionarios(true)
        } else {
            setExibeEmpresas(true)
            setExibeFuncionarios(false)
        }
    }

    useEffect(() => {
        buscaTodasEmpresas()
        buscaTodosFuncionarios()
    }, [])

    return (

        <div>

            {
                exibeModal == true ?
                    <div>
                        <div onClick={ () => setExibeModal(false) } className="fundoPreto" ></div>
                        <div className="modal">
                            <h2>Novo Funcionário</h2>
                            <input placeholder="Nome" />
                            <br />
                            <input placeholder="Contato" />
                            <br />
                            <select>
                                <option value="1">Funcionário comum</option>
                                <option value="0">Administrador</option>
                            </select>
                            <br />
                            <button>Salvar</button>
                        </div>
                    </div>
                    :
                    <></>
            }

            <h1> Relacionamento de Tabelas </h1>
            <p> Consulta na tabela empresas e funcionários </p>

            {
                exibeEmpresas == true ?


                    <div>
                        <h2>Empresas</h2>

                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>CNPJ</td>
                                <td>Endereço</td>
                                <td>Ações</td>
                            </tr>

                            {
                                empresas.map(i =>
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.cnpj}</td>
                                        <td>{i.endereco}</td>
                                        <td><button onClick={() => buscaFuncionariosPorEmpresa(i.id)}>Ver funcionários</button></td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    :
                    <></>
            }

            {
                exibeFuncionarios == true ?

                    <div>
                        <h2>Funcionários</h2>
                        <button onClick={alternaVisualizacao}>Voltar</button>
                        <br />
                        <br />
                        <button onClick={() => setExibeModal(true) }>Adicionar novo</button>

                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Nome da Empresa</td>
                                <td>Endereço da Empresa</td>
                                <td>Cargo</td>
                                <td>Contato</td>
                            </tr>

                            {funcionarios.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.nome}</td>
                                    <td>{i.empresas.nome}</td>
                                    <td>{i.empresas.endereco}</td>
                                    <td>{i.cargo == 0 ? "Administrador" : "Funcionário comum"}</td>
                                    <td>{i.contato}</td>
                                </tr>
                            )}
                        </table>
                    </div>
                    :
                    <></>
            }




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