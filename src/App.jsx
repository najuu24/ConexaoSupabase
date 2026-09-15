import { use, useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {

    const [produtos, setProdutos] = useState([])

    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [tamanho, setTamanho] = useState("")
    const [descricao, setDescricao] = useState("")
    
    async function inserir(){
        const obj = {

            nome: nome,
            preco: preco,
            tamanho: tamanho,
            descricao: descricao
    
        }
        const { data, error } = await supabase.from('produtos').insert(obj)
        alert("Produto cadastrado com sucesso!")
        document.location.reload()

    }
    

    async function buscaTodos() {
        const { data, error } = await supabase.from('produtos').select().order("id", { ascending: false } )
        console.log(data)
        setProdutos(data)
    }

    useEffect( () => {
        buscaTodos()
    }, [] )


    return (

        <div>
            <h1>Conexão com Supabase</h1>

            <input onChange={ e => setNome(e.target.value) } placeholder="Nome do produto " />
            <br />
            <input onChange={ e => setPreco(e.target.value) } placeholder="Preço " />
            <br />
            <input onChange={ e => setTamanho(e.target.value) } placeholder="Tamanho " />
            <br />
            <input onChange={ e => setDescricao(e.target.value) } placeholder="Descrição (opcional) " />
            <br />

            <button onClick={inserir}>Salvar</button>

            { produtos.map(i => <p><strong>{i.nome}</strong> - R$ {i.preco} | <strong>Descrição:</strong> {i.descricao}</p> ) }

        </div>

    );

}

export default App;
