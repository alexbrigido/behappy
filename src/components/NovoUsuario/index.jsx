import React from 'react';
import Label from '../Label';
import Input from '../Input';
import GenderSelector from '../GenderSelector';
import Usuario from '../../models/Usuario';
import Button from '../Button';

class NovoUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: new Usuario(),
            validacao: {
                nomeInvalido: false,
                generoInvalido: false
            },
            primeiraVisaoCompleta: false
        }
    }

    render() {
        return (
            <div className="center">
                <form className="pure-form pure-form-stacked">
                    <Label 
                        htmlFor="nome" 
                        texto="Quem é você?"
                        valorInvalido={this.state.validacao.nomeInvalido}
                     />
                    <Input
                        id="nome"
                        placeholder="Digite seu nome"
                        maxLength="40"
                        readOnly={false}
                        valorInvalido={this.state.validacao.nomeInvalido}
                        defaultValue={this.state.usuario.nome}
                        onChange={this.atualizarNome.bind(this)}
                    />
                    <Label
                        texto="Seu gênero:"
                        valorInvalido={this.state.validacao.generoInvalido}
                    />
                    <GenderSelector
                        valorInvalido={this.state.validacao.generoInvalido}
                        genero={this.state.usuario.genero}
                        atualizarGenero={this.atualizarGenero.bind(this)}
                    />
                    <Button
                        principal
                        texto="Próximo"
                        onClick={this.validar.bind(this)}
                    />
                </form>
            </div>
        );
    }

    atualizarNome(e) {
        let usuario = this.state.usuario;
        usuario.nome = e.target.value;
        this.setState({
            usuario: usuario
        });
    }

    atualizarGenero(e, genero) {
        e.preventDefault();
        let usuario = this.state.usuario;
        usuario.genero = genero;
        this.setState({
            usuario: usuario
        });
    }

    validar(e) {
        e.preventDefault;
        let usuario = this.state.usuario;
        let validacao = this.state.validacao;
        validacao.nomeInvalido = !usuario.validarNome();
        validacao.generoInvalido = !usuario.validarGenero();
        let mensagem = '';
        let primeiraVisaoCompleta = false;
        if (validacao.nomeInvalido && validacao.generoInvalido) {
            mensagem = 'Os campos nome e gênero estão inválidos!'
        } else if (validacao.nomeInvalido) {
            mensagem = 'Seu nome está inválido!'
        } else if (validacao.generoInvalido) {
            mensagem = 'Selecione seu gênero!'
        } else {
            primeiraVisaoCompleta = true;
        }
        if (!primeiraVisaoCompleta) {
            this.props.erro(mensagem);
        }
        this.setState({
            validacao: validacao,
            primeiraVisaoCompleta: primeiraVisaoCompleta
        });
    }
}

export default NovoUsuario;
