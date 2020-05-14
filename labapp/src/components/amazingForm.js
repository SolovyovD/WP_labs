import React from 'react';
import PhotoPreview from './photoPreview';

export default class AmazingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            color: 'Выберите цвет',
            size: 'Выберите размер',
            formIsFull: false,
        };
    }

    RecieveAnswer(event) {
        event.preventDefault();
        let reqBody = {
            colorSelector: this.state.color,
            text: this.state.name,
            sizeSelector: this.state.size,
        }
        fetch('http://localhost:8888/getPicture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.name === 'not found') {
                    this.setState({ name: result.name });
                    return;
                }
                this.setState({name: result.name.join(' ')})
                if (result.color === '#FF0000') { this.setState({ color: 'red' }) }
                if (result.color === '#00FF00') { this.setState({ color: 'green' }) }
                if (result.color === '#FF8000') { this.setState({ color: 'orange' }) }
                if (result.size.width === '400') { this.setState({ size: '400х600' }) }
                if (result.size.width === '800') { this.setState({ size: '800х600' }) }
                if (result.size.width === '1280') { this.setState({ size: '1280х960' }) }
                this.setState({ formIsFull: true });
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={event => this.RecieveAnswer(event)}>
                    <label>
                        Имя животного:
                    <input pattern={'[a-zA-Z]{1,8}\\s?\\d?'} required={true} value={this.state.name} onChange={event => this.setState({ name: event.target.value })} style={{ margin: '10px' }} type='text' />
                    </label>
                    <div>
                        <select value={this.state.color} onChange={event => this.setState({ color: event.target.value })} style={styles.selector}>
                            <option hidden={true} value="default">Выберите цвет фона</option>
                            <option value="red">Красный</option>
                            <option value="green">Зеленый</option>
                            <option value="orange">Оранжевый</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <select value={this.state.size} onChange={event => this.setState({ size: event.target.value })} style={styles.selector}>
                            <option hidden={true} value="default">Выберите размер</option>
                            <option value="400х600">400х600</option>
                            <option value="800х600">800х600</option>
                            <option value="1280х960">1280х960</option>
                        </select>
                    </div>
                    <input style={styles.button} type="submit" value="Выполнить запрос" />
                </form>
                <PhotoPreview color={this.state.color}
                    id={this.state.name.trim().split(' ')[1]}
                    name={this.state.name.trim().split(' ')[0]}
                    size={this.state.size}
                    visible={this.state.formIsFull} />
            </div>
        )
    }
}

const styles = {
    selector: {
        width: '302px',
        height: '24px',
        paddingLeft: '10px'
    },
    button: {
        width: '302px',
        height: '24px',
        marginTop: '8px'
    }
}