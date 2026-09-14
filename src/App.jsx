import { supabase } from "./supabase";

function App() {
    async function teste() {
        const { data, error } = await supabase.from('produtos').select()
        console.log(data)
    }


    return (

        <div>
            <h1>Conexão com Supabase</h1>
            <button onClick={teste}>Testar</button>
        </div>

    );

}

export default App;
