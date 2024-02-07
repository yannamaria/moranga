import express from "express"
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();
app.use(express.json())
app.get("/", (req, res) => {
    res.send("bem vindo a minha primeira API");
})

app.post("/usuario", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, "usuario"), {
            nome: nome,
            email: email,
            telefone: telefone,

        })
        res.send("usuario adicionado com sucesso:" + docRef.id);
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

})

app.get("/listarUsuarios", async (req, res) => {


    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuario'))
        const listaUsuarios = usuarios.docs.map(data => ({
            id: data.id,
            ...data.data()
        }))





        res.send(listaUsuarios)
    } catch (error) {
        console.log("Erro ao buscar os usuarios");
        res.send(error)
    }



})


app.put('/atualizarUsuario/:id',async(req,res)=>{
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db,"usuario",id),{
            nome: nome,
        })
        res.send('Usuario atualizado com sucesso!')
    } catch (e) {
        console.log('erro ao atualizar usuario:'+ e)
        
        res.status(500).send('erro ao atualizar usuario:'+ e)
    }
})
app.delete('/deletarUsuario/:id', async (req, res)=>{
    const id = req.params. id
    
    try {
        await firestore.deleteDoc(firestore.doc(db,"usuarios",id))
        res.send("Usuario deletado com sucesso!")
    } catch (e) {
        console.log('Erro ao deletar usuaro:'+e)
        res.status(500).send('Erro ao deletar usuaro:'+e)
    }
})

app.listen(3000, function () {
    console.log('servidor rodado na porta http://localhost:3000')
});
