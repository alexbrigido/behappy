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
                    {this.renderizarNome()}
                    {this.renderizarGenero()}
                    {this.renderizarBotoes()}
                </form>
            </div>
        );
    }

    renderizarNome() {
        return (
            <section>
                <Label 
                    htmlFor="nome" 
                    texto={this.state.primeiraVisaoCompleta ? "Welcome!" : "Who are you?"}
                    valorInvalido={this.state.validacao.nomeInvalido}
                />
                <Input
                    id="nome"
                    placeholder="Type your name"
                    maxLength="40"
                    readOnly={this.state.primeiraVisaoCompleta}
                    valorInvalido={this.state.validacao.nomeInvalido}
                    defaultValue={this.state.usuario.nome}
                    onChange={this.atualizarNome.bind(this)}
                />
            </section>
        )
    }

    renderizarGenero() {
        if (this.state.primeiraVisaoCompleta) {
            return null
        } else {
            return (
                <section>
                    <Label
                        texto="Your gender:"
                        valorInvalido={this.state.validacao.generoInvalido}
                    />
                    <GenderSelector
                        valorInvalido={this.state.validacao.generoInvalido}
                        genero={this.state.usuario.genero}
                        atualizarGenero={this.atualizarGenero.bind(this)}
                    />
                </section>
            )
        }
    }

    renderizarBotoes() {
        if (this.state.primeiraVisaoCompleta) {
            return (
                <section>
                    <Button
                        texto="Go back"
                        onClick={e => { 
                            e.preventDefault();
                            this.setState({
                                primeiraVisaoCompleta: false
                            });
                        }}
                    />
                    <Button
                        principal
                        texto="Save"
                    />
                </section>
            )
        } else {
            return (
                <section>
                    <Button
                        principal
                        texto="Next"
                        onClick={this.validar.bind(this)}
                    />
                </section>
            )
        }
    }

    atualizarNome(e) {
        let usuario = this.state.usuario;
        usuario.nome = e.target.value;
        this.setState({
            usuario: usuario
        });
    }

    atualizarGenero(e, genero) {
        //e.preventDefault();
        let usuario = this.state.usuario;
        usuario.genero = genero;
        this.setState({
            usuario: usuario
        });
    }

    validar(e) {
        //e.preventDefault;
        let usuario = this.state.usuario;
        let validacao = this.state.validacao;
        validacao.nomeInvalido = !usuario.validarNome();
        validacao.generoInvalido = !usuario.validarGenero();
        let mensagem = '';
        let primeiraVisaoCompleta = false;
        if (validacao.nomeInvalido && validacao.generoInvalido) {
            mensagem = 'The fields name and gender are invalids!'
        } else if (validacao.nomeInvalido) {
            mensagem = 'Your name are invalid!'
        } else if (validacao.generoInvalido) {
            mensagem = 'Your gender are invalid!'
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
